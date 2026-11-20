"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { DURATION, EASE, STAGGER, VIEWPORT } from "@/lib/motion";

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
};

type StaggerProps = HTMLMotionProps<"div"> & { stagger?: number; delay?: number };

/** Parent that reveals its <StaggerItem> children one after another when in view. */
export function Stagger({ stagger = STAGGER, delay = 0, children, ...rest }: StaggerProps) {
  return (
    <motion.div
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={item} {...rest}>
      {children}
    </motion.div>
  );
}
