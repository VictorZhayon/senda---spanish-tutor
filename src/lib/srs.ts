// Spaced repetition — a lightweight SM-2 variant.
// Grades: 0 = Again, 1 = Hard, 2 = Good, 3 = Easy.

export const DAY = 86400000;

export interface Card {
  es: string;
  en: string;
  ex?: string;
  exEn?: string;
  interval?: number;
  ease?: number;
  reps?: number;
  due?: number;
  seen?: boolean;
}

export function schedule(card: Card, grade: number): Card {
  let interval = card.interval || 0;
  let ease = card.ease || 2.5;
  let reps = card.reps || 0;

  if (grade === 0) {
    reps = 0;
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
  } else {
    if (reps === 0) interval = grade === 3 ? 2 : 1;
    else if (reps === 1) interval = grade === 1 ? 2 : grade === 2 ? 3 : 5;
    else interval = Math.max(1, Math.round(interval * (ease + (grade - 2) * 0.15)));
    ease = Math.max(1.3, ease + (grade === 3 ? 0.12 : grade === 1 ? -0.1 : 0));
    reps += 1;
  }

  // "Again" reappears within the session (~1 min); otherwise schedule in days.
  const due = Date.now() + (grade === 0 ? 60 * 1000 : interval * DAY);
  return { ...card, interval, ease, reps, due, seen: true };
}

// Cards whose due time has passed, soonest first, capped for a short session.
export function dueCards(srs: Record<string, Card>, now = Date.now(), cap = 20): Card[] {
  return Object.values(srs)
    .filter((c) => (c.due || 0) <= now)
    .sort((a, b) => (a.due || 0) - (b.due || 0))
    .slice(0, cap);
}
