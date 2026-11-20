"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Vertical offset in px (ignored automatically for reduced-motion users). */
  y?: number;
  duration?: number;
};

/** Fades + slides content up once when it scrolls into view. */
export function FadeIn({ delay = 0, y = 24, duration = DURATION.slow, children, ...rest }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
