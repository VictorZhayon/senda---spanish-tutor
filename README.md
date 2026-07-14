# Senda

A frequency-first Spanish course (**A1 → B1**) with an AI tutor, built as an installable, offline-capable PWA. Neutral **Latin American Spanish** (tú / ustedes, no vosotros, seseo).

The whole thing runs in the browser with **no backend**. The AI tutor uses your **own Gemini API key**, stored only on your device.

## The daily ritual

Each day is three short blocks — about 15 minutes total:

- **Repasar** — spaced-repetition flashcard review (an SM-2 variant). The deck fills as you complete lessons.
- **Aprender** — one lesson: a short explainer + grammar table + six vocab cards with audio.
- **Hablar** — a conversation with *Lucía*, the AI tutor. She replies in simple Spanish, corrects mistakes with a `✏️` line, and always asks a follow-up question.

Plus **Ask Lucía** for one-off grammar questions, and a **Reference** tab for pronunciation.

## Curriculum

40 lessons: **A1** (1–8), **A2** (9–20), **B1** (21–40), covering everything from the five vowel sounds up through the subjunctive, the past tenses in contrast, por/para, and narrative storytelling. When you finish, the app generates fresh AI practice lessons on demand.

> **Honest pacing:** at ~15 min/day, 40 lessons is a year-plus of material, and B1 is something to *grow into*, not finish in three months. The app is built to make each minute count — daily review + real conversation — rather than to promise fast fluency.

## Setup

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Node 18+ recommended.

## Bring your own Gemini key

1. Get a free key at **[Google AI Studio](https://aistudio.google.com/apikey)**.
2. Open the app → **Settings** (gear, top right) → paste the key → **Save**.
3. The key is stored in your browser's `localStorage` and sent **directly to Google** — it never touches any other server. Remove it anytime from Settings.

Default model is `gemini-2.5-flash` (fast and cheap); you can switch models in Settings.

## Deploy

The build is host-agnostic. The only knob is the base path, via the `VITE_BASE` env var.

**Netlify / Vercel / custom domain / GitHub user-org pages** — no config needed:
```bash
npm run build      # base defaults to "/"
```

**GitHub Pages project site** (served from `/<repo>/`):
```bash
VITE_BASE=/senda/ npm run build
# then publish the dist/ folder (e.g. with the gh-pages package or Actions)
```

Any static host works — just serve the `dist/` folder.

## PWA / offline

- Installable (Add to Home Screen) on mobile and desktop.
- The app shell, lessons, and reference work fully **offline**.
- The AI tutor (Repasar and the rest work offline; **Hablar** and **Ask Lucía** need a connection, since they call Gemini).

## Tech

Vite · React 18 · vite-plugin-pwa (Workbox) · lucide-react · the Web Speech API for audio · the Gemini Generative Language API. No tracking, no analytics, no accounts.

## License

MIT — see [LICENSE](./LICENSE).
