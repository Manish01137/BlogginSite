import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonClasses } from "@/lib/ui";

export const metadata = { title: "Page coming soon" };

export default function NotFound() {
  return (
    <main
      id="main"
      className="surface-dark grain relative flex min-h-[80svh] items-center overflow-hidden bg-navy-800 pt-[var(--header-h)] text-white"
    >
      <div aria-hidden="true" className="absolute -top-40 -right-40 size-[32rem] rounded-full bg-gold-500/10 blur-[120px]" />
      <div className="container-page relative z-10 py-24">
        <p className="eyebrow text-gold-500">404 · Coming soon</p>
        <h1 className="mt-5 max-w-2xl font-serif text-5xl leading-[1.05] font-normal tracking-[-0.02em] sm:text-6xl">
          This page is still being <span className="italic text-gold-300">written</span>.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-navy-200">
          Our full article pages are on their way. In the meantime, browse the latest guides on the homepage.
        </p>
        <Link href="/" className={buttonClasses("gold", "lg", "mt-10")}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Monarch Insights
        </Link>
      </div>
    </main>
  );
}
