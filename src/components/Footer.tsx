import { ArrowUpRight, Info, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FilterLink } from "@/components/FilterLink";
import { Logo } from "@/components/Logo";
import { RevealText } from "@/components/motion/RevealText";
import { SocialIcon } from "@/components/SocialIcon";
import { getCategories, getCountries } from "@/lib/posts";
import { siteConfig, whatsappHref } from "@/lib/site-config";
import { externalLinkProps } from "@/lib/ui";

const linkClass =
  "inline-flex items-center gap-1.5 rounded-sm text-[0.95rem] text-navy-200 transition-colors duration-300 hover:text-white";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow font-sans text-gold-500">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

export async function Footer() {
  const [categories, countries] = await Promise.all([getCategories(), getCountries()]);
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark grain relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="container-page relative z-10 pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs leading-relaxed text-navy-200">{siteConfig.tagline}</p>
            <a
              href={siteConfig.mainSiteUrl}
              {...externalLinkProps}
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors duration-300 hover:border-gold-500 hover:text-gold-300"
            >
              Visit main website
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Social media">
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...externalLinkProps}
                    aria-label={`${siteConfig.companyName} on ${s.label} (opens in a new tab)`}
                    className="grid size-10 place-items-center rounded-full border border-white/15 text-navy-200 transition-[transform,background-color,border-color,color] duration-300 ease-premium hover:-translate-y-1 hover:border-gold-500 hover:bg-gold-500 hover:text-navy-800 active:translate-y-0"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <Column title="Quick links">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  {item.href.includes("#") ? (
                    <a href={item.href} className={linkClass}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </Column>

            <Column title="Categories">
              {categories.map((c) => (
                <li key={c.slug}>
                  <FilterLink category={c.slug} className={linkClass}>
                    {c.name}
                  </FilterLink>
                </li>
              ))}
            </Column>

            <Column title="Countries">
              {countries.map((c) => (
                <li key={c.slug}>
                  <FilterLink country={c.slug} className={linkClass}>
                    <span aria-hidden="true">{c.flag}</span> {c.name}
                  </FilterLink>
                </li>
              ))}
            </Column>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow font-sans text-gold-500">Contact</h2>
              <address className="mt-5 flex flex-col gap-4 not-italic">
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} break-all`}>
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-500" />
                  {siteConfig.email}
                </a>
                <a href={siteConfig.phoneHref} className={linkClass}>
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-gold-500" />
                  {siteConfig.phone}
                </a>
                <a href={whatsappHref} {...externalLinkProps} className={linkClass}>
                  <SocialIcon name="whatsapp" className="size-4 shrink-0 text-gold-500" />
                  WhatsApp us
                </a>
                <p className="flex gap-1.5 text-[0.95rem] leading-relaxed text-navy-200">
                  <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold-500" />
                  <span>
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.country}
                  </span>
                </p>
              </address>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-navy-200">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-500" />
          <p>{siteConfig.disclaimer}</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="container-page relative z-10 mt-14 select-none" aria-hidden="true">
        <RevealText
          as="p"
          text={siteConfig.blogName}
          highlight={["Insights"]}
          highlightClassName="italic text-gold-500/90"
          stagger={0.12}
          className="font-serif text-[12.5vw] leading-[0.95] font-light tracking-[-0.04em] whitespace-nowrap text-white/90 xl:text-[10.25rem]"
        />
      </div>

      <div className="container-page relative z-10 mt-10 flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-navy-300 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.companyName}. All rights reserved.
        </p>
        <ul className="flex gap-6">
          {siteConfig.legal.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
