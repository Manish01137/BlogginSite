"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealTag = "h1" | "h2" | "h3" | "p" | "span" | "div";

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type RevealTextProps = {
  text: string;
  as?: RevealTag;
  id?: string;
  className?: string;
  /** Words (case-insensitive, punctuation ignored) to render as gold italic accents. */
  highlight?: string[];
  highlightClassName?: string;
  /**
   * "mount": pure-CSS reveal that starts on first paint (use for above-the-fold headlines).
   * "inView": Framer Motion reveal when scrolled into view.
   */
  mode?: "mount" | "inView";
  stagger?: number;
};

const wordVariants: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

const normalise = (word: string) => word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/** Reveals a headline word by word, each word sliding up from a mask. */
export function RevealText({
  text,
  as: Tag = "span",
  id,
  className,
  highlight = [],
  highlightClassName = "italic text-gold-500",
  mode = "inView",
  stagger = 0.07,
}: RevealTextProps) {
  const accents = new Set(highlight.map(normalise));
  const words = text.split(" ");

  const renderWord = (word: string, i: number) => {
    const accent = accents.has(normalise(word));
    const inner =
      mode === "mount" ? (
        <span className={cn("reveal-word", accent && highlightClassName)} style={{ "--i": i } as CSSProperties}>
          {word}
        </span>
      ) : (
        <motion.span className={cn("inline-block", accent && highlightClassName)} variants={wordVariants}>
          {word}
        </motion.span>
      );

    return (
      <span key={`${word}-${i}`} className="-mr-[0.12em] -mb-[0.12em] inline-block overflow-hidden pr-[0.12em] pb-[0.12em] align-bottom">
        {inner}
        {i < words.length - 1 ? " " : null}
      </span>
    );
  };

  if (mode === "mount") {
    return (
      <Tag id={id} className={className}>
        {words.map(renderWord)}
      </Tag>
    );
  }

  const MotionTag = motionTags[Tag];
  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: stagger }}
    >
      {words.map(renderWord)}
    </MotionTag>
  );
}
