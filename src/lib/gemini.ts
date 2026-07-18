// Gemini client (Generative Language API). Bring-your-own key: the key lives
// only in the user's browser (localStorage) and is sent directly to Google.
//
// Endpoint reference (June 2026):
//   POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
// We now use a backend proxy at /api/gemini for security.
const ENDPOINT = "/api/gemini";

export const DEFAULT_MODEL = "gemini-2.5-flash";

export class GeminiError extends Error {
  code: string;
  constructor(code: string, message?: string) {
    super(message || code);
    this.code = code;
  }
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Map our chat history to Gemini `contents`. Gemini wants the first turn to be
// "user", so if a generated opener leads, we prepend a tiny kickoff turn.
function toContents(history: Message[]) {
  const c: any[] = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  if (c.length && c[0].role === "model") {
    c.unshift({ role: "user", parts: [{ text: "Hola, empecemos." }] });
  }
  return c;
}

interface GenerateOpts {
  model?: string;
  system?: string;
  history?: Message[];
  maxTokens?: number;
  temperature?: number;
}

export async function geminiGenerate({
  model = DEFAULT_MODEL,
  system,
  history = [],
  maxTokens = 1024,
  temperature = 0.7,
}: GenerateOpts = {}) {

  const generationConfig: any = { temperature, maxOutputTokens: maxTokens };
  // thinkingConfig is valid for 2.5-series; skip it for other models.
  if (model.includes("2.5")) generationConfig.thinkingConfig = { thinkingBudget: 0 };

  const body: any = { model, contents: toContents(history), generationConfig };
  if (system) body.systemInstruction = { parts: [{ text: system }] };

  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new GeminiError("NETWORK", "Could not reach the server. Check your connection.");
  }

  if (!res.ok) {
    if (res.status === 500) throw new GeminiError("BAD_KEY", "Backend missing valid API key.");
    const data = await res.json().catch(() => ({}));
    const errMsg = data.error?.message || `Server returned an error (${res.status}).`;
    throw new GeminiError("HTTP_" + res.status, errMsg);
  }

  const data = await res.json();
  const cand = data.candidates && data.candidates[0];
  if (cand && cand.finishReason === "SAFETY") throw new GeminiError("BLOCKED", "Response was blocked. Try rephrasing.");
  const text = (cand?.content?.parts || [])
    .map((p: any) => p.text)
    .filter(Boolean)
    .join("\n")
    .trim();
  if (!text) throw new GeminiError("EMPTY", "Empty response. Try again.");
  return text;
}

/* ---------- prompts ---------- */

export const TUTOR_SYSTEM =
  "You are Lucía, a warm, patient Spanish tutor. Your student is an English speaker working from CEFR A1 toward general conversational fluency, learning neutral LATIN AMERICAN Spanish (use 'tú' and 'ustedes'; never 'vosotros'; seseo — no 'th' sound). " +
  "RULES: (1) Keep YOUR replies short — 1 to 3 sentences. (2) Speak mostly in SIMPLE Spanish at the student's level; add a brief English gloss in parentheses for any word likely to be new. (3) If the student's Spanish has a mistake, FIRST give the corrected version on its own line starting with '✏️ ', then continue warmly — never lecture. (4) Always end with ONE simple question to keep the conversation going. (5) Match difficulty to how the student writes; if they write in English, gently nudge them back to Spanish with an easy prompt.";

const ASK_SYSTEM =
  "You are a concise, encouraging Spanish tutor for an English-speaking learner (A1–B1), teaching neutral LATIN AMERICAN Spanish (tú/ustedes, no vosotros). Answer the question clearly in English with 1–3 short Spanish examples, each followed by its English meaning in parentheses. Keep it under ~130 words. No filler.";

export async function tutorReply(history: Message[], opts: GenerateOpts) {
  return geminiGenerate({ ...opts, system: TUTOR_SYSTEM, history });
}

export async function tutorOpener(seedWords: string[], opts: GenerateOpts) {
  const words = seedWords.slice(0, 8).join(", ");
  return geminiGenerate({
    ...opts,
    system: TUTOR_SYSTEM,
    history: [
      {
        role: "user",
        content: `Start a friendly, very simple conversation in Spanish to warm up the student. If natural, gently reuse some words they just learned: ${words}. Keep it to 1–2 short sentences and end with one easy question.`,
      },
    ],
  });
}

export async function askTutor(question: string, opts: GenerateOpts) {
  return geminiGenerate({ ...opts, system: ASK_SYSTEM, history: [{ role: "user", content: question }], maxTokens: 700 });
}

// Generate an extra practice lesson once the built-in course is finished.
export async function generatePracticeLesson(knownWords: string[], opts: GenerateOpts) {
  const sample = knownWords.slice(-40).join(", ");
  const sys =
    "You are a Spanish curriculum author. Create ONE short practice lesson in neutral Latin American Spanish (tú/ustedes, no vosotros) for an A2–B1 learner. " +
    "Respond with ONLY valid JSON (no markdown, no backticks) matching exactly: " +
    '{"title": string (Spanish), "focus": string (English, short), "explainer": [string, string] (English, 1–2 sentences each), ' +
    '"vocab": [{"es": string, "en": string, "ex": string (Spanish example), "exEn": string (English of example)}] with 6 items}. ' +
    "Pick a fresh everyday theme. Reuse or lightly extend these known words where natural: " + sample;
  const raw = await geminiGenerate({
    ...opts,
    system: sys,
    history: [{ role: "user", content: "Generate the practice lesson now." }],
    maxTokens: 1200,
    temperature: 0.9,
  });
  const clean = raw.replace(/```json|```/g, "").trim();
  const data = JSON.parse(clean);
  return data;
}
