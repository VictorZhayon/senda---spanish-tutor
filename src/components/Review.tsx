import React, { useState } from "react";
import { Speaker } from "./ui";

export default function Review({ deck, onGrade, onDone }: { deck: any[]; onGrade: (card: any, g: number) => void; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  if (!deck.length) return null;
  const card = deck[i];

  const grade = (g: number) => {
    onGrade(card, g);
    setFlipped(false);
    if (i + 1 < deck.length) setTimeout(() => setI(i + 1), 120);
    else setTimeout(onDone, 120);
  };

  return (
    <div className="rise" style={{ maxWidth: 460, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span className="eyebrow">Review</span>
        <span className="mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{i + 1} / {deck.length}</span>
      </div>

      <div style={{ perspective: 1200, height: 230 }} onClick={() => setFlipped((f) => !f)}>
        <div className={"flip" + (flipped ? " is-back" : "")} style={{ position: "relative", width: "100%", height: "100%" }}>
          <div className="face card" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 22 }}>
            <span className="eyebrow">Español</span>
            <div className="serif" style={{ fontSize: 30, fontWeight: 600, textAlign: "center" }}>{card.es}</div>
            <Speaker text={card.es} size={20} />
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 6 }}>tap to flip →</span>
          </div>
          <div className="face face-back card" style={{ position: "absolute", inset: 0, background: "var(--teal)", color: "#fff", border: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 22 }}>
            <span className="eyebrow" style={{ color: "var(--saffron-soft)" }}>English</span>
            <div className="serif" style={{ fontSize: 25, fontWeight: 600, textAlign: "center" }}>{card.en}</div>
            {card.ex && (
              <div style={{ textAlign: "center", opacity: 0.92, marginTop: 4, fontSize: 14 }}>
                <em>{card.ex}</em>
                <br />
                <span style={{ opacity: 0.75, fontSize: 13 }}>{card.exEn}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {!flipped ? (
        <button className="tap" onClick={() => setFlipped(true)} style={{ width: "100%", marginTop: 18, padding: 14, background: "var(--ink)", color: "#fff", borderRadius: 14, fontWeight: 700, fontSize: 15 }}>
          Show answer
        </button>
      ) : (
        <div className="rise" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginTop: 18 }}>
          {(Object.entries({
            Again: { g: 0, col: "var(--coral)" },
            Hard: { g: 1, col: "#b9892e" },
            Good: { g: 2, col: "var(--teal)" },
            Easy: { g: 3, col: "var(--teal-deep)" }
          }) as [string, { g: number, col: string }][]).map(([label, { g, col }]) => (
            <button key={g} className="tap" onClick={() => grade(g)} style={{ padding: "11px 4px", borderRadius: 12, background: "var(--card)", border: `1.5px solid ${col}`, color: col, fontWeight: 700, fontSize: 12.5 }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
