import { ArrowUpRight, Check, Mail } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Magnetic } from "@/components/motion/Magnetic";
import { RevealText } from "@/components/motion/RevealText";
import { siteConfig } from "@/lib/site-config";
import { buttonClasses, externalLinkProps } from "@/lib/ui";

const points = ["Profile assessment", "Country & course shortlisting", "Document guidance"];

export function ConsultationCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="surface-dark grain relative overflow-hidden bg-navy-800 py-24 text-white sm:py-28 lg:py-36"
    >
      {/* Decorative gold rings + glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 right-[-12rem] size-[40rem] -translate-y-1/2 rounded-full border border-gold-500/15" />
        <div className="absolute top-1/2 right-[-6rem] size-[28rem] -translate-y-1/2 rounded-full border border-gold-500/20" />
        <div className="absolute top-1/2 right-0 size-[16rem] -translate-y-1/2 rounded-full border border-gold-500/25" />
        <div className="absolute -bottom-40 -left-24 size-[30rem] rounded-full bg-gold-500/10 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      </div>

      <div className="container-page relative z-10 grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <FadeIn>
            <p className="eyebrow text-gold-500">Free consultation</p>
          </FadeIn>
          <RevealText
            as="h2"
            id="cta-heading"
            text="Planning to study or work abroad? Talk to a Monarch visa expert."
            highlight={["Monarch", "visa", "expert."]}
            highlightClassName="italic text-gold-300 font-light"
            stagger={0.05}
            className="mt-5 font-serif text-[2.4rem] leading-[1.08] font-normal tracking-[-0.02em] sm:text-6xl lg:text-[4.2rem]"
          />
          <FadeIn delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-navy-200">
              {points.map((point) => (
                <li key={point} className="inline-flex items-center gap-2 text-[0.95rem]">
                  <span className="grid size-5 place-items-center rounded-full bg-gold-500/15 text-gold-500">
                    <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn delay={0.25} className="flex flex-col gap-4 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <a href={siteConfig.consultationUrl} {...externalLinkProps} className={buttonClasses("gold", "lg", "w-full sm:w-auto")}>
              Book Free Consultation
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-premium group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Magnetic>
          <a href={`mailto:${siteConfig.email}`} className={buttonClasses("outline-light", "lg")}>
            <Mail aria-hidden="true" className="size-4" />
            Email us
          </a>
          <p className="text-sm text-navy-300 lg:text-right">
            Prefer to talk?{" "}
            <a href={siteConfig.phoneHref} className="text-white underline-offset-4 hover:underline">
              {siteConfig.phone}
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
