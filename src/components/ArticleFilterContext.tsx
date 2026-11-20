"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ArticleFilterState = {
  category: string; // "all" or a category slug
  country: string | null; // country slug or null
  setCategory: (slug: string) => void;
  setCountry: (slug: string | null) => void;
  reset: () => void;
};

const ArticleFilterContext = createContext<ArticleFilterState | null>(null);

/** Shares the article filter between the post grid and the country explorer. */
export function ArticleFilterProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState("all");
  const [country, setCountry] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      category,
      country,
      setCategory,
      setCountry,
      reset: () => {
        setCategory("all");
        setCountry(null);
      },
    }),
    [category, country],
  );

  return <ArticleFilterContext.Provider value={value}>{children}</ArticleFilterContext.Provider>;
}

export function useArticleFilter() {
  const ctx = useContext(ArticleFilterContext);
  if (!ctx) throw new Error("useArticleFilter must be used inside <ArticleFilterProvider>");
  return ctx;
}
