import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Loader2, Settings as SettingsIcon } from "lucide-react";
import { Speaker } from "./ui.jsx";
import { tutorReply, tutorOpener, GeminiError } from "../lib/gemini.js";
import { cleanForSpeech } from "../lib/speech.js";

function friendlyError(e) {
  const code = e instanceof GeminiError ? e.code : "UNKNOWN";
  if (code === "NO_KEY") return "Add your Gemini API key in Settings to chat with Lucía.";
  if (code === "BAD_KEY") return "That API key looks invalid. Check it in Settings.";
  if (code === "RATE_LIMIT") return "Gemini is rate-limiting. Wait a moment and try again.";
  if (code === "NETWORK") return "Couldn't reach Gemini — check your connection.";
  return "Something went wrong. Try again.";
}

export default function Charla({ seedVocab, apiKey, model, onFirstReply, onOpenSettings }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [started, setStarted] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const start = async () => {
    setStarted(true); setLoading(true); setErr("");
    try {
      const opener = await tutorOpener(seedVocab.map((v) => v.es), { key: apiKey, model });
      setMsgs([{ role: "assistant", content: opener }]);
    } catch (e) {
      setErr(friendlyError(e));
      setMsgs([{ role: "assistant", content: "¡Hola! ¿Cómo estás hoy? (How are you today?)" }]);
    }
    setLoading(false);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next); setInput(""); setLoading(true); setErr("");
    try {
      const reply = await tutorReply(next, { key: apiKey, model });
      setMsgs([...next, { role: "assistant", content: reply }]);
      onFirstReply?.();
    } catch (e) {
      setErr(friendlyError(e));
    }
    setLoading(false);
  };

  if (!started) {
    return (
      <div className="rise card" style={{ maxWidth: 460, margin: "0 auto", padding: 26, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--coral)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <MessageCircle size={26} color="#fff" />
        </div>
        <h3 className="serif" style={{ fontSize: 23, fontWeight: 600, margin: "0 0 6px" }}>Talk with Lucía</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 14.5, lineHeight: 1.55, margin: "0 0 18px" }}>
          Your AI tutor. Write in Spanish — short is fine. She replies simply, fixes mistakes with ✏️, and keeps the chat going. This is the part that makes you <em>conversational</em>.
        </p>
        {!apiKey ? (
          <button className="tap" onClick={onOpenSettings} style={{ padding: "13px 22px", background: "var(--ink)", color: "#fff", borderRadius: 13, fontWeight: 700, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}>
            <SettingsIcon size={17} /> Add your Gemini key
          </button>
        ) : (
          <button className="tap" onClick={start} style={{ padding: "13px 26px", background: "var(--coral)", color: "#fff", borderRadius: 13, fontWeight: 700, fontSize: 15 }}>
            Start talking
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rise" style={{ maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", height: "min(62vh, 540px)" }}>
      <div className="scroll" style={{ flex: 1, overflowY: "auto", padding: "4px 2px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
            <div style={{
              background: m.role === "user" ? "var(--teal)" : "var(--card)",
              color: m.role === "user" ? "#fff" : "var(--ink)",
              border: m.role === "user" ? "none" : "1px solid var(--line)",
              padding: "10px 13px", borderRadius: 15, fontSize: 15, lineHeight: 1.5, whiteSpace: "pre-wrap",
            }}>{m.content}</div>
            {m.role === "assistant" && <div style={{ marginTop: 3 }}><Speaker text={cleanForSpeech(m.content)} size={14} /></div>}
          </div>
        ))}
        {loading && <div style={{ alignSelf: "flex-start", color: "var(--ink-soft)" }}><Loader2 size={18} className="spin" /></div>}
        {err && <div style={{ color: "var(--coral)", fontSize: 13 }}>{err}</div>}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", paddingTop: 8, borderTop: "1px solid var(--line)" }}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          rows={1} placeholder="Escribe en español…" aria-label="Your message in Spanish"
          style={{ flex: 1, resize: "none", border: "1px solid var(--line)", borderRadius: 12, padding: "11px 13px", fontSize: 15, background: "var(--card)", outline: "none", maxHeight: 120 }} />
        <button className="tap" onClick={send} disabled={loading} aria-label="Send" style={{ background: "var(--coral)", color: "#fff", borderRadius: 12, padding: 12, opacity: loading ? 0.5 : 1 }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
