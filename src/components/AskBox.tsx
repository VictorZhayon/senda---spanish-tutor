import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { askTutor, GeminiError } from "../lib/gemini";
import { useStore } from "../store/useStore";

export default function AskBox({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { apiKey, model } = useStore();
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!q.trim() || loading) return;
    if (!apiKey) { onOpenSettings?.(); return; }
    setLoading(true); setA("");
    try {
      const r = await askTutor(q.trim(), { key: apiKey, model });
      setA(r);
    } catch (e) {
      const code = e instanceof GeminiError ? e.code : "";
      setA(code === "BAD_KEY" ? "That API key looks invalid — check Settings." : "Connection error — try again.");
    }
    setLoading(false);
  };

  return (
    <div className="card" style={{ padding: 18, maxWidth: 560, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Sparkles size={17} color="var(--saffron)" />
        <span className="eyebrow">Ask Lucía</span>
      </div>
      <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: "0 0 12px" }}>
        Stuck on anything? Ask in English — “when do I use ser vs estar?”, “how do I say I’ll be there at 5?”
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Your question…" aria-label="Your grammar question"
          style={{ flex: 1, border: "1px solid var(--line)", borderRadius: 11, padding: "11px 13px", fontSize: 15, background: "var(--paper)", outline: "none" }} />
        <button className="tap" onClick={ask} disabled={loading} style={{ background: "var(--saffron)", color: "#3a2407", borderRadius: 11, padding: "0 16px", fontWeight: 700, opacity: loading ? 0.6 : 1 }}>
          {loading ? <Loader2 size={16} className="spin" /> : "Ask"}
        </button>
      </div>
      {a && (
        <div className="rise" style={{ marginTop: 14, padding: 14, background: "var(--paper)", borderRadius: 11, fontSize: 14.5, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{a}</div>
      )}
    </div>
  );
}
