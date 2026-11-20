import { CountryExplorer } from "@/components/CountryExplorer";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import type { CountryWithCount } from "@/types/post";

export function CountriesSection({ countries }: { countries: CountryWithCount[] }) {
  return (
    <section
      id="countries"
      aria-labelledby="countries-heading"
      className="border-t border-line bg-paper-deep py-24 sm:py-28 lg:py-32"
    >
      <div className="container-page">
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="eyebrow text-gold-700">Explore by country</p>
            </FadeIn>
            <RevealText
              as="h2"
              id="countries-heading"
              text="Where do you want to go?"
              highlight={["go?"]}
              highlightClassName="italic text-gold-700"
              className="mt-4 font-serif text-4xl font-normal tracking-[-0.02em] text-navy-800 sm:text-5xl lg:text-6xl"
            />
          </div>
          <FadeIn delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-muted lg:ml-auto">
              Pick a destination to see every guide, update and success story we&rsquo;ve published for it.
            </p>
          </FadeIn>
        </div>
        <CountryExplorer countries={countries} />
      </div>
    </section>
  );
}
