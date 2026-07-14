import React, { useMemo, useState } from "react";
import {
  Flame, Settings as SettingsIcon, ArrowLeft, RotateCcw, GraduationCap,
  MessageCircle, Compass, BookOpen, Check, Lock, Sparkles, Loader2,
} from "lucide-react";

import { LESSONS, Lesson as LessonType } from "./data/lessons";
import { REFERENCE } from "./data/reference";
import { dueCards } from "./lib/srs";
import { generatePracticeLesson } from "./lib/gemini";

import { useStore } from "./store/useStore";

import { Dial, Block, Empty, Pill } from "./components/ui";
import Review from "./components/Review";
import Lesson from "./components/Lesson";
import Charla from "./components/Charla";
import AskBox from "./components/AskBox";
import Settings from "./components/Settings";

export default function App() {
  const {
    tab, view, setTab, setView, activeLessonId, setActiveLessonId,
    progress, srs, day, genLessons, model,
    finishBlock, gradeCard, completeLesson, addGenLesson
  } = useStore();

  const [showSettings, setShowSettings] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");

  const allLessons = useMemo(() => [...LESSONS, ...genLessons], [genLessons]);
  const nextLesson = useMemo(
    () => allLessons.find((l) => !progress.completed.includes(l.id)) || null,
    [allLessons, progress.completed]
  );
  
  // Re-evaluate due deck whenever `view` changes, or `srs` changes
  const dueDeck = useMemo(() => dueCards(srs), [srs, view]);
  
  const knownWords = useMemo(() => {
    const done = new Set(progress.completed);
    return allLessons.filter((l) => done.has(l.id)).flatMap((l) => l.vocab.map((v: any) => v.es));
  }, [allLessons, progress.completed]);

  const lastDoneVocab = useMemo(() => {
    const done = progress.completed;
    for (let i = done.length - 1; i >= 0; i--) {
      const l = allLessons.find((x) => x.id === done[i]);
      if (l) return l.vocab;
    }
    return (nextLesson || allLessons[0]).vocab;
  }, [progress.completed, allLessons, nextLesson]);

  async function makePracticeLesson() {
    setGenerating(true); setGenError("");
    try {
      const data = await generatePracticeLesson(knownWords, { model });
      const lesson = {
        id: "gen-" + (genLessons.length + 1),
        week: 0, level: "Extra", title: data.title || "Práctica",
        focus: data.focus || "AI practice", explainer: data.explainer || [], vocab: data.vocab || [],
      };
      if (!lesson.vocab.length) throw new Error("empty");
      addGenLesson(lesson);
    } catch {
      setGenError("Couldn't generate a lesson right now. Check your key and connection, then retry.");
    }
    setGenerating(false);
  }

  const blocksDone = [day.repasar, day.aprender, day.hablar].filter(Boolean).length;
  const viewLesson = activeLessonId ? allLessons.find((l) => l.id === activeLessonId) : nextLesson;

  if (view) {
    const back = () => { setView(null); setActiveLessonId(null); };
    return (
      <Shell onSettings={() => setShowSettings(true)}>
        <button className="tap" onClick={back} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink-soft)", fontSize: 14, marginBottom: 16 }}>
          <ArrowLeft size={17} /> Back
        </button>
        {view === "repasar" && (
          dueDeck.length
            ? <Review deck={dueDeck} onGrade={gradeCard} onDone={() => finishBlock("repasar")} />
            : <Empty title="Nothing due yet" body="Your review deck fills up as you finish lessons. Come back tomorrow — or jump into today's lesson now." onDone={() => finishBlock("repasar")} cta="Mark review done" />
        )}
        {view === "aprender" && (
          viewLesson
            ? <Lesson lesson={viewLesson} onComplete={() => completeLesson(viewLesson)} />
            : <CourseComplete generating={generating} genError={genError} onGenerate={makePracticeLesson} />
        )}
        {view === "hablar" && (
          <Charla seedVocab={lastDoneVocab} onFirstReply={() => { if (!day.hablar) finishBlock("hablar"); }} />
        )}
        {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      </Shell>
    );
  }

  return (
    <Shell onSettings={() => setShowSettings(true)}>
      {tab === "hoy" && (
        <div className="rise">
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
            <Dial done={day} />
            <div>
              <span className="eyebrow">Sesión del día</span>
              <h1 className="serif" style={{ fontSize: 27, fontWeight: 600, margin: "4px 0 6px", lineHeight: 1.1 }}>
                {blocksDone === 3 ? "¡Terminaste hoy!" : blocksDone === 0 ? "Empecemos" : "Sigue así"}
              </h1>
              <p style={{ fontSize: 14, color: "var(--ink-soft)", margin: 0 }}>
                {blocksDone === 3 ? "All three done. See you tomorrow." : "Three short blocks. About 15 minutes."}
              </p>
            </div>
          </div>

          <Block label="Repasar" sub={dueDeck.length ? `${dueDeck.length} card${dueDeck.length > 1 ? "s" : ""} to review` : "Spaced review"} mins="~5 min"
            done={day.repasar} tone="teal" icon={<RotateCcw size={21} />} onClick={() => setView("repasar")} />
          <Block label="Aprender" sub={viewLesson ? viewLesson.title : "Course complete 🎉"} mins="~7 min"
            done={day.aprender} tone="saffron" icon={<GraduationCap size={21} />} onClick={() => setView("aprender")} />
          <Block label="Hablar" sub="Converse with Lucía" mins="~5 min"
            done={day.hablar} tone="coral" icon={<MessageCircle size={21} />} onClick={() => setView("hablar")} />

          <div style={{ marginTop: 22 }}>
            <AskBox />
          </div>
        </div>
      )}

      {tab === "curso" && (
        <CoursePath allLessons={allLessons} completed={progress.completed} nextId={nextLesson?.id}
          onOpen={(id: string) => { setActiveLessonId(id); setView("aprender"); setTab("hoy"); }}
          onGenerate={makePracticeLesson} generating={generating} genError={genError} hasNext={!!nextLesson} />
      )}

      {tab === "ref" && (
        <div className="rise" style={{ maxWidth: 560, margin: "0 auto" }}>
          <span className="eyebrow">Reference</span>
          <h1 className="serif" style={{ fontSize: 26, fontWeight: 600, margin: "4px 0 14px" }}>Pronunciation</h1>
          <div className="card" style={{ overflow: "hidden", marginBottom: 16 }}>
            {REFERENCE.pron.map((r, i) => (
              <div key={i} style={{ display: "flex", borderTop: i ? "1px solid var(--line)" : "none", alignItems: "center" }}>
                <div className="mono" style={{ flex: "0 0 34%", padding: "11px 14px", color: "var(--teal-deep)", fontWeight: 700, fontSize: 14 }}>{r[0]}</div>
                <div style={{ flex: 1, padding: "11px 14px", fontSize: 14, color: "#3a2f26" }}>{r[1]}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 16, marginBottom: 22, background: "var(--teal-tint)", border: "none" }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Dialect</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: "var(--teal-deep)" }}>{REFERENCE.tip}</p>
          </div>
          <AskBox />
        </div>
      )}

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </Shell>
  );
}

function CourseComplete({ generating, genError, onGenerate }: any) {
  return (
    <div className="rise card" style={{ maxWidth: 460, margin: "0 auto", padding: 26, textAlign: "center" }}>
      <div style={{ fontSize: 38, marginBottom: 6 }}>🎉</div>
      <h3 className="serif" style={{ fontSize: 23, fontWeight: 600, margin: "0 0 8px" }}>You finished the course</h3>
      <p style={{ color: "var(--ink-soft)", fontSize: 14.5, lineHeight: 1.55, margin: "0 0 18px" }}>
        All 40 lessons, A1 through B1. From here, keep your streak alive with daily review and conversation — and generate fresh AI practice lessons whenever you want more.
      </p>
      <button className="tap" onClick={onGenerate} disabled={generating}
        style={{ padding: "13px 22px", background: "var(--saffron)", color: "#3a2407", borderRadius: 13, fontWeight: 700, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}>
        {generating ? <><Loader2 size={17} className="spin" /> Generating…</> : <><Sparkles size={17} /> Generate a practice lesson</>}
      </button>
      {genError && <p style={{ color: "var(--coral)", fontSize: 13, marginTop: 12 }}>{genError}</p>}
    </div>
  );
}

function CoursePath({ allLessons, completed, nextId, onOpen, onGenerate, generating, genError, hasNext }: any) {
  const done = new Set(completed);
  let levelSeen: string | null = null;
  return (
    <div className="rise" style={{ maxWidth: 560, margin: "0 auto" }}>
      <span className="eyebrow">The path</span>
      <h1 className="serif" style={{ fontSize: 26, fontWeight: 600, margin: "4px 0 4px" }}>Curso</h1>
      <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: "0 0 18px" }}>
        {done.size} of {allLessons.length} lessons · A1 → B1. Tap any unlocked lesson to study or revisit it.
      </p>
      {allLessons.map((l: any) => {
        const isDone = done.has(l.id);
        const isNext = l.id === nextId;
        const locked = !isDone && !isNext;
        const showHeader = l.level !== levelSeen;
        levelSeen = l.level;
        return (
          <div key={l.id}>
            {showHeader && <div className="eyebrow" style={{ margin: "18px 0 8px", color: "var(--saffron)" }}>{l.level}</div>}
            <button className="card tap" disabled={locked} onClick={() => onOpen(l.id)}
              style={{ width: "100%", textAlign: "left", padding: "13px 15px", marginBottom: 9, display: "flex", alignItems: "center", gap: 13, opacity: locked ? 0.5 : 1, borderColor: isNext ? "var(--saffron)" : "var(--line)", cursor: locked ? "default" : "pointer" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                background: isDone ? "var(--teal)" : isNext ? "var(--saffron)" : "var(--paper-2)", color: isDone || isNext ? "#fff" : "var(--ink-faint)" }}>
                {isDone ? <Check size={18} /> : locked ? <Lock size={15} /> : <BookOpen size={16} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="serif" style={{ fontSize: 16, fontWeight: 600 }}>{l.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.focus}</div>
              </div>
              {isNext && <Pill tone="saffron">next</Pill>}
            </button>
          </div>
        );
      })}
      {!hasNext && (
        <button className="tap" onClick={onGenerate} disabled={generating}
          style={{ width: "100%", marginTop: 8, padding: 13, background: "var(--saffron)", color: "#3a2407", borderRadius: 12, fontWeight: 700, fontSize: 14.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {generating ? <><Loader2 size={16} className="spin" /> Generating…</> : <><Sparkles size={16} /> Generate another practice lesson</>}
        </button>
      )}
      {genError && <p style={{ color: "var(--coral)", fontSize: 13, marginTop: 10, textAlign: "center" }}>{genError}</p>}
    </div>
  );
}

function Shell({ children, onSettings }: { children: React.ReactNode, onSettings: () => void }) {
  const { tab, setTab, progress } = useStore();
  const nav = [
    ["hoy", "Hoy", Compass],
    ["curso", "Curso", GraduationCap],
    ["ref", "Referencia", BookOpen],
  ] as const;
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: "var(--paper)" }}>
      <header className="glass-header">
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "12px 18px calc(12px + env(safe-area-inset-top))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="serif" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.02em" }}>Senda</span>
            <span className="mono" style={{ fontSize: 9.5, color: "var(--ink-faint)", letterSpacing: ".1em" }}>ES · A1–B1</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: progress.streak ? "var(--coral)" : "var(--ink-faint)" }} title="Day streak">
              <Flame size={17} /><span className="mono" style={{ fontSize: 13, fontWeight: 700 }}>{progress.streak}</span>
            </span>
            <span className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }} title="XP">{progress.xp} XP</span>
            <button className="tap" onClick={onSettings} aria-label="Settings" style={{ color: "var(--ink-soft)", padding: 4 }}><SettingsIcon size={19} /></button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, width: "100%", maxWidth: 620, margin: "0 auto", padding: "22px 18px 96px" }}>{children}</main>

      <nav className="glass-nav">
        <div style={{ maxWidth: 620, margin: "0 auto", display: "flex", padding: "8px 12px calc(8px + env(safe-area-bottom))" }}>
          {nav.map(([id, label, Icon]) => {
            const on = tab === id;
            return (
              <button key={id} className="tap" onClick={() => setTab(id)} aria-current={on}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0", color: on ? "var(--teal)" : "var(--ink-faint)" }}>
                <Icon size={21} strokeWidth={on ? 2.4 : 1.9} />
                <span className="mono" style={{ fontSize: 10, letterSpacing: ".04em", fontWeight: on ? 700 : 400 }}>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
