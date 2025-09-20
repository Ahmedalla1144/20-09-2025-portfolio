export type Post = {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image?: string;
    tags?: string[];
    href?: string;
};

export const posts: Post[] = [
    {
    id: "nextjs-performance",
    title: "Improving Core Web Vitals in Next.js",
    excerpt:
      "A practical checklist to squeeze more performance out of Next.js—images, scripts, fonts, caching, and ISR.",
    date: "2025-08-20",
    image: "/images/posts/nextjs-performance.png",
    tags: ["Next.js", "Performance", "Lighthouse"],
    href: "/public/images/posts/nextjs-performance.png",
  },
  {
    id: "tailwind-design-tokens",
    title: "Design Tokens with Tailwind v5 @theme inline",
    excerpt:
      "Centralize color, spacing, and typography with @theme inline. Build a consistent UI without a Tailwind config.",
    date: "2025-08-05",
    image: "/images/posts/tailwind-design-tokens.png",
    tags: ["Tailwind", "Design System"],
    href: "/public/images/posts/tailwind-design-tokens",
  },
  {
    id: "api-integration",
    title: "Fetching Project Data from an External API",
    excerpt:
      "How I normalize API responses, handle errors, and plug them into server components for SEO-friendly grids.",
    date: "2025-07-22",
    image: "/images/posts/api-integration.png",
    tags: ["Next.js", "API", "TypeScript"],
    href: "/public/images/posts/api-integration",
  },
  {
    id: "framer-motion-ux",
    title: "Adding Delight with Framer Motion (Lightly)",
    excerpt:
      "Subtle, purposeful motion beats flashy animations. Section reveals, taps, and attention cues that help UX.",
    date: "2025-07-01",
    image: "/images/posts/framer-motion-ux.png",
    tags: ["Framer Motion", "UX"],
    href: "/public/images/posts/framer-motion-ux",
  },
  {
    id: "accessibility-checklist",
    title: "My Frontend Accessibility Checklist",
    excerpt:
      "Landmarks, keyboard traps, focus rings, color contrast, aria-live, and testing tips you can apply quickly.",
    date: "2025-06-15",
    image: "/images/posts/accessibility-checklist.png",
    tags: ["Accessibility", "A11y"],
    href: "/public/images/posts/accessibility-checklist",
  },
  {
    id: "vercel-ci-cd",
    title: "Zero-Downtime Deploys with Vercel CI/CD",
    excerpt:
      "Preview environments, env vars, headers, and cache-control. A simple flow for reliable deploys.",
    date: "2025-05-30",
    image: "/images/posts/vercel-ci-cd.png",
    tags: ["Vercel", "CI/CD"],
    href: "/public/images/posts/vercel-ci-cd",
  },
];
