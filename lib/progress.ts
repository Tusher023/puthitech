const PROGRESS_KEY = 'ai-course-progress';
const LAST_VISITED_KEY = 'ai-course-last-visited';
const STREAK_KEY = 'ai-course-streak';

interface ProgressData {
  completed: Record<string, string[]>; // moduleSlug -> lessonSlug[]
  timestamps: Record<string, number>;  // lessonKey -> timestamp
}

interface StreakData {
  lastStudied: string; // ISO date string
  currentStreak: number;
  longestStreak: number;
}

function getProgressData(): ProgressData {
  if (typeof window === 'undefined') return { completed: {}, timestamps: {} };
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { completed: {}, timestamps: {} };
    return JSON.parse(raw);
  } catch {
    return { completed: {}, timestamps: {} };
  }
}

function saveProgressData(data: ProgressData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export function getProgress(): Record<string, string[]> {
  return getProgressData().completed;
}

export function markComplete(moduleSlug: string, lessonSlug: string): void {
  const data = getProgressData();
  if (!data.completed[moduleSlug]) {
    data.completed[moduleSlug] = [];
  }
  if (!data.completed[moduleSlug].includes(lessonSlug)) {
    data.completed[moduleSlug].push(lessonSlug);
    data.timestamps[`${moduleSlug}/${lessonSlug}`] = Date.now();
  }
  saveProgressData(data);
  updateStreak();
}

export function markIncomplete(moduleSlug: string, lessonSlug: string): void {
  const data = getProgressData();
  if (data.completed[moduleSlug]) {
    data.completed[moduleSlug] = data.completed[moduleSlug].filter(
      (s) => s !== lessonSlug
    );
    delete data.timestamps[`${moduleSlug}/${lessonSlug}`];
  }
  saveProgressData(data);
}

export function isCompleted(moduleSlug: string, lessonSlug: string): boolean {
  const data = getProgressData();
  return !!data.completed[moduleSlug]?.includes(lessonSlug);
}

export function getModuleProgress(moduleSlug: string, totalLessons: number): number {
  const data = getProgressData();
  const completed = data.completed[moduleSlug]?.length ?? 0;
  if (totalLessons === 0) return 0;
  return Math.round((completed / totalLessons) * 100);
}

export function getTotalProgress(modules: { slug: string; lessons: { slug: string }[] }[]): number {
  const data = getProgressData();
  let total = 0;
  let completed = 0;
  for (const mod of modules) {
    total += mod.lessons.length;
    completed += data.completed[mod.slug]?.length ?? 0;
  }
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getTotalCompleted(modules: { slug: string; lessons: { slug: string }[] }[]): number {
  const data = getProgressData();
  let completed = 0;
  for (const mod of modules) {
    completed += data.completed[mod.slug]?.length ?? 0;
  }
  return completed;
}

export function getCompletedLessons(): { moduleSlug: string; lessonSlug: string; timestamp: number }[] {
  const data = getProgressData();
  const result: { moduleSlug: string; lessonSlug: string; timestamp: number }[] = [];
  for (const [moduleSlug, lessons] of Object.entries(data.completed)) {
    for (const lessonSlug of lessons) {
      result.push({
        moduleSlug,
        lessonSlug,
        timestamp: data.timestamps[`${moduleSlug}/${lessonSlug}`] ?? 0,
      });
    }
  }
  return result.sort((a, b) => b.timestamp - a.timestamp);
}

export function getLastVisited(): { moduleSlug: string; lessonSlug: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_VISITED_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setLastVisited(moduleSlug: string, lessonSlug: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_VISITED_KEY, JSON.stringify({ moduleSlug, lessonSlug }));
}

export function getStreak(): StreakData {
  if (typeof window === 'undefined') return { lastStudied: '', currentStreak: 0, longestStreak: 0 };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { lastStudied: '', currentStreak: 0, longestStreak: 0 };
    return JSON.parse(raw);
  } catch {
    return { lastStudied: '', currentStreak: 0, longestStreak: 0 };
  }
}

function updateStreak(): void {
  if (typeof window === 'undefined') return;
  const streak = getStreak();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let newStreak = streak.currentStreak;

  if (streak.lastStudied === today) {
    // Already studied today, no change
    return;
  } else if (streak.lastStudied === yesterday) {
    // Consecutive day
    newStreak += 1;
  } else {
    // Streak broken
    newStreak = 1;
  }

  const updated: StreakData = {
    lastStudied: today,
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, streak.longestStreak),
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(LAST_VISITED_KEY);
  localStorage.removeItem(STREAK_KEY);
}
