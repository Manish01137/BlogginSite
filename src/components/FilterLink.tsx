"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { useArticleFilter } from "@/components/ArticleFilterContext";
import { scrollToTarget } from "@/lib/scroll";

type FilterLinkProps = {
  category?: string;
  country?: string | null;
  className?: string;
  children: ReactNode;
};

/**
 * Applies an article filter and scrolls to the article grid.
 * From other pages it navigates to "/#articles" (filter state lives in the root layout).
 */
export function FilterLink({ category = "all", country = null, className, children }: FilterLinkProps) {
  const pathname = usePathname();
  const { setCategory, setCountry } = useArticleFilter();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setCategory(category);
    setCountry(country);
    if (pathname === "/") {
      event.preventDefault();
      scrollToTarget("#articles");
    }
  };

  return (
    <Link href="/#articles" onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
