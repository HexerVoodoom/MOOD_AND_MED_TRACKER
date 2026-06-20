// Derives medication adherence statistics from the recorded mood history.
//
// `moodHistory` is the source of truth: each entry holds a `date` (YYYY-MM-DD,
// generated via `Date#toISOString`) and a `medicationTaken` array with the base
// IDs of the medications taken that day. Computing the stats from this history
// keeps `daysTaken`, `adherence` and `last7Days` always consistent with what the
// user actually logged, instead of relying on imperative counters that could
// drift (e.g. double counting multiple doses on the same day).

export interface MoodHistoryEntryLike {
  date: string;
  medicationTaken?: string[];
}

export interface MedicationLike {
  id: string;
  /** ISO date (YYYY-MM-DD) the medication started being tracked, when available. */
  startDateISO?: string;
}

export interface MedicationStats {
  /** Number of distinct days at least one dose was taken. */
  daysTaken: number;
  /** Adherence percentage (0-100): days taken over days elapsed since start. */
  adherence: number;
  /** Taken state for the last 7 calendar days, oldest first (index 6 = today). */
  last7Days: boolean[];
}

/** Formats a Date as a UTC `YYYY-MM-DD` key, matching how history dates are stored. */
export function dateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + amount);
  return next;
}

function daysBetween(startKey: string, endKey: string): number {
  const start = new Date(`${startKey}T00:00:00Z`).getTime();
  const end = new Date(`${endKey}T00:00:00Z`).getTime();
  return Math.round((end - start) / (24 * 60 * 60 * 1000));
}

export function computeMedicationStats(
  medication: MedicationLike,
  history: MoodHistoryEntryLike[],
  now: Date = new Date()
): MedicationStats {
  const todayKey = dateKey(now);

  // Distinct days this medication was taken.
  const takenDates = new Set<string>();
  for (const entry of history) {
    if (entry?.medicationTaken?.includes(medication.id)) {
      takenDates.add(entry.date);
    }
  }
  const daysTaken = takenDates.size;

  // Last 7 calendar days, oldest first so index 6 maps to today.
  const last7Days: boolean[] = [];
  for (let i = 6; i >= 0; i--) {
    last7Days.push(takenDates.has(dateKey(addDays(now, -i))));
  }

  // Adherence: days taken over days elapsed since the medication started.
  // Fall back to the earliest logged day, then to today, when no start date.
  const earliestTaken = takenDates.size > 0 ? [...takenDates].sort()[0] : undefined;
  const startKey = medication.startDateISO || earliestTaken || todayKey;
  const daysElapsed = Math.max(1, daysBetween(startKey, todayKey) + 1);
  const adherence = Math.min(100, Math.round((daysTaken / daysElapsed) * 100));

  return { daysTaken, adherence, last7Days };
}
