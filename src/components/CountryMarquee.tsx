import type { CountryWithCount } from "@/types/post";

function MarqueeRow({ countries, duplicate = false }: { countries: CountryWithCount[]; duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined} className={duplicate ? "flex shrink-0 motion-reduce:hidden" : "flex shrink-0"}>
      {countries.map((country, i) => (
        <li key={`${country.slug}-${i}`} className="flex items-center gap-4 px-6 sm:gap-5 sm:px-8">
          <span className="text-2xl sm:text-3xl" aria-hidden="true">
            {country.flag}
          </span>
          <span className="font-serif text-2xl font-light whitespace-nowrap text-navy-800 sm:text-[2rem]">
            {country.name}
          </span>
          <span aria-hidden="true" className="ml-4 text-sm text-gold-500 sm:ml-6">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Slow infinite marquee of destinations. Pauses on hover; static (scrollable) for reduced motion. */
export function CountryMarquee({ countries }: { countries: CountryWithCount[] }) {
  // Repeat the list so one row is always wider than the viewport, then render it twice for a seamless loop.
  const loop = [...countries, ...countries];

  return (
    <section aria-label="Destinations we cover" className="group relative border-b border-line bg-paper py-7 sm:py-9">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto motion-reduce:no-scrollbar">
        <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
          <MarqueeRow countries={loop} />
          <MarqueeRow countries={loop} duplicate />
        </div>
      </div>
    </section>
  );
}
