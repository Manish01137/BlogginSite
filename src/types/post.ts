/**
 * Content model shared by the blog front-end and (later) the admin panel.
 * Keep `Post` in sync with the database schema — field names must match exactly.
 */

export type PostStatus = "draft" | "published";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Author = {
  name: string;
  role: string;
  avatar?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  /** Max ~200 characters */
  excerpt: string;
  coverImage?: string;
  /** Markdown */
  content: string;
  category: Category;
  /** Country slugs, e.g. ["canada"] */
  countries: string[];
  tags: string[];
  author: Author;
  /** ISO date */
  publishedAt: string;
  status: PostStatus;
  featured: boolean;
  /** Minutes */
  readingTime: number;
  seoTitle?: string;
  seoDescription?: string;
};

export type Country = {
  id: string;
  name: string;
  slug: string;
  flag: string;
  description: string;
};

/** A country plus the number of published posts tagged with it. */
export type CountryWithCount = Country & { postCount: number };
