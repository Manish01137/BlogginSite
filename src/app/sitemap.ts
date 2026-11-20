import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// TODO: add article, category and country URLs once those pages exist.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.blogUrl, changeFrequency: "weekly", priority: 1 }];
}
