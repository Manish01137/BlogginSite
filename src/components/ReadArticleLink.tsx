import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Animated "Read article →" affordance. Reacts to hover on the nearest `group` (the card). */
export function ReadArticleCue({ className, label = "Read article" }: { className?: string; label?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center gap-2 text-sm font-medium text-navy-800", className)}>
      <span className="relative">
        {label}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-500 transition-transform duration-500 ease-premium group-hover:scale-x-100" />
      </span>
      <span className="grid size-7 place-items-center rounded-full border border-navy-800/15 transition-[transform,background-color,border-color,color] duration-500 ease-premium group-hover:translate-x-1 group-hover:border-navy-800 group-hover:bg-navy-800 group-hover:text-gold-500">
        <ArrowRight className="size-3.5" />
      </span>
    </span>
  );
}
