"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Compass, Loader2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useArticleFilter } from "@/components/ArticleFilterContext";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PostCard, PostCardSkeleton } from "@/components/PostCard";
import { EASE } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";
import { buttonClasses, externalLinkProps } from "@/lib/ui";
import { cn, pickCountries } from "@/lib/utils";
import type { Category, CountryWithCount, Post } from "@/types/post";

const PAGE_SIZE = 6;

type PostGridProps = {
  posts: Post[];
  /** Shown separately above; hidden from the unfiltered grid to avoid repeating it. */
  featuredId?: string;
  categories: Category[];
  countries: CountryWithCount[];
};

export function PostGrid({ posts, featuredId, categories, countries }: PostGridProps) {
  const { category, country, setCategory, setCountry, reset } = useArticleFilter();
  const filterKey = `${category}|${country ?? ""}`;

  // Paging resets automatically whenever the filter changes.
  const [paging, setPaging] = useState({ key: filterKey, count: PAGE_SIZE });
  const visibleCount = paging.key === filterKey ? paging.count : PAGE_SIZE;
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const filtered = useMemo(() => {
    const unfiltered = category === "all" && !country;
    return posts.filter((post) =>
      unfiltered
        ? post.id !== featuredId
        : (category === "all" || post.category.slug === category) && (!country || post.countries.includes(country)),
    );
  }, [posts, featuredId, category, country]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;
  const activeCountry = countries.find((c) => c.slug === country);
  const activeCategory = categories.find((c) => c.slug === category);

  const loadMore = () => {
    setLoading(true);
    // TODO: replace with a paginated API / database query (e.g. GET /api/posts?skip=6&limit=6).
    timer.current = window.setTimeout(() => {
      setPaging({ key: filterKey, count: visibleCount + PAGE_SIZE });
      setLoading(false);
    }, 700);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <CategoryFilter categories={categories} active={category} onChange={setCategory} />

        <AnimatePresence initial={false}>
          {activeCountry && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex shrink-0 items-center gap-2 self-start lg:self-auto"
            >
              <span className="text-sm text-muted">Country:</span>
              <button
                type="button"
                onClick={() => setCountry(null)}
                aria-label={`Remove ${activeCountry.name} filter`}
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/60 bg-gold-50 py-1.5 pr-2 pl-3 text-sm font-medium text-navy-800 transition-colors hover:border-gold-500 hover:bg-gold-100 active:scale-[0.97]"
              >
                <span aria-hidden="true">{activeCountry.flag}</span>
                {activeCountry.name}
                <span className="grid size-5 place-items-center rounded-full bg-navy-800/10">
                  <X aria-hidden="true" className="size-3" />
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="sr-only" aria-live="polite">
        {loading
          ? "Loading more articles…"
          : `Showing ${visible.length} of ${filtered.length} articles${activeCategory ? ` in ${activeCategory.name}` : ""}${
              activeCountry ? ` for ${activeCountry.name}` : ""
            }.`}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          countryName={activeCountry?.name}
          categoryName={activeCategory?.name}
          onReset={reset}
        />
      ) : (
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((post, index) => {
              const large = index === 0;
              return (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.3, ease: EASE } }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: (index % PAGE_SIZE) * 0.08,
                    layout: { duration: 0.6, ease: EASE },
                  }}
                  className={cn(large && "md:col-span-2 lg:row-span-2")}
                >
                  <PostCard post={post} countries={pickCountries(post.countries, countries)} large={large} />
                </motion.div>
              );
            })}
            {loading &&
              Array.from({ length: Math.min(remaining, PAGE_SIZE) }, (_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <PostCardSkeleton />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      )}

      {filtered.length > 0 && (
        <div className="mt-14 flex flex-col items-center gap-3">
          {remaining > 0 ? (
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              aria-busy={loading}
              className={buttonClasses("outline-dark", "lg", "min-w-52 bg-white")}
            >
              {loading ? (
                <>
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" /> Loading…
                </>
              ) : (
                <>Load more articles</>
              )}
            </button>
          ) : null}
          <p className="text-sm text-muted">
            {remaining > 0
              ? `Showing ${visible.length} of ${filtered.length} articles`
              : `You're all caught up — ${filtered.length} ${filtered.length === 1 ? "article" : "articles"}`}
          </p>
        </div>
      )}
    </div>
  );
}

function EmptyState({
  countryName,
  categoryName,
  onReset,
}: {
  countryName?: string;
  categoryName?: string;
  onReset: () => void;
}) {
  const scope = [categoryName, countryName && `for ${countryName}`].filter(Boolean).join(" ");
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-navy-800/15 bg-white/60 px-6 py-16 text-center sm:py-20"
    >
      <span className="relative grid size-16 place-items-center rounded-full bg-navy-800 text-gold-500 shadow-soft">
        <span aria-hidden="true" className="absolute -inset-2 rounded-full border border-gold-500/30" />
        <Compass aria-hidden="true" className="size-7" strokeWidth={1.5} />
      </span>
      <h3 className="mt-7 font-serif text-2xl text-navy-800 sm:text-3xl">No articles here yet</h3>
      <p className="mt-3 max-w-md text-muted">
        We haven&rsquo;t published {scope ? <strong className="font-medium text-ink-soft">{scope}</strong> : "this"} guidance
        yet. Try another filter, or ask our advisors about your situation directly.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={onReset} className={buttonClasses("navy", "md")}>
          Clear filters
        </button>
        <a href={siteConfig.consultationUrl} {...externalLinkProps} className={buttonClasses("outline-dark", "md")}>
          Ask an advisor <ArrowUpRight aria-hidden="true" className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </motion.div>
  );
}
