import { ConsultationCTA } from "@/components/ConsultationCTA";
import { CountriesSection } from "@/components/CountriesSection";
import { CountryMarquee } from "@/components/CountryMarquee";
import { FeaturedPost } from "@/components/FeaturedPost";
import { Hero, type HeroStat } from "@/components/Hero";
import { LatestArticles } from "@/components/LatestArticles";
import { NewsletterSection } from "@/components/NewsletterSection";
import { getAllPosts, getCategories, getCountries, getFeaturedPost } from "@/lib/posts";
import { postHref, siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const [posts, featured, categories, countries] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
    getCategories(),
    getCountries(),
  ]);

  const stats: HeroStat[] = [
    { value: countries.length, label: "Countries covered" },
    { value: 10, suffix: "+", label: "Visa types explained" },
    { value: posts.length, label: "In-depth guides" },
    { text: "Weekly", label: "Policy updates" },
  ];

  const organizationId = `${siteConfig.mainSiteUrl}/#organization`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.companyName,
        url: siteConfig.mainSiteUrl,
        logo: new URL(siteConfig.logo, siteConfig.blogUrl).toString(),
        email: siteConfig.email,
        sameAs: siteConfig.social.map((s) => s.href),
      },
      {
        "@type": "Blog",
        "@id": `${siteConfig.blogUrl}/#blog`,
        name: siteConfig.blogName,
        url: siteConfig.blogUrl,
        description: siteConfig.description,
        inLanguage: "en-IN",
        publisher: { "@id": organizationId },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          url: `${siteConfig.blogUrl}${postHref(post.slug)}`,
          datePublished: post.publishedAt,
          image: post.coverImage,
          author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
          articleSection: post.category.name,
          keywords: post.tags.join(", "),
        })),
      },
    ],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero stats={stats} />
      <CountryMarquee countries={countries} />
      {featured ? <FeaturedPost post={featured} countries={countries} /> : null}
      <LatestArticles posts={posts} featuredId={featured?.id} categories={categories} countries={countries} />
      <CountriesSection countries={countries} />
      <ConsultationCTA />
      <NewsletterSection />
    </main>
  );
}
