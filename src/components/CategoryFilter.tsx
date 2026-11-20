"use client";

import { LayoutGroup, motion } from "framer-motion";
import { useId } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/post";

type CategoryFilterProps = {
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
};

/** "All" + one pill per category. The active pill slides between options. */
export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const groupId = useId();
  const options = [{ id: "all", name: "All", slug: "all" }, ...categories];

  return (
    <LayoutGroup id={groupId}>
      <div
        role="group"
        aria-label="Filter articles by category"
        className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {options.map((option) => {
          const isActive = option.slug === active;
          return (
            <button
              key={option.slug}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.slug)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 active:scale-[0.97]",
                isActive ? "text-white" : "text-ink-soft hover:bg-navy-800/[0.05] hover:text-navy-800",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="category-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-navy-800 shadow-soft"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
              <span className="relative">{option.name}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
