"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { useArticleFilter } from "@/components/ArticleFilterContext";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { scrollToTarget } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import type { CountryWithCount } from "@/types/post";

export function CountryExplorer({ countries }: { countries: CountryWithCount[] }) {
  const { country: activeCountry, setCountry, setCategory } = useArticleFilter();

  const select = (slug: string) => {
    setCategory("all");
    setCountry(slug);
    scrollToTarget("#articles");
  };

  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
      {countries.map((country) => (
        <StaggerItem key={country.slug} className="[perspective:1000px]">
          <CountryCard country={country} active={activeCountry === country.slug} onSelect={() => select(country.slug)} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

type CountryCardProps = { country: CountryWithCount; active: boolean; onSelect: () => void };

function CountryCard({ country, active, onSelect }: CountryCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 220, damping: 22, mass: 0.5 };

  // Pointer position within the card, -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), spring);
  // Glow position in px, driven via transforms only
  const glowX = useSpring(useMotionValue(0), spring);
  const glowY = useSpring(useMotionValue(0), spring);

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const label = country.postCount === 1 ? "1 article" : `${country.postCount} articles`;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onSelect}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-pressed={active}
      aria-label={`Show ${label} about ${country.name}`}
      style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-7 text-left shadow-soft",
        "transition-[border-color,box-shadow] duration-500 ease-premium hover:border-gold-500 hover:shadow-lift active:scale-[0.99]",
        active ? "border-gold-500 shadow-lift" : "border-line",
      )}
    >
      {/* Cursor-following glow (transform-only) */}
      <motion.span
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute top-0 left-0 -mt-32 -ml-32 size-64 rounded-full bg-gold-300/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span aria-hidden="true" className="relative flex items-start justify-between">
        <span className="text-5xl leading-none transition-transform duration-500 ease-premium group-hover:-translate-y-1 group-hover:scale-110">
          {country.flag}
        </span>
        <span
          className={cn(
            "eyebrow rounded-full border px-2.5 py-1 transition-colors duration-500",
            active ? "border-gold-500 bg-gold-500 text-navy-800" : "border-line text-muted group-hover:border-gold-500/60",
          )}
        >
          {active ? "Selected" : label}
        </span>
      </span>
      <span className="relative mt-8 font-serif text-2xl text-navy-800 sm:text-[1.7rem]">{country.name}</span>
      <span className="relative mt-2 text-[0.95rem] leading-relaxed text-muted">{country.description}</span>
      <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy-800">
        Explore guides
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-500 ease-premium group-hover:translate-x-1"
        />
      </span>
    </motion.button>
  );
}
