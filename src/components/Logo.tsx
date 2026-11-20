import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LogoProps = { className?: string; onClick?: () => void };

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.blogName} by ${siteConfig.companyName} — home`}
      className={cn("group inline-flex items-center gap-2.5 rounded-md text-white", className)}
    >
      <Image
        src={siteConfig.logo}
        alt=""
        width={30}
        height={30}
        unoptimized
        className="transition-transform duration-500 ease-premium group-hover:-rotate-6 group-hover:scale-105"
      />
      <span className="flex items-baseline gap-2">
        <span className="font-serif text-[1.35rem] leading-none font-medium tracking-tight">Monarch</span>
        <span className="eyebrow text-gold-500">Insights</span>
      </span>
    </Link>
  );
}
