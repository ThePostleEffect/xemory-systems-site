import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/creative-admin"],
    },
    sitemap: "https://www.xemorysystems.com/sitemap.xml",
  };
}
