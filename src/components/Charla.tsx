import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Loader2, Settings as SettingsIcon, Mic, MicOff } from "lucide-react";
import { Speaker } from "./ui";
import { tutorReply, tutorOpener, GeminiError } from "../lib/gemini";
import { cleanForSpeech, listen } from "../lib/speech";
import { useStore } from "../store/useStore";

function friendlyError(e: unknown) {
  const code = e instanceof GeminiError ? e.code : "UNKNOWN";
  if (code === "BAD_KEY") return "The backend API key is invalid.";
  if (code === "RATE_LIMIT") return "Gemini is rate-limiting. Wait a moment and try again.";
  if (code === "NETWORK") return "Couldn't reach the server — check your connection or start the backend.";
  return "Something went wrong. Try again.";
}

export default function Charla({ seedVocab, onFirstReply }: { seedVocab: any[]; onFirstReply?: () => void }) {
  const { model } = useStore();
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [started, setStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState("");
  const micRef = useRef<{ stop: () => void } | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Cleanup mic on unmount
  useEffect(() => {
    return () => {
      if (micRef.current) micRef.current.stop();
    };
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const start = async () => {
    setStarted(true); setLoading(true); setErr("");
    try {
      const opener = await tutorOpener(seedVocab.map((v) => v.es), { model });
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
    const next: { role: "user" | "assistant"; content: string }[] = [...msgs, { role: "user", content: text }];
    setMsgs(next); setInput(""); setLoading(true); setErr("");
    try {
      const reply = await tutorReply(next, { model });
      setMsgs([...next, { role: "assistant", content: reply }]);
      onFirstReply?.();
    } catch (e) {
      setErr(friendlyError(e));
    }
    setLoading(false);
  };

  const toggleMic = () => {
    if (isListening) {
      if (micRef.current) {
        micRef.current.stop();
        micRef.current = null;
      }
      setIsListening(false);
      return;
    }

    setMicError("");
    setIsListening(true);
    micRef.current = listen(
      (text, isFinal) => {
        // Overwrite the input with the spoken text.
        // We let the user review it before sending.
        setInput(text);
        if (isFinal) {
          setIsListening(false);
          micRef.current = null;
        }
      },
      (err) => {
        setMicError(err);
        setIsListening(false);
        micRef.current = null;
      },
      () => {
        setIsListening(false);
        micRef.current = null;
      }
    );
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
        <button className="tap" onClick={start} style={{ padding: "13px 26px", background: "var(--coral)", color: "#fff", borderRadius: 13, fontWeight: 700, fontSize: 15 }}>
          Start talking
        </button>
      </div>
    );
  }

  return (
    <div className="rise charla-container" style={{ maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", height: "min(62vh, 540px)" }}>
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
        {micError && <div style={{ color: "var(--coral)", fontSize: 13 }}>{micError}</div>}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", paddingTop: 8, borderTop: "1px solid var(--line)" }}>
        <button
          className={`tap mic-btn ${isListening ? "recording" : ""}`}
          onClick={toggleMic}
          aria-label={isListening ? "Stop listening" : "Start listening"}
          style={{ background: "var(--paper-2)", color: "var(--ink-soft)", borderRadius: 12, padding: 12, flexShrink: 0 }}
        >
          {isListening ? <Mic size={18} /> : <MicOff size={18} />}
        </button>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          rows={1} placeholder="Escribe en español…" aria-label="Your message in Spanish"
          style={{ flex: 1, resize: "none", border: "1px solid var(--line)", borderRadius: 12, padding: "11px 13px", fontSize: 15, background: "var(--card)", outline: "none", maxHeight: 120 }} />
        <button className="tap" onClick={send} disabled={loading || isListening} aria-label="Send" style={{ background: "var(--coral)", color: "#fff", borderRadius: 12, padding: 12, opacity: (loading || isListening) ? 0.5 : 1, flexShrink: 0 }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
