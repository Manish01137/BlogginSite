"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { EASE } from "@/lib/motion";
import { getLenis } from "@/lib/scroll";
import { siteConfig } from "@/lib/site-config";
import { buttonClasses, externalLinkProps } from "@/lib/ui";
import { cn } from "@/lib/utils";

const isHashLink = (href: string) => href.includes("#");

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide when scrolling down past the hero top, reveal on any upward scroll.
    if (y > previous && y > 160) setHidden(true);
    else if (y < previous - 4) setHidden(false);
  });

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Lock page scroll + make the page inert while the mobile menu is open.
  useEffect(() => {
    const page = document.getElementById("page");
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      getLenis()?.stop();
      page?.setAttribute("inert", "");
    } else {
      document.documentElement.style.overflow = "";
      getLenis()?.start();
      page?.removeAttribute("inert");
    }
  }, [menuOpen]);

  const solid = scrolled && !menuOpen;

  return (
    <>
      <motion.header
        className="surface-dark fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Frosted glass layer fades in on scroll (opacity only) */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 border-b border-white/10 bg-navy-800/80 shadow-[0_8px_32px_-12px_rgb(5_14_26/0.5)] backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-500 ease-premium",
            solid ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="container-page relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo onClick={() => menuOpen && setMenuOpen(false)} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => {
                const className =
                  "relative rounded-full px-4 py-2 text-[0.92rem] text-white/75 transition-colors duration-300 hover:text-white " +
                  "after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-500 after:ease-premium hover:after:scale-x-100";
                return (
                  <li key={item.href}>
                    {isHashLink(item.href) ? (
                      <a href={item.href} className={className}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={className} aria-current={item.href === "/" ? "page" : undefined}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.consultationUrl}
              {...externalLinkProps}
              className={buttonClasses("gold", "sm", "max-sm:hidden")}
            >
              Book Free Consultation
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-premium group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="relative grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10 active:scale-95 lg:hidden"
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <motion.span
                  className="absolute left-0 top-0 block h-[1.5px] w-5 rounded-full bg-current"
                  animate={menuOpen ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block h-[1.5px] w-5 rounded-full bg-current"
                  animate={menuOpen ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
