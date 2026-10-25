export type LabStatus =
  "Available" | "Free" | "Experimental" | "In development" | "Coming soon";
export type LabItem = {
  id: string;
  number: string;
  title: string;
  category: string;
  status: LabStatus;
  price: number;
  image: string;
  description: string;
  includes: string;
  note: string;
  featured?: boolean;
};
export const labItems: LabItem[] = [
  {
    id: "nJPqL",
    number: "01",
    title: "Animated Desktop Buddy",
    category: "Creative software",
    status: "Available",
    price: 5.99,
    image: "buddy",
    description:
      "A little company for your screen. Meet Pip and Sprout, then make a buddy of your own.",
    includes:
      "Working browser app · Two characters · Six reactions · Editable source + guide",
    note: "Runs in a browser. A digital kit, not a desktop overlay or talking AI assistant.",
    featured: true,
  },
  {
    id: "xkBrt",
    number: "02",
    title: "Build Your First Website with Codex",
    category: "Build guides",
    status: "Available",
    price: 4.99,
    image: "website",
    description:
      "Take an idea from a blank page to a website you can call your own.",
    includes:
      "14-page guide · Responsive website starter · 12 prompts · Launch checklist",
    note: "Digital guide and source files. Codex access, hosting and domain costs are separate.",
    featured: true,
  },
  {
    id: "0rFsq",
    number: "03",
    title: "DIY Robot Face Pack",
    category: "Creative assets",
    status: "Available",
    price: 1.99,
    image: "faces",
    description:
      "Twelve expressions. Three palettes. A small collection with a lot of character.",
    includes:
      "Editable SVGs · Transparent PNGs · Monochrome bitmaps · Browser preview",
    note: "Still artwork with reactions in the browser preview. Hardware integration requires programming.",
    featured: true,
  },
  {
    id: "hMA4m",
    number: "04",
    title: "Personal Command Center",
    category: "Creative software",
    status: "Available",
    price: 2.99,
    image: "command",
    description:
      "Give your priorities, tasks, notes and favorite links one simple home.",
    includes:
      "Editable browser dashboard · PDF guide · Planning worksheet · Backup and restore",
    note: "Browser-local storage. Export backups to keep a copy of your data; no cloud sync included.",
  },
  {
    id: "pV2HB",
    number: "05",
    title: "Digital Product Launch Kit",
    category: "Build guides",
    status: "Available",
    price: 1.99,
    image: "launch",
    description:
      "Turn a finished creation into a clear listing and a considered launch.",
    includes:
      "12 editable templates · Interactive launchpad · 10-page illustrated guide",
    note: "Templates and planning tools. Store setup, payment processing and promotion are arranged separately.",
  },
  {
    id: "86Tbx",
    number: "06",
    title: "Desk Buddy Build Guide",
    category: "Build guides",
    status: "Experimental",
    price: 5,
    image: "robot",
    description:
      "Build a stationary desk companion from cardboard and a few electronic parts.",
    includes:
      "Illustrated shopping + assembly guide · Printable patterns · Programming instructions",
    note: "Prototype edition: physical validation pending. Concept image. Instructions only; hardware, tools and computer not included. Parts costs vary by location, supplier, tax and shipping.",
  },
  {
    id: "BtMCN", number: "07", title: "36-Prompt Bundle",
    category: "Creative assets", status: "Available", price: 1.99, image: "prompts",
    description: "Create, learn and tell better stories with Visual Brief Studio, Learn It Deeply and Storyworld Builder.",
    includes: "Three packs · 36 main prompts + 36 repair follow-ups · Three PDF guides (57 pages) · Copyable text · Three worked examples + project cards · One ZIP",
    note: "Digital prompt collection. AI accounts, software, usage credits and custom services are not included. Tool capabilities and provider costs vary; review results. Personal and business-project use; no resale of the collection.",
  },
];
export const checkout = (id: string) =>
  `https://payhip.com/buy?link=${encodeURIComponent(id)}`;
