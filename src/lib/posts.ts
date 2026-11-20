/**
 * Data-access layer. Components must use ONLY these helpers — never import mock data.
 * Each helper is async so the implementation can be swapped for MongoDB queries
 * (e.g. `Post.find({ status: "published" }).sort({ publishedAt: -1 })`) without
 * changing any component.
 */
import "server-only";

import { categories, countries, posts } from "@/lib/mock-data";
import type { Category, CountryWithCount, Post } from "@/types/post";

const byNewest = (a: Post, b: Post) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

/** All published posts, newest first. Drafts are never returned. */
export async function getAllPosts(): Promise<Post[]> {
  return posts.filter((post) => post.status === "published").sort(byNewest);
}

/** The single featured post (falls back to the newest published post). */
export async function getFeaturedPost(): Promise<Post | null> {
  const published = await getAllPosts();
  return published.find((post) => post.featured) ?? published[0] ?? null;
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const published = await getAllPosts();
  return published.filter((post) => post.category.slug === categorySlug);
}

export async function getPostsByCountry(countrySlug: string): Promise<Post[]> {
  const published = await getAllPosts();
  return published.filter((post) => post.countries.includes(countrySlug));
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

/** Countries with the number of published posts for each. */
export async function getCountries(): Promise<CountryWithCount[]> {
  const published = await getAllPosts();
  return countries.map((country) => ({
    ...country,
    postCount: published.filter((post) => post.countries.includes(country.slug)).length,
  }));
}
