import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_MODEL } from '../lib/gemini';
import { schedule, DAY } from '../lib/srs';

// Types will be properly defined and imported once we convert other files,
// but let's define the store shape now.
export interface Progress {
  xp: number;
  streak: number;
  lastDay: string | null;
  completed: string[];
}

export interface DaySession {
  date: string;
  repasar: boolean;
  aprender: boolean;
  hablar: boolean;
}

export const todayKey = () => new Date().toISOString().slice(0, 10);
const freshDay = (): DaySession => ({ date: todayKey(), repasar: false, aprender: false, hablar: false });

interface SendaState {
  // Global UI State
  tab: string;
  view: string | null;
  activeLessonId: string | null;
  
  // Persisted Settings & Progress
  progress: Progress;
  srs: Record<string, any>; // Will type correctly after SRS TS conversion
  day: DaySession;
  genLessons: any[]; // Generated lessons
  apiKey: string;
  model: string;

  // Actions
  setTab: (tab: string) => void;
  setView: (view: string | null) => void;
  setActiveLessonId: (id: string | null) => void;
  setApiKey: (key: string) => void;
  setModel: (model: string) => void;
  bumpStreak: () => void;
  finishBlock: (name: keyof Omit<DaySession, 'date'>, xp?: number) => void;
  gradeCard: (card: any, g: number) => void;
  completeLesson: (lesson: any) => void;
  addGenLesson: (lesson: any) => void;
}

export const useStore = create<SendaState>()(
  persist(
    (set, get) => ({
      // Initial UI State
      tab: 'hoy',
      view: null,
      activeLessonId: null,

      // Initial Persisted State
      progress: { xp: 0, streak: 0, lastDay: null, completed: [] },
      srs: {},
      day: freshDay(),
      genLessons: [],
      apiKey: '',
      model: DEFAULT_MODEL,

      // Actions
      setTab: (tab) => set({ tab }),
      setView: (view) => set({ view }),
      setActiveLessonId: (activeLessonId) => set({ activeLessonId }),
      setApiKey: (apiKey) => set({ apiKey }),
      setModel: (model) => set({ model }),

      bumpStreak: () => {
        const { progress } = get();
        const t = todayKey();
        if (progress.lastDay === t) return;
        const yest = new Date(Date.now() - DAY).toISOString().slice(0, 10);
        set({
          progress: {
            ...progress,
            streak: progress.lastDay === yest ? progress.streak + 1 : 1,
            lastDay: t
          }
        });
      },

      finishBlock: (name, xpAmount = 15) => {
        get().bumpStreak();
        set((state) => ({
          progress: { ...state.progress, xp: state.progress.xp + xpAmount },
          day: { ...state.day, [name]: true },
          view: null
        }));
      },

      gradeCard: (card, g) => {
        set((state) => {
          const s = state.srs;
          return {
            srs: {
              ...s,
              [card.es]: schedule({ ...card, ...(s[card.es] || {}) }, g)
            }
          };
        });
      },

      completeLesson: (lesson) => {
        set((state) => {
          const next = { ...state.srs };
          const due = Date.now() + DAY;
          lesson.vocab.forEach((v: any) => {
            if (!next[v.es]) next[v.es] = { ...v, due, interval: 0, ease: 2.5, reps: 0 };
          });

          const completed = state.progress.completed.includes(lesson.id)
            ? state.progress.completed
            : [...state.progress.completed, lesson.id];
          
          const xp = state.progress.completed.includes(lesson.id) ? state.progress.xp : state.progress.xp + 5;

          return {
            srs: next,
            progress: { ...state.progress, completed, xp },
            day: { ...state.day, aprender: true },
            view: null,
            activeLessonId: null
          };
        });
      },

      addGenLesson: (lesson) => set((state) => ({ genLessons: [...state.genLessons, lesson] }))
    }),
    {
      name: 'senda-storage',
      // We don't want to persist UI state like tab and view, only core user data.
      partialize: (state) => ({
        progress: state.progress,
        srs: state.srs,
        day: state.day?.date === todayKey() ? state.day : freshDay(),
        genLessons: state.genLessons,
        apiKey: state.apiKey,
        model: state.model
      }),
    }
  )
);
