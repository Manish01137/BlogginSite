"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SocialIcon } from "@/components/SocialIcon";
import { EASE } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";
import { buttonClasses, externalLinkProps } from "@/lib/ui";

type MobileMenuProps = { open: boolean; onClose: () => void };

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 200);
    // Close if the viewport grows to desktop width.
    const mq = window.matchMedia("(min-width: 64rem)");
    const onResize = () => mq.matches && onClose();
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="surface-dark grain fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-navy-900 pt-[var(--header-h)] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: EASE } }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full bg-gold-500/10 blur-3xl"
          />
          <motion.nav
            aria-label="Mobile"
            className="container-page relative z-10 flex flex-1 flex-col justify-between gap-10 py-10"
            variants={list}
            initial="hidden"
            animate="show"
          >
            <ul className="flex flex-col">
              {siteConfig.nav.map((link, i) => {
                const className =
                  "group flex items-baseline justify-between border-b border-white/10 py-4 font-serif text-[2.1rem] leading-tight text-white transition-colors duration-300 hover:text-gold-300";
                const content = (
                  <>
                    <span>{link.label}</span>
                    <span className="eyebrow text-white/40 transition-colors group-hover:text-gold-500">
                      0{i + 1}
                    </span>
                  </>
                );
                return (
                  <motion.li key={link.href} variants={item}>
                    {link.href.includes("#") ? (
                      <a ref={i === 0 ? firstLinkRef : undefined} href={link.href} onClick={onClose} className={className}>
                        {content}
                      </a>
                    ) : (
                      <Link ref={i === 0 ? firstLinkRef : undefined} href={link.href} onClick={onClose} className={className}>
                        {content}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <motion.div variants={item} className="flex flex-col gap-6">
              <a href={siteConfig.consultationUrl} {...externalLinkProps} className={buttonClasses("gold", "lg", "w-full")}>
                Book Free Consultation
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <div className="flex flex-col gap-3 text-sm text-navy-300">
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-white">
                  <Mail aria-hidden="true" className="size-4 text-gold-500" /> {siteConfig.email}
                </a>
                <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
                  <Phone aria-hidden="true" className="size-4 text-gold-500" /> {siteConfig.phone}
                </a>
              </div>
              <ul className="flex gap-2" aria-label="Social media">
                {siteConfig.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...externalLinkProps}
                      aria-label={`${siteConfig.companyName} on ${s.label}`}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold-500 hover:text-gold-300"
                    >
                      <SocialIcon name={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
