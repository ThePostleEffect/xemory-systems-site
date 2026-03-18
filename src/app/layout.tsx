import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Xemory Systems",
    template: "%s | Xemory Systems",
  },
  description:
    "Xemory Systems is a Bellingham, Washington company focused on thoughtful digital systems, AI-related implementation, automation, and custom technical work.",
  applicationName: "Xemory Systems",
  keywords: [
    "Xemory Systems",
    "Bellingham Washington",
    "digital systems",
    "automation",
    "AI implementation",
    "custom technical projects",
  ],
  openGraph: {
    title: "Xemory Systems",
    description:
      "Thoughtful digital systems, automation, AI-related implementation, and custom technical work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xemory Systems",
    description:
      "Thoughtful digital systems, automation, AI-related implementation, and custom technical work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${cormorant.variable} relative min-h-screen overflow-x-clip bg-black font-sans antialiased text-white selection:bg-white/10`}
      >
        <div className="site-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="site-backdrop__base" />
          <div className="site-backdrop__vignette" />
          <div className="starfield starfield--near" />
          <div className="starfield starfield--mid" />
          <div className="starfield starfield--far" />
          <div className="starfield-core" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
