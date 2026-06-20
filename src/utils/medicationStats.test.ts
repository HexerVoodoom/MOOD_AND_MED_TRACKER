import { describe, it, expect } from 'vitest';
import { computeMedicationStats, dateKey, type MoodHistoryEntryLike } from './medicationStats';

const now = new Date('2026-06-19T12:00:00Z');
const key = (offset: number) => {
  const d = new Date(now);
  d.setUTCDate(d.getUTCDate() + offset);
  return dateKey(d);
};

describe('computeMedicationStats', () => {
  it('returns zeros when there is no history', () => {
    const stats = computeMedicationStats({ id: 'a' }, [], now);
    expect(stats.daysTaken).toBe(0);
    expect(stats.adherence).toBe(0);
    expect(stats.last7Days).toEqual([false, false, false, false, false, false, false]);
  });

  it('counts distinct days taken and ignores other medications', () => {
    const history: MoodHistoryEntryLike[] = [
      { date: key(-2), medicationTaken: ['a', 'b'] },
      { date: key(-1), medicationTaken: ['b'] },
      { date: key(0), medicationTaken: ['a'] },
    ];
    const stats = computeMedicationStats({ id: 'a' }, history, now);
    expect(stats.daysTaken).toBe(2);
  });

  it('places taken days correctly in the last-7-days window (index 6 = today)', () => {
    const history: MoodHistoryEntryLike[] = [
      { date: key(0), medicationTaken: ['a'] },
      { date: key(-6), medicationTaken: ['a'] },
    ];
    const stats = computeMedicationStats({ id: 'a' }, history, now);
    expect(stats.last7Days).toEqual([true, false, false, false, false, false, true]);
  });

  it('excludes days older than 7 from the window but still counts them', () => {
    const history: MoodHistoryEntryLike[] = [
      { date: key(-10), medicationTaken: ['a'] },
      { date: key(0), medicationTaken: ['a'] },
    ];
    const stats = computeMedicationStats({ id: 'a', startDateISO: key(-10) }, history, now);
    expect(stats.last7Days[6]).toBe(true);
    expect(stats.last7Days.slice(0, 6).every((d) => d === false)).toBe(true);
    expect(stats.daysTaken).toBe(2);
  });

  it('computes adherence as days taken over days elapsed since start', () => {
    const history: MoodHistoryEntryLike[] = [
      { date: key(-3), medicationTaken: ['a'] },
      { date: key(-1), medicationTaken: ['a'] },
    ];
    // start 3 days ago -> 4 days elapsed (inclusive), 2 taken -> 50%
    const stats = computeMedicationStats({ id: 'a', startDateISO: key(-3) }, history, now);
    expect(stats.adherence).toBe(50);
  });

  it('caps adherence at 100', () => {
    const history: MoodHistoryEntryLike[] = [{ date: key(0), medicationTaken: ['a'] }];
    const stats = computeMedicationStats({ id: 'a', startDateISO: key(0) }, history, now);
    expect(stats.adherence).toBe(100);
  });
});
