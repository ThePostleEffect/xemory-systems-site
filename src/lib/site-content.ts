export type Destination = {
  title: string;
  href: string;
  eyebrow: string;
  description: string;
  art: "planes" | "rings" | "orbit" | "beacon";
};

const contactEmail = "contact@xemorysystems.com";
const contactSubject = "Project Inquiry - Xemory Systems";
const contactPhone = "360-927-0986";

export const siteContent = {
  name: "Xemory Systems",
  location: "Bellingham, Washington",
  description:
    "Thoughtful digital systems, AI-related implementation, automation, and custom technical work for organizations that value clarity and quality.",
  contactEmail,
  contactSubject,
  contactPhone,
  destinations: [
    {
      title: "What We Do",
      href: "/what-we-do",
      eyebrow: "Grounded Delivery",
      description:
        "Digital systems, AI-related implementation, workflow automation, custom builds, and technical problem-solving carried out with care.",
      art: "planes",
    },
    {
      title: "Capabilities",
      href: "/capabilities",
      eyebrow: "Broad Range",
      description:
        "A flexible technical partner able to take on focused builds, messy operational problems, and work that crosses disciplines.",
      art: "rings",
    },
    {
      title: "About",
      href: "/about",
      eyebrow: "Standards And Perspective",
      description:
        "A clear view of how Xemory Systems works, what it values, and why measured execution matters.",
      art: "orbit",
    },
    {
      title: "Contact",
      href: "/contact",
      eyebrow: "Start The Conversation",
      description:
        "Reach out with a practical need, an early idea, or a problem that requires serious technical judgment.",
      art: "beacon",
    },
  ] satisfies Destination[],
  whatWeDo: [
    {
      title: "Digital Systems",
      body:
        "Designing and refining internal and customer-facing digital systems that are easier to use, easier to maintain, and better aligned with the way real work happens.",
    },
    {
      title: "AI-Related Implementation",
      body:
        "Applying AI thoughtfully where it creates meaningful leverage, whether that means structured workflows, decision support, content operations, or internal tools.",
    },
    {
      title: "Workflow Automation",
      body:
        "Reducing repetitive work, handoff friction, and operational drag through practical automation that respects reliability, oversight, and downstream consequences.",
    },
    {
      title: "Custom Builds",
      body:
        "Creating purpose-built websites, interfaces, tools, and technical systems when off-the-shelf products do not fit the need or the standard required.",
    },
    {
      title: "Technical Problem-Solving",
      body:
        "Investigating difficult issues, untangling unclear requirements, and establishing sound implementation paths when a project needs more than surface-level execution.",
    },
    {
      title: "Flexible Project Support",
      body:
        "Supporting work that sits between strategy and execution, especially when teams need a capable partner who can adapt quickly without lowering the quality bar.",
    },
  ],
  capabilities: [
    {
      title: "System Design And Build",
      body:
        "Web experiences, internal tools, automation flows, data-informed interfaces, and tailored digital infrastructure built with maintainability in mind.",
    },
    {
      title: "Operational Improvement",
      body:
        "Process review, workflow redesign, tooling alignment, and implementation work that removes friction instead of adding another fragile layer.",
    },
    {
      title: "Technical Translation",
      body:
        "Turning ambiguous goals into concrete scopes, practical decisions, and working systems that non-technical stakeholders can still understand.",
    },
    {
      title: "Custom Engagement Shape",
      body:
        "Short engagements, focused problem-solving, iterative delivery, or broader build partnerships depending on what the work actually requires.",
    },
    {
      title: "Cross-Disciplinary Execution",
      body:
        "Work that spans design sensitivity, product thinking, software implementation, and operational judgment rather than living in a single narrow box.",
    },
    {
      title: "Future-Facing Technical Support",
      body:
        "Exploration and implementation for teams preparing for AI-assisted workflows, more capable software systems, and a more automated operating environment.",
    },
  ],
  principles: [
    {
      title: "Intentional Over Performative",
      body:
        "The work should solve the actual problem, not merely look sophisticated from a distance. Xemory Systems values substance, restraint, and clear reasoning.",
    },
    {
      title: "Elegant Systems Win",
      body:
        "A good system feels calm under use. It reduces friction, creates confidence, and stays understandable when the environment around it changes.",
    },
    {
      title: "Technology Should Clarify",
      body:
        "Modern tools are valuable when they make people faster, better informed, and less burdened by avoidable complexity.",
    },
    {
      title: "Quality Is A Working Standard",
      body:
        "Details matter. Accessibility matters. Maintainability matters. A polished result should still be structurally sound beneath the surface.",
    },
  ],
  contactNotes: [
    "Project inquiries, early-stage ideas, and technically difficult problems are all appropriate reasons to reach out.",
    "The contact page uses a structured submission flow rather than relying on the visitor's local mail client.",
    "Xemory Systems is based in Bellingham, Washington and is open to remote and location-flexible work.",
  ],
} as const;
