import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { ParallaxImage } from "@/components/ParallaxImage";
import { AuthorBadge, CountryFlags, DateReadingTime } from "@/components/PostMeta";
import { ReadArticleCue } from "@/components/ReadArticleLink";
import { postHref } from "@/lib/site-config";
import { pickCountries } from "@/lib/utils";
import type { CountryWithCount, Post } from "@/types/post";

type FeaturedPostProps = { post: Post; countries: CountryWithCount[] };

export function FeaturedPost({ post, countries }: FeaturedPostProps) {
  const postCountries = pickCountries(post.countries, countries);

  return (
    <section aria-labelledby="featured-heading" className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <FadeIn className="mb-8 flex items-center gap-4">
          <h2 id="featured-heading" className="eyebrow font-sans text-gold-700">
            Editor&rsquo;s pick
          </h2>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </FadeIn>

        <FadeIn y={32}>
          <article className="group relative grid overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-shadow duration-700 ease-premium hover:shadow-lift lg:grid-cols-12">
            {post.coverImage ? (
              <ParallaxImage
                src={post.coverImage}
                alt=""
                preload
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                className="aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]"
              />
            ) : null}

            <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5 lg:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow rounded-full bg-gold-500 px-3 py-1.5 text-navy-800">Featured</span>
                  <span className="eyebrow text-gold-700">{post.category.name}</span>
                </div>

                <h3 className="mt-6 font-serif text-[2rem] leading-[1.1] font-normal tracking-[-0.015em] text-navy-800 sm:text-[2.6rem] lg:text-[2.75rem]">
                  <Link
                    href={postHref(post.slug)}
                    className="rounded-sm after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[1.75rem] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-navy-800"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">{post.excerpt}</p>

                <CountryFlags countries={postCountries} className="mt-6" />
              </div>

              <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-3">
                  <AuthorBadge author={post.author} size={40} />
                  <DateReadingTime publishedAt={post.publishedAt} readingTime={post.readingTime} />
                </div>
                <ReadArticleCue />
              </div>
            </div>
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
