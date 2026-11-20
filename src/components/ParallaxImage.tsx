"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { BLUR_DATA_URL, cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
};

/** Image that drifts gently on scroll and zooms slowly when its `group` parent is hovered. */
export function ParallaxImage({ src, alt, sizes, preload, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-navy-800", className)}>
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[8%] will-change-transform">
        <div className="relative size-full transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.06]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
