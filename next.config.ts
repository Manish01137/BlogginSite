import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root (a stray lockfile higher up the tree can confuse root detection).
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Dummy cover images (swap for your CDN / upload bucket later)
      { protocol: "https", hostname: "picsum.photos", pathname: "/seed/**" },
      // Dummy author avatars
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
    ],
  },
};

export default nextConfig;
