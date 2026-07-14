import React from "react";
import { Volume2, ChevronRight, Check } from "lucide-react";
import { speak } from "../lib/speech.js";

export function Speaker({ text, size = 16 }) {
  return (
    <button
      aria-label={"Listen: " + text}
      onClick={(e) => { e.stopPropagation(); speak(text); }}
      className="tap"
      style={{ color: "var(--teal)", display: "inline-flex", alignItems: "center", padding: 4, borderRadius: 8 }}
    >
      <Volume2 size={size} />
    </button>
  );
}

export function Pill({ children, tone = "teal" }) {
  const map = {
    teal: ["var(--teal-tint)", "var(--teal-deep)"],
    saffron: ["var(--saffron-soft)", "#8a5a12"],
    coral: ["#f4dad3", "var(--coral)"],
  };
  const [bg, fg] = map[tone];
  return (
    <span className="mono" style={{ background: bg, color: fg, fontSize: 10, padding: "3px 9px", borderRadius: 999, letterSpacing: ".08em" }}>
      {children}
    </span>
  );
}

// The signature element: the daily session dial with three arcs.
export function Dial({ done }) {
  const segs = [
    { key: "repasar", on: done.repasar, color: "var(--teal)" },
    { key: "aprender", on: done.aprender, color: "var(--saffron)" },
    { key: "hablar", on: done.hablar, color: "var(--coral)" },
  ];
  const R = 54, C = 2 * Math.PI * R, gap = 10, seg = C / 3 - gap;
  const count = segs.filter((s) => s.on).length;
  return (
    <svg viewBox="0 0 140 140" width="146" height="146" role="img" aria-label={`${count} of 3 done today`} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx="70" cy="70" r={R} fill="none" stroke="var(--paper-2)" strokeWidth="11" />
      {segs.map((s, i) => (
        <circle key={s.key} cx="70" cy="70" r={R} fill="none"
          stroke={s.on ? s.color : "var(--line)"} strokeWidth="11" strokeLinecap="round"
          strokeDasharray={`${seg} ${C - seg}`} strokeDashoffset={-(i * (seg + gap))}
          style={{ transition: "stroke .4s ease" }} />
      ))}
      <g style={{ transform: "rotate(90deg)", transformOrigin: "70px 70px" }}>
        <text x="70" y="64" textAnchor="middle" fontFamily="Fraunces,serif" fontSize="30" fontWeight="600" fill="var(--ink)">
          {count}<tspan fontSize="16" fill="var(--ink-soft)">/3</tspan>
        </text>
        <text x="70" y="84" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="9" letterSpacing="1.5" fill="var(--ink-soft)">HOY</text>
      </g>
    </svg>
  );
}

export function Block({ label, sub, done, icon, tone, onClick, mins }) {
  const accent = tone === "teal" ? "var(--teal)" : tone === "saffron" ? "var(--saffron)" : "var(--coral)";
  return (
    <button className="card tap" onClick={onClick}
      style={{ width: "100%", textAlign: "left", padding: "15px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, borderColor: done ? accent : "var(--line)" }}>
      <div style={{ width: 44, height: 44, borderRadius: 13, background: done ? accent : "var(--paper-2)", color: done ? "#fff" : accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {done ? <Check size={22} /> : icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="serif" style={{ fontSize: 18, fontWeight: 600 }}>{label}</span>
          <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)" }}>{mins}</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{done ? "Done ✓" : sub}</div>
      </div>
      {!done && <ChevronRight size={20} style={{ color: "var(--ink-soft)", flexShrink: 0 }} />}
    </button>
  );
}

export function Empty({ title, body, onDone, cta = "Got it" }) {
  return (
    <div className="rise card" style={{ maxWidth: 440, margin: "0 auto", padding: 26, textAlign: "center" }}>
      <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: "0 0 8px" }}>{title}</h3>
      <p style={{ color: "var(--ink-soft)", fontSize: 14.5, lineHeight: 1.55, margin: "0 0 18px" }}>{body}</p>
      <button className="tap" onClick={onDone} style={{ padding: "12px 24px", background: "var(--ink)", color: "#fff", borderRadius: 12, fontWeight: 700 }}>{cta}</button>
    </div>
  );
}
