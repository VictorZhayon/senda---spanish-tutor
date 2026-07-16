# Holita

Holita is a modern, frequency-first Spanish learning application that takes you from A1 to B1 level fluency. It combines structured vocabulary lessons, a Spaced Repetition System (SRS), and an interactive AI tutor named "Lucía" for hands-free conversational practice. 

Holita is built as a Progressive Web App (PWA) with a premium glassmorphism UI, a secure local backend proxy, and cross-device cloud sync.

## 🚀 Features

- **Structured Curriculum (A1 → B1)**: 40 hand-crafted lessons introducing the highest-frequency Spanish vocabulary.
- **Spaced Repetition System (SRS)**: Smart flashcard reviews based on your performance, ensuring you never forget what you've learned.
- **Hands-Free Conversation (Speech-to-Text)**: Practice real conversational Spanish by speaking directly to Lucía using the Web Speech API. She talks back via Text-to-Speech (TTS).
- **Infinite AI Lessons**: Automatically generate new, dynamic practice lessons tailored entirely around the vocabulary you have already unlocked.
- **Ask Lucía**: Stuck on grammar? A dedicated Q&A box lets you ask questions in English to get clear, contextual explanations of Spanish concepts.
- **Firebase Cloud Sync**: Authenticate with Google to automatically sync your XP, streaks, and flashcard schedules across all your devices.
- **Premium Aesthetics**: Features a sleek, heavily customized glassmorphism design with a fully supported Dark Mode.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 & Vite
- **Language**: TypeScript (strict type-checking)
- **State Management**: Zustand (with localStorage persistence + Firebase Hydration)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Keyframe Animations)
- **Icons**: Lucide React
- **PWA**: `vite-plugin-pwa` for offline capabilities and installation.

### Backend & Cloud
- **Backend Proxy**: Express.js (Node.js) server running concurrently to securely proxy Gemini API requests.
- **AI Engine**: Google Generative AI (`gemini-2.5-flash`).
- **Database & Auth**: Firebase (Auth & Firestore) for cross-device syncing.

## 💻 Local Development Setup

To run Holita locally, you will need [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
You need API keys for both Google Gemini and Firebase. 
Create a `.env` file in the root directory (you can copy `.env.example` as a starting point) and add the following keys:

```env
# Gemini API Key (Required for AI interactions)
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Config (Required for Cloud Sync)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Start the Application
We use `concurrently` to run both the Vite frontend client and the Express backend proxy simultaneously.

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend proxy at `http://localhost:3001`.

## ⚙️ How the Architecture Works

- **Secure AI Proxy**: Holita does not expose your `GEMINI_API_KEY` to the browser. Instead, the React frontend sends queries to `POST /api/gemini` which hits the local `server.js` Express app. The Express app injects the API key securely and forwards the request to Google. Vite handles proxying `/api` to the backend during development.
- **Zustand + Firebase**: All progress is managed synchronously in the browser memory by `useStore.ts` for a highly responsive UI. In the background, `App.tsx` debounces these changes and saves the user's state to a Firestore document (`users/{uid}`). Upon login, the app fetches the Firestore document and rehydrates the Zustand store.
