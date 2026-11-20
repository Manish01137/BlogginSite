"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { scrollToTarget, setLenis } from "@/lib/scroll";

/**
 * Enables Lenis smooth scrolling — only when the user has NOT asked for reduced motion.
 * Also smooth-scrolls same-page anchor links (e.g. "/#articles") with a header offset.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true });
      setLenis(lenis);
    };
    const stop = () => {
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", url.hash);
    };

    if (!mq.matches) start();
    const onChange = () => (mq.matches ? stop() : start());
    mq.addEventListener("change", onChange);
    document.addEventListener("click", onAnchorClick);

    return () => {
      mq.removeEventListener("change", onChange);
      document.removeEventListener("click", onAnchorClick);
      stop();
    };
  }, []);

  return null;
}
