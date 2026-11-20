import { Clock } from "lucide-react";
import Image from "next/image";
import type { Author, Country } from "@/types/post";
import { cn, formatDate } from "@/lib/utils";

/** "17 Nov 2026 · 4 min read" */
export function DateReadingTime({
  publishedAt,
  readingTime,
  className,
}: {
  publishedAt: string;
  readingTime: number;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-2 text-[0.8rem] text-muted", className)}>
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock aria-hidden="true" className="size-3.5" />
        {readingTime} min read
      </span>
    </p>
  );
}

export function CountryFlags({
  countries,
  compact = false,
  className,
}: {
  countries: Country[];
  /** Flags only (names stay available to screen readers and as tooltips). */
  compact?: boolean;
  className?: string;
}) {
  if (countries.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap items-center gap-1.5", className)} aria-label="Countries">
      {countries.map((c) => (
        <li
          key={c.slug}
          title={c.name}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-line bg-paper text-[0.72rem] font-medium text-ink-soft",
            compact ? "size-7 justify-center" : "px-2 py-0.5",
          )}
        >
          <span aria-hidden="true" className={compact ? "text-sm" : undefined}>
            {c.flag}
          </span>
          <span className={compact ? "sr-only" : undefined}>{c.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function AuthorBadge({ author, size = 36, dark = false }: { author: Author; size?: number; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {author.avatar ? (
        <Image
          src={author.avatar}
          alt=""
          width={size}
          height={size}
          sizes={`${size}px`}
          className="rounded-full ring-2 ring-white"
          style={{ width: size, height: size }}
        />
      ) : null}
      <div className="leading-tight">
        <p className={cn("text-sm font-medium", dark ? "text-white" : "text-ink")}>{author.name}</p>
        <p className={cn("text-xs", dark ? "text-navy-300" : "text-muted")}>{author.role}</p>
      </div>
    </div>
  );
}
