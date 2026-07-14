// Browser text-to-speech, tuned for neutral Latin American Spanish.
// Picks an es-MX / es-US / es-419 voice when available, falls back to any es-*.

let cached = null;

function pickVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  return (
    voices.find((v) => /es(-|_)?(MX|US|419|LA)/i.test(v.lang)) ||
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("es")) ||
    null
  );
}

export function speak(text) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    cached = cached || pickVoice();
    if (cached) u.voice = cached;
    u.lang = cached ? cached.lang : "es-MX";
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  } catch {
    /* no-op */
  }
}

// Voices load async on some browsers; refresh the cache when they arrive.
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cached = pickVoice();
  };
}

// Strip glosses "(...)" and correction lines "✏️ ..." before reading aloud.
export function cleanForSpeech(text) {
  return text.replace(/✏️.*(\n|$)/g, "").replace(/\(.*?\)/g, "").trim();
}
