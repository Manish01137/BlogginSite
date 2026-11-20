/** Shared animation tokens — keep every animation on the same premium curve. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
} as const;

export const STAGGER = 0.08;

export const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;
