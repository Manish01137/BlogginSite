import Image from "next/image";
import Link from "next/link";
import { AuthorBadge, CountryFlags, DateReadingTime } from "@/components/PostMeta";
import { ReadArticleCue } from "@/components/ReadArticleLink";
import { postHref } from "@/lib/site-config";
import { BLUR_DATA_URL, cn } from "@/lib/utils";
import type { Country, Post } from "@/types/post";

type PostCardProps = {
  post: Post;
  countries: Country[];
  /** Larger editorial card (first item in the grid). */
  large?: boolean;
  /** Preload the cover (use for cards visible on first paint). */
  preload?: boolean;
};

export function PostCard({ post, countries, large = false, preload = false }: PostCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft",
        "transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift",
        "has-[a:focus-visible]:-translate-y-1.5 has-[a:focus-visible]:shadow-lift",
      )}
    >
      {post.coverImage ? (
        <div
          className={cn(
            "relative overflow-hidden bg-navy-800",
            large ? "aspect-[16/10] lg:aspect-auto lg:min-h-[20rem] lg:flex-1" : "aspect-[16/10]",
          )}
        >
          <Image
            src={post.coverImage}
            alt=""
            fill
            preload={preload}
            sizes={
              large
                ? "(min-width: 1280px) 820px, (min-width: 768px) 66vw, 100vw"
                : "(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
            }
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      ) : null}

      <div className={cn("flex flex-1 flex-col p-6", large && "lg:flex-none lg:p-8")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="eyebrow text-gold-700">{post.category.name}</span>
          <CountryFlags countries={countries} compact />
        </div>

        <h3
          className={cn(
            "mt-4 font-serif leading-snug font-normal tracking-[-0.01em] text-navy-800",
            large ? "text-2xl sm:text-[1.9rem] sm:leading-tight" : "text-[1.35rem]",
          )}
        >
          <Link
            href={postHref(post.slug)}
            className={cn(
              "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5",
              "transition-[background-size] duration-500 ease-premium group-hover:bg-[length:100%_1px]",
              "after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none",
              "focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-navy-800",
            )}
          >
            {post.title}
          </Link>
        </h3>

        <p className={cn("mt-3 line-clamp-2 text-[0.95rem] leading-relaxed text-muted", large && "lg:text-base")}>
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div className="flex flex-col gap-2.5">
            <AuthorBadge author={post.author} size={32} />
            <DateReadingTime publishedAt={post.publishedAt} readingTime={post.readingTime} />
          </div>
          <ReadArticleCue label="Read" className="hidden sm:inline-flex" />
        </div>
      </div>
    </article>
  );
}

/** Shimmering placeholder card shown while more posts load. */
export function PostCardSkeleton() {
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
      <div className="aspect-[16/10] bg-paper-deep" />
      <div className="space-y-4 p-6">
        <div className="h-3 w-24 rounded-full bg-paper-deep" />
        <div className="h-5 w-11/12 rounded-full bg-paper-deep" />
        <div className="h-5 w-2/3 rounded-full bg-paper-deep" />
        <div className="h-3 w-full rounded-full bg-paper-deep" />
        <div className="flex items-center gap-3 pt-4">
          <div className="size-8 rounded-full bg-paper-deep" />
          <div className="h-3 w-28 rounded-full bg-paper-deep" />
        </div>
      </div>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent motion-safe:animate-shimmer" />
    </div>
  );
}
