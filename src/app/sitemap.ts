import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/lab", "/about", "/contact", "/terms", "/privacy"].map(
    (path) => ({
      url: `https://www.xemorysystems.com${path}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.8,
    }),
  );
}
