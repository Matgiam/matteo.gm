/**
 * Calendar days as 'YYYY-MM-DD' strings in local time. A booking is for an
 * evening, not an instant, so no timezone conversion ever touches these.
 * ISO strings also compare correctly as plain strings ('2026-09-12' < '2026-10-01').
 */

const pad = (n) => String(n).padStart(2, '0');

export const toIso = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Midday, so a daylight-saving change can never move the date.
export function fromIso(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, 12);
}

export const todayIso = () => toIso(new Date());

export function addDays(iso, n) {
  const date = fromIso(iso);
  date.setDate(date.getDate() + n);
  return toIso(date);
}

/** First day of the month `n` months after the one containing `iso`. */
export function addMonths(iso, n) {
  const date = fromIso(iso);
  return toIso(new Date(date.getFullYear(), date.getMonth() + n, 1, 12));
}

export const monthStart = (iso) => `${iso.slice(0, 7)}-01`;

export const monthEnd = (iso) => addDays(addMonths(iso, 1), -1);

/** The month as rows of 7 days, Monday first; cells outside the month are null. */
export function monthWeeks(iso) {
  const first = monthStart(iso);
  const offset = (fromIso(first).getDay() + 6) % 7;
  const cells = Array(offset).fill(null);
  for (let day = first; day.slice(0, 7) === first.slice(0, 7); day = addDays(day, 1))
    cells.push(day);
  while (cells.length % 7) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
