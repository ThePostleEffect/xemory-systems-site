import type { Metadata } from "next";

import { HomeExperience } from "@/components/home-experience";

export const metadata: Metadata = {
  title: "Home",
  description:
    "The official Xemory Systems website. Explore what the company does, its capabilities, perspective, and how to make contact.",
};

export default function Home() {
  return <HomeExperience />;
}
