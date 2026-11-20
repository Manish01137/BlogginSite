import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { CountUp } from "@/components/CountUp";
import { GlobeLines } from "@/components/GlobeLines";
import { RevealText } from "@/components/motion/RevealText";
import { siteConfig } from "@/lib/site-config";
import { buttonClasses, externalLinkProps } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type HeroStat = { label: string; value?: number; suffix?: string; text?: string };

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero({ stats }: { stats: HeroStat[] }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="surface-dark grain relative overflow-hidden bg-navy-800 pt-[calc(var(--header-h)+4.5rem)] pb-20 text-white sm:pb-24 lg:min-h-[92svh] lg:pt-[calc(var(--header-h)+6.5rem)]"
    >
      {/* Ambient gradient blobs (transform-only animation) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-40 -left-40 size-[38rem] rounded-full bg-navy-500/50 blur-[120px] will-change-transform motion-safe:animate-blob" />
        <div className="absolute top-1/3 -right-32 size-[30rem] rounded-full bg-gold-500/[0.14] blur-[120px] will-change-transform motion-safe:animate-blob-slow" />
        <div className="absolute -bottom-48 left-1/3 size-[26rem] rounded-full bg-navy-400/30 blur-[110px] will-change-transform motion-safe:animate-blob" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgb(5_14_26/0.55))]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <GlobeLines className="pointer-events-none absolute top-1/2 right-[-14rem] w-[44rem] -translate-y-1/2 text-white/[0.13] sm:right-[-10rem] lg:right-[-6rem] lg:w-[46rem] xl:right-0" />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            <p
              className="fade-up eyebrow inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-white/85 backdrop-blur-sm"
              style={delay(0)}
            >
              <span className="size-1.5 rounded-full bg-gold-500 shadow-[0_0_12px_2px_rgb(201_162_39/0.6)]" aria-hidden="true" />
              {siteConfig.blogName} · Visa &amp; Study Abroad Updates
            </p>

            <RevealText
              as="h1"
              id="hero-title"
              mode="mount"
              text="Your trusted guide to studying and working abroad"
              highlight={["abroad"]}
              highlightClassName="italic text-gold-300 font-light"
              className="mt-7 font-serif text-[2.6rem] leading-[1.04] font-normal tracking-[-0.02em] sm:text-6xl lg:text-[5.4rem]"
            />

            <p className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-navy-200 sm:text-xl" style={delay(550)}>
              Clear, practical guides on student visas, work permits and scholarships — from the advisors at{" "}
              {siteConfig.companyName}.
            </p>

            <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(700)}>
              <a href="#articles" className={buttonClasses("gold", "lg")}>
                Read latest articles
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-premium group-hover/btn:translate-y-0.5"
                />
              </a>
              <a href={siteConfig.consultationUrl} {...externalLinkProps} className={buttonClasses("outline-light", "lg")}>
                Book Free Consultation
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-premium group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <dl
          className="fade-up mt-16 grid grid-cols-2 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4 lg:mt-24"
          style={delay(850)}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn("flex flex-col-reverse", i > 0 && "sm:border-l sm:border-white/10 sm:pl-8")}
            >
              <dt className="eyebrow mt-2 text-navy-300">{stat.label}</dt>
              <dd className="font-serif text-4xl font-light text-white sm:text-5xl">
                {stat.value !== undefined ? <CountUp value={stat.value} suffix={stat.suffix} /> : stat.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
