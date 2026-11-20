"use client";

import type Lenis from "lenis";

/*
 * Header clearance comes from `scroll-padding-top` on <html> (globals.css).
 * Both native scrollIntoView and Lenis honour it, so no extra offset is needed here.
 */

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly scrolls to an element, selector (e.g. "#articles") or Y position. */
export function scrollToTarget(target: string | number | HTMLElement) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: 1.2,
      force: true, // still scroll if Lenis was paused (e.g. while the mobile menu closes)
    });
    return;
  }
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  el?.scrollIntoView({ behavior, block: "start" });
}
