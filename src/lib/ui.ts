import { cn } from "@/lib/utils";

type Variant = "gold" | "navy" | "outline-light" | "outline-dark";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
  "transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-premium " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "bg-gold-500 text-navy-800 shadow-gold hover:bg-gold-300 hover:shadow-[0_12px_32px_-8px_rgb(201_162_39/0.7)]",
  navy: "bg-navy-800 text-white shadow-soft hover:bg-navy-600",
  "outline-light": "border border-white/25 text-white hover:border-white/60 hover:bg-white/10",
  "outline-dark": "border border-navy-800/15 text-navy-800 hover:border-navy-800/40 hover:bg-navy-800/[0.04]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function buttonClasses(variant: Variant = "gold", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Props for links that open the main Monarch site in a new tab. */
export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;
