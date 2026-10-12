export type WorkProject = {
  slug: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  detail: string;
  proofPoints: readonly string[];
  systems: readonly string[];
};

export const featuredWork = {
  title: "Xemory Data Capture Pipeline",
  category: "Experimental Vision System",
  status: "Independent R&D",
  summary:
    "A consent-based experimental pipeline designed to capture dense facial-response data during controlled video exposure, pairing real-time landmark analysis with emotion modeling, derived behavioral metrics, and synchronized timestamps.",
  detail:
    "Even short sessions generated unusually rich structured datasets. The system was built to analyze facial landmarks, emotional signal shifts, head pose, eye openness, mouth movement, smile intensity, and timing relationships frame by frame, creating a serious foundation for identity, memory, and continuity-oriented research.",
  proofPoints: [
    "468 facial landmarks captured in real time",
    "Seven emotion categories with confidence scoring",
    "Derived metrics including mouth, eyes, brows, smile, and head pose",
    "Stimulus-synced timestamps tied to each captured frame",
    "Consent-based testing with signed study permissions",
    "Short sessions capable of producing dense behavioral records",
  ] as const,
  systems: [
    "Computer vision",
    "Multimodal signal capture",
    "Behavioral metrics",
    "Privacy-aware experimentation",
  ] as const,
  sample: [
    `{"video_timestamp":94.588299,`,
    ` "face_metrics":{"mouth_open":0.1200,"smile_intensity":0.0769,"head_yaw":12.2394},`,
    ` "emotion":{"dominant_emotion":"sadness","confidence":0.5442},`,
    ` "valence":-0.8689,`,
    ` "arousal":0.3252,`,
    ` "processing_time_ms":459.857}`,
  ] as const,
} as const;

export const supportingWork: readonly WorkProject[] = [
  {
    slug: "xemory-beacon",
    title: "Xemory Beacon",
    category: "Hardware Concept / Presence Device",
    status: "Design Studies + Prototype Direction",
    summary:
      "A dedicated hardware concept exploring how a Xemory avatar could eventually live in a physical object, combining presence, interaction, audio, lighting, sensing, and heirloom-oriented form language.",
    detail:
      "The Beacon extends the project beyond software alone. Current materials are concept studies and mockup imagery exploring several directions, from a minimal Mini Sphere to more ceremonial and faith-sensitive forms intended to feel like lasting family objects rather than ordinary consumer hardware.",
    proofPoints: [
      "Concept directions ranging from minimal to ceremonial form factors",
      "System design joining compute, cameras, microphones, LEDs, and speaker hardware",
      "Heirloom-oriented thinking around legacy, presence, and long-term display",
    ],
    systems: ["Hardware concepting", "Embodied interaction", "Integrated system design"],
  },
  {
    slug: "howdoo",
    title: "HOWDOO",
    category: "Product / Platform Concept",
    status: "Independent Build",
    summary:
      "A digital product concept built to demonstrate platform thinking, user flow design, structured interfaces, and the kind of system-level execution Xemory can bring to modern web software.",
    detail:
      "The project reflects product judgment as much as visual execution, showing how a more complete system can be shaped with clarity instead of surface-level feature stacking.",
    proofPoints: [
      "Product thinking",
      "Interface architecture",
      "Structured user flow",
    ],
    systems: ["UX systems", "Platform design", "Digital product execution"],
  },
  {
    slug: "creator-contract-generator",
    title: "Creator Contract Generator",
    category: "Operational Tooling",
    status: "Independent Build",
    summary:
      "A practical application designed to help creators generate cleaner agreements through a more structured and approachable workflow.",
    detail:
      "It demonstrates Xemory’s ability to build useful, business-facing tools that reduce friction, improve clarity, and translate messy operational needs into something elegant and functional.",
    proofPoints: [
      "Utility-first software",
      "Business-facing tooling",
      "Workflow clarity",
    ],
    systems: ["Form systems", "Operational tooling", "Practical UX"],
  },
  {
    slug: "welcome-to-wildverse",
    title: "Welcome To WildVerse Mini Series",
    category: "Creative Production",
    status: "In Production",
    summary:
      "A story-driven creative project demonstrating worldbuilding, visual direction, digital storytelling, and the ability to coordinate work that lives across concept, brand, and production.",
    detail:
      "This project shows that Xemory’s range extends beyond conventional software surfaces into creative systems, narrative design, and the disciplined shaping of audience-facing experiences.",
    proofPoints: [
      "Worldbuilding",
      "Narrative direction",
      "Cross-disciplinary execution",
    ],
    systems: ["Creative systems", "Production direction", "Brand storytelling"],
  },
] as const;
