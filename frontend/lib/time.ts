// Client-side time formatting + urgency logic. The backend has its own
// lib/time.ts with computeDepartureDeadline (the actual deadline math,
// done server-side in /api/route) — this file only duplicates the small
// pure display helpers the frontend needs, since the two projects deploy
// separately and don't share code at runtime. Keep these two files in sync
// by hand if the format/urgency rules ever change.

export function minutesUntil(target: Date, from: Date = new Date()): number {
  return Math.round((target.getTime() - from.getTime()) / 60000);
}

/** Urgency bucket used to color the departure banner. */
export type Urgency = "plenty" | "soon" | "leave-now" | "late";

export function urgencyFor(minutesLeft: number): Urgency {
  if (minutesLeft <= 0) return "late";
  if (minutesLeft <= 5) return "leave-now";
  if (minutesLeft <= 20) return "soon";
  return "plenty";
}

export function formatClock(d: Date): string {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatCountdown(minutes: number): string {
  const sign = minutes < 0 ? "-" : "";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h > 0) return `${sign}${h}h ${m}m`;
  return `${sign}${m}m`;
}
