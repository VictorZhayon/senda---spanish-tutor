// Web Speech API wrapper for simple TTS.

let synth: SpeechSynthesis | null = null;
let cached: SpeechSynthesisVoice | null = null;
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  synth = window.speechSynthesis;
}

function getVoice(): SpeechSynthesisVoice | null {
  if (cached) return cached;
  if (!synth) return null;
  const voices = synth.getVoices();
  // Prefer a Google Latin American / Mexican voice if available, else any Spanish
  cached =
    voices.find((v) => v.name.includes("Google") && v.lang === "es-US") ||
    voices.find((v) => v.lang === "es-MX" || v.lang === "es-US") ||
    voices.find((v) => v.lang.startsWith("es")) ||
    null;
  return cached;
}

export function speak(text: string) {
  if (!synth) return;
  // Bug in some browsers: speech synthesis stops working if not cancelled first.
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-MX";
  u.rate = 0.95; // slightly slower for learners
  const v = getVoice();
  if (v) u.voice = v;
  synth.speak(u);
}

// Voices load async on some browsers; refresh the cache when they arrive.
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cached = getVoice();
  };
}

// Strip glosses "(...)" and correction lines "✏️ ..." before reading aloud.
export function cleanForSpeech(text: string) {
  return text.replace(/✏️.*(\n|$)/g, "").replace(/\(.*?\)/g, "").trim();
}
