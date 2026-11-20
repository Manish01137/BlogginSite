import { SocialIcon } from "@/components/SocialIcon";
import { whatsappHref } from "@/lib/site-config";
import { externalLinkProps } from "@/lib/ui";

/** Floating WhatsApp chat button with a soft pulse (pulse disabled for reduced motion). */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      {...externalLinkProps}
      aria-label="Chat with Monarch Visa Advisors on WhatsApp (opens in a new tab)"
      className="group fixed right-5 bottom-5 z-40 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-800 opacity-0 shadow-lift transition-[opacity,transform] duration-400 ease-premium group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        Chat with an advisor
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-transform duration-300 ease-premium group-hover:scale-105 group-active:scale-95">
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-whatsapp motion-safe:animate-pulse-ring" />
        <SocialIcon name="whatsapp" className="relative size-6" />
      </span>
    </a>
  );
}
