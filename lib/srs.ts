// Leitner-box SRS implementation.
// 5 boxes with intervals: 1, 2, 4, 7, 14 days.
// Correct answer → move up a box. Wrong answer → drop to box 1.

export type SrsCard = {
  id: string;
  box: 1 | 2 | 3 | 4 | 5;
  due: number; // epoch ms
  seen: number; // total times reviewed
  correct: number;
  lastResult: "correct" | "wrong" | null;
};

export type SrsState = Record<string, SrsCard>;

export const BOX_INTERVALS_MS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 1 * 24 * 60 * 60 * 1000,
  2: 2 * 24 * 60 * 60 * 1000,
  3: 4 * 24 * 60 * 60 * 1000,
  4: 7 * 24 * 60 * 60 * 1000,
  5: 14 * 24 * 60 * 60 * 1000,
};

export const BOX_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "denně",
  2: "à 2 dny",
  3: "à 4 dny",
  4: "týdně",
  5: "à 14 dní",
};

export function initCard(id: string): SrsCard {
  return {
    id,
    box: 1,
    due: Date.now(),
    seen: 0,
    correct: 0,
    lastResult: null,
  };
}

export function gradeCard(
  card: SrsCard,
  result: "correct" | "wrong",
  now = Date.now()
): SrsCard {
  let nextBox = card.box;
  if (result === "correct") {
    nextBox = Math.min(5, card.box + 1) as SrsCard["box"];
  } else {
    nextBox = 1;
  }
  return {
    ...card,
    box: nextBox,
    due: now + BOX_INTERVALS_MS[nextBox],
    seen: card.seen + 1,
    correct: card.correct + (result === "correct" ? 1 : 0),
    lastResult: result,
  };
}

export function isDue(card: SrsCard | undefined, now = Date.now()): boolean {
  if (!card) return true; // never seen → due
  return card.due <= now;
}

export function getDueCards(
  state: SrsState,
  allIds: string[],
  now = Date.now()
): string[] {
  return allIds.filter((id) => isDue(state[id], now));
}

export function getBoxDistribution(
  state: SrsState,
  allIds: string[]
): Record<0 | 1 | 2 | 3 | 4 | 5, number> {
  const dist: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const id of allIds) {
    const card = state[id];
    if (!card) dist[0]++;
    else dist[card.box]++;
  }
  return dist as Record<0 | 1 | 2 | 3 | 4 | 5, number>;
}

// ===== localStorage helpers =====

const NS = "greek-trainer";

export function loadState(key: string): SrsState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(`${NS}:${key}`);
    if (!raw) return {};
    return JSON.parse(raw) as SrsState;
  } catch {
    return {};
  }
}

export function saveState(key: string, state: SrsState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${NS}:${key}`, JSON.stringify(state));
  } catch {
    // localStorage full or disabled – fail silently
  }
}

export function resetState(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(`${NS}:${key}`);
}

// ===== Streak tracking =====

export type StreakData = {
  lastStudyDate: string; // YYYY-MM-DD
  currentStreak: number;
  longestStreak: number;
  totalReviews: number;
};

const STREAK_KEY = `${NS}:streak`;

export function loadStreak(): StreakData {
  if (typeof window === "undefined")
    return {
      lastStudyDate: "",
      currentStreak: 0,
      longestStreak: 0,
      totalReviews: 0,
    };
  try {
    const raw = window.localStorage.getItem(STREAK_KEY);
    if (!raw)
      return {
        lastStudyDate: "",
        currentStreak: 0,
        longestStreak: 0,
        totalReviews: 0,
      };
    return JSON.parse(raw);
  } catch {
    return {
      lastStudyDate: "",
      currentStreak: 0,
      longestStreak: 0,
      totalReviews: 0,
    };
  }
}

export function recordReview(): StreakData {
  const data = loadStreak();
  const today = isoDate(new Date());
  if (data.lastStudyDate === today) {
    data.totalReviews++;
  } else {
    const yesterday = isoDate(new Date(Date.now() - 86400000));
    if (data.lastStudyDate === yesterday) {
      data.currentStreak++;
    } else {
      data.currentStreak = 1;
    }
    data.lastStudyDate = today;
    data.totalReviews++;
    data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  }
  return data;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
