export const personal = {
  name: "Sumaanta Munde",
  title: "Senior Software Developer",
  email: "sumaantamunde@gmail.com",
  phone: "+91 9550614763",
  linkedin: "https://linkedin.com/in/sumaantamunde",
  college: "CSE - NITW'22",
  summary:
    "Senior Software Engineer with 3.5+ years of experience scaling high-impact products. Expert in architecting server-driven systems and unified component libraries that drive developer velocity and 40% user engagement. Proven track record in early-stage startups as well as mid-size enterprise firms of owning end-to-end delivery for platforms serving 14k+ daily users.",
};

export const experiences = [
  {
    company: "Optym",
    role: "Senior Software Developer",
    period: "Nov '25 – Apr '26",
    type: "Enterprise",
    bullets: [
      "Architected a server-driven system engine, abstracting complex logic to frontend configurations; reduced new feature deployment time by 40%.",
      "Drove 9+ features from design to production — decomposing complex data views into composable, slot-based component systems with dedicated data-fetching hooks and co-located tests across every layer.",
      "Built reusable UI primitives and modal architectures with clean slot-based composition patterns, establishing consistent API contracts adopted across the entire mobile module.",
      "Led technical design and implementation for enterprise-grade logistics features, ensuring 99.9% reliability from design to production.",
    ],
  },
  {
    company: "Port, by Numberless",
    role: "Founding Software Developer - II",
    period: "Oct '23 – Aug '25",
    type: "Startup",
    bullets: [
      "Spearheaded frontend architecture for a secure, high-concurrency messaging platform (rivaling Signal/WhatsApp), owning connections, chats, and groups across Android and iOS, scaled to support 14k+ active users.",
      "Built a versioned class hierarchy in React Native for the company's open-source transition, ensuring forward compatibility and long-term maintainability.",
      "Optimized core messaging performance, reducing latency by 30% through strategic state management and efficient API consumption patterns.",
      "Built custom native modules to expose device-level capabilities to the JS layer; delivered a scalable light/dark theming system designed for extensibility.",
      "Streamlined the end-to-end message pipeline with real-time delivery via Firebase Cloud Messaging and efficient cross-platform data synchronization.",
      "Designed PostgreSQL schemas for high-throughput messaging with query tuning, indexing strategies, and smart caching to sustain 5,000+ MAU peaks.",
    ],
  },
  {
    company: "Mosaic Wellness",
    role: "Software Developer - I",
    period: "Feb '22 – Jul '23",
    type: "Product",
    bullets: [
      "Developed a unified, multi-brand codebase powering three distinct consumer brands (Man Matters, Be Bodywise, Little Joys); eliminated 60% of code duplication across teams.",
      "Designed complete purchase flows (checkout, cart, address, payments) and authentication mechanisms.",
      "Integrated automated testing and CI/CD pipelines, increasing release frequency by 50% while maintaining high production stability.",
      "Implemented tele-consultation workflows and client-side prescription generation — increasing app traffic and boosting user retention by 28%.",
    ],
  },
];

export const skills = {
  Frontend: ["JavaScript", "TypeScript", "React Native", "React", "Next.js"],
  Architecture: [
    "Server-Driven UI",
    "Config-Driven Systems",
    "Design Systems",
    "State Management",
  ],
  "Backend & Infra": ["Node.js", "PostgreSQL", "Azure DevOps", "CI/CD"],
  "Testing & QA": ["Jest", "React Testing Library", "TDD", "SonarCloud"],
};

export const stats = [
  { value: "3.5+", label: "Years Experience" },
  { value: "14k+", label: "Daily Active Users" },
  { value: "40%", label: "Faster Deployments" },
  { value: "30%", label: "Latency Reduced" },
];
