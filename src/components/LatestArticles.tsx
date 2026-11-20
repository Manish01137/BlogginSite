import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import { PostGrid } from "@/components/PostGrid";
import type { Category, CountryWithCount, Post } from "@/types/post";

type LatestArticlesProps = {
  posts: Post[];
  featuredId?: string;
  categories: Category[];
  countries: CountryWithCount[];
};

export function LatestArticles({ posts, featuredId, categories, countries }: LatestArticlesProps) {
  return (
    <section id="articles" aria-labelledby="articles-heading" className="bg-paper pb-24 sm:pb-28 lg:pb-32">
      <div className="container-page">
        <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="eyebrow text-gold-700">The journal</p>
            </FadeIn>
            <RevealText
              as="h2"
              id="articles-heading"
              text="Latest articles"
              className="mt-4 font-serif text-4xl font-normal tracking-[-0.02em] text-navy-800 sm:text-5xl lg:text-6xl"
            />
          </div>
          <FadeIn delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-muted lg:ml-auto">
              Practical guidance on visas, study permits and scholarships — reviewed by our advisors and updated as
              rules change.
            </p>
          </FadeIn>
        </div>

        <PostGrid posts={posts} featuredId={featuredId} categories={categories} countries={countries} />
      </div>
    </section>
  );
}
