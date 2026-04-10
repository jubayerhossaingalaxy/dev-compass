export interface Post {
  id: string;
  title: string;
  content: string;
  code?: string;
  codeLanguage?: string;
  type: "snippet" | "tutorial" | "discussion" | "tool_review" | "announcement";
  tags: string[];
  author: Author;
  upvotes: number;
  downvotes: number;
  comments: number;
  createdAt: string;
  score: number;
}

export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  reputation: number;
  badges: string[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  website: string;
  rating: number;
  reviews: number;
  upvotes: number;
  launchDate: string;
  logo: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const authors: Author[] = [
  { id: "1", name: "Sarah Chen", username: "sarahdev", avatar: "SC", reputation: 4820, badges: ["Top Contributor", "Trending Author"] },
  { id: "2", name: "Alex Rivera", username: "alexr", avatar: "AR", reputation: 3200, badges: ["Open Source Hero"] },
  { id: "3", name: "Maya Johnson", username: "mayaj", avatar: "MJ", reputation: 5100, badges: ["Top Contributor", "AI Pioneer"] },
  { id: "4", name: "Kai Nakamura", username: "kaidev", avatar: "KN", reputation: 2750, badges: ["Rising Star"] },
  { id: "5", name: "Priya Sharma", username: "priyacode", avatar: "PS", reputation: 6300, badges: ["Top Contributor", "DevOps Guru"] },
];

export const posts: Post[] = [
  {
    id: "1", title: "Building a Zero-Downtime Deployment Pipeline with Docker & GitHub Actions",
    content: "Here's how I set up a production-grade CI/CD pipeline that deploys to multiple environments with zero downtime using blue-green deployments.",
    code: `name: deploy\non:\n  push:\n    branches: [main]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Build & Push\n        run: |\n          docker build -t app:$GITHUB_SHA .\n          docker push registry/app:$GITHUB_SHA\n      - name: Blue-Green Deploy\n        run: ./scripts/blue-green.sh $GITHUB_SHA`,
    codeLanguage: "yaml", type: "tutorial", tags: ["docker", "ci-cd", "devops", "github-actions"],
    author: authors[4], upvotes: 342, downvotes: 12, comments: 47, createdAt: "2h ago", score: 1284,
  },
  {
    id: "2", title: "The Elegant Way to Handle Errors in TypeScript",
    content: "Stop using try-catch everywhere. Here's a Result type pattern inspired by Rust that makes error handling predictable and type-safe.",
    code: `type Result<T, E = Error> = \n  | { ok: true; value: T }\n  | { ok: false; error: E };\n\nfunction safeParse<T>(json: string): Result<T> {\n  try {\n    return { ok: true, value: JSON.parse(json) };\n  } catch (e) {\n    return { ok: false, error: e as Error };\n  }\n}\n\nconst result = safeParse<User>(raw);\nif (result.ok) {\n  console.log(result.value.name);\n} else {\n  console.error(result.error.message);\n}`,
    codeLanguage: "typescript", type: "snippet", tags: ["typescript", "patterns", "error-handling"],
    author: authors[0], upvotes: 891, downvotes: 23, comments: 156, createdAt: "4h ago", score: 3102,
  },
  {
    id: "3", title: "Why I Switched from Next.js to Astro for My Blog (and why you should too)",
    content: "After running a Next.js blog for 2 years, I migrated to Astro. Here's my honest comparison — performance numbers, DX, and gotchas.",
    type: "discussion", tags: ["astro", "nextjs", "performance", "web-dev"],
    author: authors[1], upvotes: 567, downvotes: 89, comments: 234, createdAt: "6h ago", score: 1890,
  },
  {
    id: "4", title: "Rust's Borrow Checker Explained with Real-World Analogies",
    content: "The borrow checker isn't your enemy — it's your most honest code reviewer. Let me explain ownership with library book analogies.",
    code: `fn main() {\n    let book = String::from("Rust Programming");\n    \n    // Lending the book (borrowing)\n    let reader = &book;\n    println!("Reading: {}", reader);\n    \n    // Can't modify while borrowed\n    // book.push_str(" 2nd Ed"); // ERROR!\n    \n    // Mutable borrow\n    let mut notebook = String::from("Notes");\n    let writer = &mut notebook;\n    writer.push_str(": Chapter 1");\n}`,
    codeLanguage: "rust", type: "tutorial", tags: ["rust", "systems", "memory-safety"],
    author: authors[2], upvotes: 723, downvotes: 15, comments: 89, createdAt: "8h ago", score: 2650,
  },
  {
    id: "5", title: "🚀 Announcing DevPulse v2.0 — The Developer Ecosystem Gets Smarter",
    content: "We're thrilled to announce DevPulse v2.0 with AI-powered content recommendations, real-time collaboration, and a completely redesigned tools marketplace.",
    type: "announcement", tags: ["devpulse", "announcement", "ai", "community"],
    author: authors[3], upvotes: 1200, downvotes: 5, comments: 312, createdAt: "12h ago", score: 4500,
  },
];

export const tools: Tool[] = [
  { id: "1", name: "Cursor", description: "AI-first code editor built on VS Code. Write, edit, and debug code with AI assistance.", category: "AI Tools", tags: ["ai", "editor", "productivity"], website: "https://cursor.sh", rating: 4.8, reviews: 2340, upvotes: 5600, launchDate: "2024-01-15", logo: "⚡" },
  { id: "2", name: "Bun", description: "Incredibly fast JavaScript runtime, bundler, test runner, and package manager.", category: "Runtime", tags: ["javascript", "runtime", "performance"], website: "https://bun.sh", rating: 4.6, reviews: 1890, upvotes: 4200, launchDate: "2023-09-08", logo: "🍞" },
  { id: "3", name: "Turborepo", description: "High-performance build system for JavaScript and TypeScript monorepos.", category: "Build Tools", tags: ["monorepo", "build", "performance"], website: "https://turbo.build", rating: 4.5, reviews: 1560, upvotes: 3800, launchDate: "2023-06-20", logo: "🔺" },
  { id: "4", name: "Drizzle ORM", description: "TypeScript ORM that's lightweight, performant, and feels like writing SQL.", category: "Database", tags: ["orm", "typescript", "database"], website: "https://orm.drizzle.team", rating: 4.7, reviews: 980, upvotes: 3100, launchDate: "2024-03-10", logo: "💧" },
  { id: "5", name: "Railway", description: "Deploy any app, database, or service in seconds with zero config.", category: "Deployment", tags: ["deployment", "cloud", "devops"], website: "https://railway.app", rating: 4.4, reviews: 1200, upvotes: 2900, launchDate: "2023-11-01", logo: "🚂" },
  { id: "6", name: "Hono", description: "Ultrafast web framework for the edge. Works on Cloudflare, Deno, Bun, and more.", category: "Frameworks", tags: ["framework", "edge", "typescript"], website: "https://hono.dev", rating: 4.6, reviews: 780, upvotes: 2500, launchDate: "2024-02-14", logo: "🔥" },
];

export const categories: Category[] = [
  { id: "1", name: "Web Development", icon: "🌐", count: 12450 },
  { id: "2", name: "Backend", icon: "⚙️", count: 8900 },
  { id: "3", name: "DevOps", icon: "🐳", count: 6200 },
  { id: "4", name: "AI Tools", icon: "🤖", count: 9800 },
  { id: "5", name: "Frameworks", icon: "🏗️", count: 7300 },
  { id: "6", name: "Open Source", icon: "📦", count: 5600 },
  { id: "7", name: "System Design", icon: "🏛️", count: 4100 },
  { id: "8", name: "New Tech", icon: "✨", count: 3400 },
  { id: "9", name: "Career Growth", icon: "📈", count: 2800 },
];

export const trendingTags = [
  { name: "react", count: "12.4k" },
  { name: "rust", count: "8.9k" },
  { name: "ai", count: "15.2k" },
  { name: "docker", count: "6.7k" },
  { name: "typescript", count: "11.1k" },
  { name: "golang", count: "5.3k" },
  { name: "kubernetes", count: "4.8k" },
  { name: "nextjs", count: "9.2k" },
];
