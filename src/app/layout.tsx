import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { ArticleFilterProvider } from "@/components/ArticleFilterContext";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const defaultTitle = `${siteConfig.blogName} — Visa & Study Abroad Guides by ${siteConfig.companyName}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.blogUrl),
  title: { default: defaultTitle, template: `%s | ${siteConfig.blogName}` },
  description: siteConfig.description,
  applicationName: siteConfig.blogName,
  authors: [{ name: siteConfig.companyName, url: siteConfig.mainSiteUrl }],
  publisher: siteConfig.companyName,
  keywords: [
    "study abroad",
    "student visa",
    "work visa",
    "immigration",
    "Canada study permit",
    "UK Graduate Route",
    "USA F-1 visa",
    "Australia student visa",
    "Germany Opportunity Card",
    "Dubai Golden Visa",
    "scholarships for Indian students",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.blogName,
    title: defaultTitle,
    description: siteConfig.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <ArticleFilterProvider>
            <SmoothScroll />
            <ScrollProgress />
            <a
              href="#main"
              className="fixed top-3 left-3 z-[90] -translate-y-20 rounded-full bg-gold-500 px-5 py-3 text-sm font-medium text-navy-800 shadow-lift transition-transform focus:translate-y-0"
            >
              Skip to content
            </a>
            <Header />
            <div id="page">
              {children}
              <Footer />
              <BackToTop />
              <WhatsAppButton />
            </div>
          </ArticleFilterProvider>
        </Providers>
      </body>
    </html>
  );
}
