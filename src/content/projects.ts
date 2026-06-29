import type { PortfolioProject } from "@/types/portfolio";

export const projects: PortfolioProject[] = [
  {
    slug: "urbanouse",
    title: "Urbanouse — Real Estate Frontend",
    shortDescription:
      "A modern frontend for a real estate platform with property discovery, search, and responsive listings.",
    fullDescription:
      "Urbanouse is a modern real estate frontend built around a clear property discovery flow. The project combines a multi-section landing page with property search, filtering, listings, agent cards, and a responsive interface designed mobile-first.",
    status: "published",
    priority: 930,
    primaryCategory: "landing-page",
    categories: [
      "landing-page",
      // "real-estate",
      // "lead-generation",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    domainTags: ["Real Estate", "Property Search", "Lead Generation"],
    demoUrl: "https://urbanouse-nextjs.vercel.app/",
    repoUrl: "https://github.com/OvchariK3208/urbanouse/",
    showRepo: true,
    githubRepo: "OvchariK3208/urbanouse",
    vercelProject: "urbanouse-nextjs",
    preview: {
      type: "screenshot",
      src: "/projects/urbanouse/preview.webp",
      alt: "Urbanouse real estate landing page",
    },
    featured: true,
    whatWasBuilt: [
      "Multi-section real estate landing page",
      "Property search and filtering interface",
      "Reusable listing and agent components",
      "Mobile-first responsive layouts",
    ],
  },
  {
    slug: "bodychef",
    title: "Bodychef — Delivery Platform",
    shortDescription:
      "A responsive delivery platform focused on a fast and straightforward food ordering experience.",
    fullDescription:
      "Bodychef is a delivery platform focused on a fast, responsive, and user-friendly ordering experience. The work covered interface implementation, responsive layouts, component architecture, and Sass-based styling.",
    status: "published",
    priority: 900,
    primaryCategory: "landing-page",
    // Previous primary category: "commercial"
    categories: [
      "landing-page",
      // "commercial",
      // "lead-generation",
    ],
    stack: ["React", "Next.js", "JavaScript", "TypeScript", "Sass"],
    domainTags: ["Delivery", "Food", "Commercial Website"],
    demoUrl: "https://www.bodychef.com/",
    upworkUrl:
      "https://www.upwork.com/freelancers/~013dbf7942b7b9cc02?p=1822241563137232896",
    showRepo: false,
    preview: {
      type: "screenshot",
      src: "/projects/bodychef/preview.webp",
      alt: "Bodychef delivery platform preview",
    },
    featured: true,
    whatWasBuilt: [
      "Responsive ordering experience",
      "Reusable component architecture",
      "Sass-based responsive styling",
      "Commercial landing and product flows",
    ],
  },
  {
    slug: "real-time-private-chat",
    title: "Real-Time Private Chat App",
    shortDescription:
      "A full-stack private chat with authentication, persistent messages, and live presence updates.",
    fullDescription:
      "A full-stack real-time private chat application with JWT authentication, Socket.IO messaging, MongoDB message persistence, online and offline user status, responsive layouts, and light and dark theme support.",
    status: "published",
    priority: 870,
    primaryCategory: "saas",
    categories: ["saas", "dashboard"],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Socket.IO",
      "MongoDB",
    ],
    domainTags: ["Real-time", "Authentication", "Messaging"],
    demoUrl: "https://chat-app-3208.vercel.app/",
    repoUrl: "https://github.com/OvchariK3208/chat-app/",
    showRepo: true,
    githubRepo: "OvchariK3208/chat-app",
    vercelProject: "chat-app-3208",
    preview: {
      type: "screenshot",
      src: "/projects/real-time-private-chat/preview.webp",
      alt: "Real-Time Private Chat registration screen",
    },
    whatWasBuilt: [
      "JWT authentication flow",
      "Private Socket.IO messaging",
      "MongoDB message persistence",
      "Online and offline presence status",
      "Responsive light and dark interfaces",
    ],
  },
  {
    slug: "askona",
    title: "Askona — Online Store",
    shortDescription:
      "An e-commerce storefront for mattresses and furniture with responsive product discovery flows.",
    fullDescription:
      "Askona is an online store for mattresses and furniture. The work included interface implementation, responsive layouts, component architecture, Node.js integrations, and e-commerce user experience improvements.",
    status: "published",
    priority: 840,
    primaryCategory: "landing-page",
    // Previous primary category: "commercial"
    categories: [
      "landing-page",
      // "commercial",
    ],
    stack: ["React", "TypeScript", "Node.js", "JavaScript"],
    domainTags: ["E-commerce", "Furniture", "Online Store"],
    demoUrl: "https://askona.md/",
    upworkUrl:
      "https://www.upwork.com/freelancers/~013dbf7942b7b9cc02?p=1822237822996664320",
    showRepo: false,
    preview: {
      type: "screenshot",
      src: "/projects/askona/preview.webp",
      alt: "Askona online store homepage",
    },
    whatWasBuilt: [
      "Responsive storefront layouts",
      "Reusable commerce components",
      "Node.js service integrations",
      "Product discovery user experience",
    ],
  },
  {
    slug: "product-market",
    title: "Product Market — React CRUD App",
    shortDescription:
      "A product management application with complete CRUD flows, validation, routing, and API integration.",
    fullDescription:
      "Product Market is a React product management application built as a technical test assignment. It provides complete create, read, update, and delete flows, API integration, Redux Toolkit state management, form validation, and routing.",
    status: "published",
    priority: 810,
    primaryCategory: "dashboard",
    categories: [
      "dashboard",
      // "admin-panel",
      // "crud-app",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Axios",
    ],
    domainTags: ["Product Management", "Admin", "CRUD"],
    demoUrl: "https://product-market-delta.vercel.app/products",
    repoUrl: "https://github.com/OvchariK3208/product-market/",
    showRepo: true,
    githubRepo: "OvchariK3208/product-market",
    vercelProject: "product-market-delta",
    preview: {
      type: "screenshot",
      src: "/projects/product-market/preview.webp",
      alt: "Product Market product listing",
    },
    whatWasBuilt: [
      "Complete product CRUD flow",
      "Redux Toolkit state management",
      "API integration with Axios",
      "Validated forms and client-side routing",
    ],
  },
];
