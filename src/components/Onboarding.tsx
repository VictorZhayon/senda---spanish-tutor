import React from "react";
import { MessageCircle, RotateCcw, GraduationCap, ArrowRight } from "lucide-react";

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  return (
    <div style={{
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      background: "var(--paper)",
      color: "var(--ink)"
    }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 24px", maxWidth: 500, margin: "0 auto", width: "100%" }}>
        
        <div className="rise" style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            width: 80, height: 80, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-md)", borderRadius: 24, overflow: "hidden"
          }}>
            <img src="/logo.png" alt="Holita Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <h1 className="serif" style={{ fontSize: 36, fontWeight: 700, margin: "0 0 12px", letterSpacing: "-.02em" }}>Welcome to Holita</h1>
          <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>
            The absolute fastest path to speaking conversational Spanish. From zero to B1.
          </p>
        </div>

        <div className="rise" style={{ animationDelay: "150ms", display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
          <Feature 
            icon={<GraduationCap size={24} />} 
            color="var(--saffron)" 
            title="Frequency-First" 
            desc="Master the highest-frequency words and grammar structures actually used in daily life." 
          />
          <Feature 
            icon={<MessageCircle size={24} />} 
            color="var(--coral)" 
            title="AI Conversational Practice" 
            desc="Speak hands-free with Lucía, your personal AI tutor, to build real-world confidence." 
          />
          <Feature 
            icon={<RotateCcw size={24} />} 
            color="var(--teal)" 
            title="Spaced Repetition" 
            desc="Smart flashcards ensure you never forget what you've learned. Syncs across all your devices." 
          />
        </div>

        <div className="rise" style={{ animationDelay: "300ms", marginTop: "auto" }}>
          <button className="tap primary-btn" onClick={onComplete}
            style={{ 
              width: "100%", padding: 18, background: "var(--ink)", color: "var(--paper)", 
              borderRadius: 16, fontWeight: 700, fontSize: 17, display: "flex", alignItems: "center", 
              justifyContent: "center", gap: 8 
            }}>
            Start your path <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}

function Feature({ icon, color, title, desc }: { icon: React.ReactNode, color: string, title: string, desc: string }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14, background: "var(--card)", border: "1px solid var(--line)",
        color: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        boxShadow: "var(--shadow-sm)"
      }}>
        {icon}
      </div>
      <div>
        <h3 className="serif" style={{ fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>{title}</h3>
        <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}
