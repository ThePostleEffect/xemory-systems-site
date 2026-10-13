import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import "./globals.css";
import "./home-showcase.css";
import "./vault.css";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `html[data-xemory-entrance="pending"],html[data-xemory-entrance="closed"],html[data-xemory-entrance="opening"]{overflow:hidden}html[data-xemory-entrance="pending"] #site-content,html[data-xemory-entrance="closed"] #site-content{visibility:hidden;opacity:0}html[data-xemory-entrance="skip"] .vault-entrance,html[data-xemory-entrance="expired"] .vault-entrance{display:none}` }} />
        <script dangerouslySetInnerHTML={{ __html: `(()=>{let seen=false;try{seen=sessionStorage.getItem('xemory-entered')==='1'}catch(e){}const needsEntrance=location.pathname==='/'&&(new URLSearchParams(location.search).get('entrance')==='preview'||(!seen&&!location.hash));document.documentElement.dataset.xemoryEntrance=needsEntrance?'pending':'skip';if(needsEntrance)setTimeout(()=>{if(document.documentElement.dataset.xemoryEntrance==='pending')document.documentElement.dataset.xemoryEntrance='expired'},5000)})()` }} />
        <noscript><style>{`#site-content{visibility:visible!important}.vault-entrance{display:none!important}`}</style></noscript>
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
