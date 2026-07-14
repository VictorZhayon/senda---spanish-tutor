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

// --- Speech Recognition ---

export function listen(
  onResult: (text: string, isFinal: boolean) => void,
  onError: (err: string) => void,
  onEnd: () => void
): { stop: () => void } | null {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    onError("Speech recognition is not supported in this browser.");
    onEnd();
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "es-MX";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (finalTranscript) {
      onResult(finalTranscript, true);
    } else if (interimTranscript) {
      onResult(interimTranscript, false);
    }
  };

  recognition.onerror = (event: any) => {
    if (event.error === "no-speech") return; // ignore silence
    onError("Microphone error: " + event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  try {
    recognition.start();
  } catch (err) {
    onError("Failed to start microphone.");
    onEnd();
    return null;
  }

  return {
    stop: () => recognition.stop()
  };
}
