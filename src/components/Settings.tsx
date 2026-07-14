import React, { useState } from "react";
import { X, Check, Moon, Sun, Monitor, LogIn, LogOut } from "lucide-react";
import { DEFAULT_MODEL } from "../lib/gemini";
import { useStore } from "../store/useStore";
import { loginWithGoogle, logout } from "../lib/firebase";

const MODELS = [
  ["gemini-2.5-flash", "Flash — fast & cheap (recommended)"],
];

export default function Settings({ onClose }: { onClose: () => void }) {
  const { model, setModel, theme, setTheme, user } = useStore();
  const [mdl, setMdl] = useState(model || DEFAULT_MODEL);
  const [thm, setThm] = useState(theme || "system");
  const [saved, setSaved] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    setLoginError("");
    try {
      await loginWithGoogle();
    } catch (e: any) {
      setLoginError(e.message || "Failed to sign in. Check your Firebase config in .env.");
    }
  };

  const save = () => {
    setModel(mdl);
    setTheme(thm);
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

        <div style={{ margin: "18px 0 6px" }}><span className="eyebrow">Account (Cloud Sync)</span></div>
        <div style={{ padding: "14px 16px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 14.5 }}>
            {user ? (
              <><span style={{ fontWeight: 600 }}>{user.displayName}</span><br /><span style={{ color: "var(--ink-soft)", fontSize: 13 }}>Synced to cloud</span></>
            ) : (
              <><span style={{ fontWeight: 600 }}>Not signed in</span><br /><span style={{ color: "var(--ink-soft)", fontSize: 13 }}>Sign in to save your progress</span></>
            )}
          </div>
          {user ? (
            <button className="tap" onClick={logout} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--paper-2)", borderRadius: 10, fontSize: 13.5, fontWeight: 600, color: "var(--coral)" }}>
              <LogOut size={16} /> Sign out
            </button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <button className="tap" onClick={handleLogin} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--teal)", borderRadius: 10, fontSize: 13.5, fontWeight: 600, color: "#fff" }}>
                <LogIn size={16} /> Sign in
              </button>
              {loginError && <div style={{ color: "var(--coral)", fontSize: 12, maxWidth: 200, textAlign: "right" }}>{loginError}</div>}
            </div>
          )}
        </div>

        <div style={{ margin: "18px 0 6px" }}><span className="eyebrow">Appearance</span></div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { id: "light", icon: Sun, label: "Light" },
            { id: "dark", icon: Moon, label: "Dark" },
            { id: "system", icon: Monitor, label: "System" },
          ].map(({ id, icon: Icon, label }) => (
            <button key={id} className="tap" onClick={() => setThm(id as any)}
              style={{ flex: 1, padding: "12px 0", border: `1.5px solid ${thm === id ? "var(--teal)" : "var(--line)"}`, background: thm === id ? "var(--teal-tint)" : "var(--card)", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: thm === id ? "var(--teal-deep)" : "var(--ink)" }}>
              <Icon size={18} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
            </button>
          ))}
        </div>

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

        <button className="tap primary-btn" onClick={save}
          style={{ width: "100%", marginTop: 20, padding: 14, background: saved ? "var(--teal)" : "var(--ink)", color: "#fff", borderRadius: 13, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {saved ? <><Check size={18} /> Saved</> : "Save"}
        </button>


      </div>
    </div>
  );
}
