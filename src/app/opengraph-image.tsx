import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 85% 20%, #1a365f 0%, #0b1f3a 55%, #050e1a 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#C9A227" }} />
          <span style={{ letterSpacing: 6, textTransform: "uppercase", color: "#E3C565", fontSize: 24 }}>
            {siteConfig.blogName}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 900, letterSpacing: -2 }}>
            Your trusted guide to studying and working abroad
          </div>
          <div style={{ fontSize: 28, color: "#b3c2db" }}>
            {`Visa & study abroad guides by ${siteConfig.companyName}`}
          </div>
        </div>
        <div style={{ display: "flex", height: 4, width: 160, background: "#C9A227" }} />
      </div>
    ),
    size,
  );
}
