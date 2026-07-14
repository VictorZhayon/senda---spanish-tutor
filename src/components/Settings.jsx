import React, { useState } from "react";
import { X, Key, ExternalLink, Trash2, Check } from "lucide-react";
import { DEFAULT_MODEL } from "../lib/gemini.js";

const MODELS = [
  ["gemini-2.5-flash", "Flash — fast & cheap (recommended)"],
  ["gemini-2.5-pro", "Pro — slower, more capable"],
  ["gemini-3.5-flash", "3.5 Flash — newest fast model"],
];

export default function Settings({ apiKey, model, onSave, onClose }) {
  const [draft, setDraft] = useState(apiKey || "");
  const [mdl, setMdl] = useState(model || DEFAULT_MODEL);
  const [saved, setSaved] = useState(false);

  const save = () => {
    onSave(draft.trim(), mdl);
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Settings"
      style={{ position: "fixed", inset: 0, background: "rgba(34,27,22,.45)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 50 }}
      onClick={onClose}>
      <div className="rise" onClick={(e) => e.stopPropagation()}
        style={{ background: "var(--paper)", width: "100%", maxWidth: 520, borderRadius: "22px 22px 0 0", padding: "22px 20px calc(22px + env(safe-area-inset-bottom))", maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Settings</h2>
          <button className="tap" onClick={onClose} aria-label="Close" style={{ padding: 6 }}><X size={22} /></button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 7, margin: "16px 0 6px" }}>
          <Key size={16} color="var(--teal)" />
          <span className="eyebrow">Gemini API key</span>
        </div>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} type="password" placeholder="AIza…" aria-label="Gemini API key"
          style={{ width: "100%", border: "1px solid var(--line)", borderRadius: 11, padding: "12px 13px", fontSize: 15, background: "var(--card)", outline: "none" }} />

        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.55, margin: "10px 0 0" }}>
          Your key is stored <strong>only in this browser</strong> (localStorage) and sent directly to Google — it never touches any other server. Get a free key at{" "}
          <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" style={{ color: "var(--teal)", fontWeight: 600, textDecoration: "none" }}>
            Google AI Studio <ExternalLink size={11} style={{ verticalAlign: "middle" }} />
          </a>.
        </p>

        <div style={{ margin: "18px 0 6px" }}><span className="eyebrow">Model</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {MODELS.map(([id, label]) => (
            <button key={id} className="tap" onClick={() => setMdl(id)}
              style={{ textAlign: "left", border: `1.5px solid ${mdl === id ? "var(--teal)" : "var(--line)"}`, background: mdl === id ? "var(--teal-tint)" : "var(--card)", borderRadius: 11, padding: "11px 13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14 }}><span className="mono" style={{ fontSize: 12.5 }}>{id}</span><br /><span style={{ color: "var(--ink-soft)", fontSize: 12.5 }}>{label.split(" — ")[1]}</span></span>
              {mdl === id && <Check size={17} color="var(--teal)" />}
            </button>
          ))}
        </div>

        <button className="tap" onClick={save}
          style={{ width: "100%", marginTop: 20, padding: 14, background: saved ? "var(--teal)" : "var(--ink)", color: "#fff", borderRadius: 13, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {saved ? <><Check size={18} /> Saved</> : "Save"}
        </button>

        {apiKey && (
          <button className="tap" onClick={() => { setDraft(""); onSave("", mdl); }}
            style={{ width: "100%", marginTop: 9, padding: 11, background: "transparent", color: "var(--coral)", borderRadius: 11, fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <Trash2 size={15} /> Remove key from this device
          </button>
        )}
      </div>
    </div>
  );
}
