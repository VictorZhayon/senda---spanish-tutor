import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Speaker, Pill } from "./ui.jsx";

function VocabCard({ item, idx, total }) {
  return (
    <div className="card rise" key={idx} style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">Word {idx} / {total}</span>
        <Speaker text={item.es} size={20} />
      </div>
      <div className="serif" style={{ fontSize: 32, fontWeight: 600, margin: "10px 0 2px" }}>{item.es}</div>
      <div style={{ fontSize: 17, color: "var(--teal-deep)", fontWeight: 600 }}>{item.en}</div>
      <div style={{ marginTop: 16, padding: 14, background: "var(--paper)", borderRadius: 12, border: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, fontStyle: "italic" }}>{item.ex}</span>
          <Speaker text={item.ex} size={15} />
        </div>
        <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 4 }}>{item.exEn}</div>
      </div>
    </div>
  );
}

export default function Lesson({ lesson, onComplete }) {
  const [step, setStep] = useState(0); // 0 = explainer, then one per vocab item
  const total = 1 + lesson.vocab.length;
  const pct = Math.round((step / (total - 1)) * 100);

  return (
    <div className="rise" style={{ maxWidth: 520, margin: "0 auto" }}>
      <div style={{ height: 5, background: "var(--paper-2)", borderRadius: 99, marginBottom: 18 }}>
        <div style={{ height: "100%", width: pct + "%", background: "var(--saffron)", borderRadius: 99, transition: "width .3s ease" }} />
      </div>

      {step === 0 ? (
        <div className="card rise" style={{ padding: 22 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <Pill tone="saffron">{lesson.level || "Week " + lesson.week}</Pill>
            {lesson.week && <Pill tone="teal">Week {lesson.week}</Pill>}
          </div>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 600, margin: "12px 0 2px" }}>{lesson.title}</h2>
          <div className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 16 }}>{lesson.focus}</div>
          {lesson.explainer.map((p, idx) => (
            <p key={idx} style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 12px", color: "#3a2f26" }}>{p}</p>
          ))}
          {lesson.grammar && (
            <div style={{ marginTop: 8, border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
              <div className="eyebrow" style={{ padding: "8px 12px", background: "var(--paper-2)" }}>{lesson.grammar.title}</div>
              {lesson.grammar.rows.map((r, ri) => (
                <div key={ri} style={{ display: "flex", borderTop: "1px solid var(--line)" }}>
                  <div className="mono" style={{ flex: "0 0 40%", padding: "8px 12px", color: "var(--ink-soft)", fontSize: 13 }}>{r[0]}</div>
                  <div style={{ flex: 1, padding: "8px 12px", fontWeight: 600, fontSize: 14.5 }}>{r[1]}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <VocabCard item={lesson.vocab[step - 1]} idx={step} total={lesson.vocab.length} />
      )}

      <button className="tap" onClick={() => (step < total - 1 ? setStep(step + 1) : onComplete())}
        style={{ width: "100%", marginTop: 18, padding: 15, background: "var(--teal)", color: "#fff", borderRadius: 14, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        {step < total - 1 ? "Next" : "Finish lesson"} <ChevronRight size={18} />
      </button>
    </div>
  );
}
