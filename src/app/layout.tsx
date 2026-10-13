import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import "./globals.css";
import "./home-showcase.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.xemorysystems.com"),
  title: {
    default: "Xemory Systems — Imagine. Create. Make it real.",
    template: "%s | Xemory Systems",
  },
  description:
    "Useful creations. Unusual ideas. Xemory Systems is an experimental technology and product company in Bellingham, Washington.",
  openGraph: {
    type: "website",
    siteName: "Xemory Systems",
    title: "Xemory Systems — Imagine. Create. Make it real.",
    description:
      "Useful creations. Unusual ideas. Explore what we are building.",
    images: [
      {
        url: "/brand/xemory-canonical.png",
        width: 1280,
        height: 1280,
        alt: "Xemory Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/xemory-canonical.png"],
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
