/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-17T09:00:00Z" → "17 Nov 2026" (UTC, so server and client always match). */
export function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Tiny navy gradient used as a blur-up placeholder for remote images. */
export const BLUR_DATA_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a365f"/><stop offset="0.6" stop-color="#0b1f3a"/><stop offset="1" stop-color="#3b3a2a"/></linearGradient></defs><rect width="12" height="8" fill="url(#g)"/></svg>`,
)}`;

/** Resolve a post's country slugs against a list of countries (keeps the post's order). */
export function pickCountries<T extends { slug: string }>(slugs: string[], all: T[]): T[] {
  return slugs.map((slug) => all.find((c) => c.slug === slug)).filter((c): c is T => Boolean(c));
}
