// Single source for /projects, /projects/[slug] and the home page's featured cards.
// Public site: no client names, no fundraising details, no internal addresses.

export type ProjectGroup = "Skillion" | "Client and freelance" | "Own projects"

export type ProjectFeature = { title: string; body: string }
export type StackRow = { label: string; items: string }

export type ProjectDetail = {
  role: string
  status?: string
  summary: string[]
  features: ProjectFeature[]
  stack: StackRow[]
}

export type Project = {
  slug: string
  name: string
  tagline: string
  group: ProjectGroup
  segment: string
  period: string
  tags: string[]
  highlights: string[]
  /** Short description for the featured cards on the home page */
  blurb?: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
  detail?: ProjectDetail
}

export const projectGroups: ProjectGroup[] = [
  "Skillion",
  "Client and freelance",
  "Own projects",
]

export const projects: Project[] = [
  {
    slug: "reconexa",
    name: "Reconexa",
    tagline: "AI invoice reconciliation for clinics",
    group: "Skillion",
    segment: "Healthcare billing",
    period: "10.2025 – present",
    tags: ["Next.js 16", "OpenAI", "BullMQ", "Prisma", "Playwright"],
    highlights: [
      "Turns insurer payment emails into paid invoices in Cliniko and Xero",
      "AI document reading, 68% to 97.5% extraction accuracy",
      "Automatic bank matching, including deposits that cover many invoices",
    ],
    featured: true,
    blurb:
      "Reads insurer and NDIS payment emails with AI and marks invoices paid in Cliniko and Xero, so clinic staff don't reconcile by hand. Live with two physiotherapy clinics; extraction accuracy raised from 68% to 97.5%.",
    detail: {
      role: "Sole developer at Skillion",
      status: "Live with two physiotherapy clinics",
      summary: [
        "Reconexa takes payment emails from insurers and NDIS plan managers and marks every invoice as paid in Cliniko and Xero, so clinic staff don't reconcile by hand. It reads each email and its attachments with AI, finds the matching invoice and bank deposit, and puts everything in one dashboard for staff to approve.",
        "I built the whole product: the dashboard, the background workers, the AI pipeline, the integrations, and the deployment.",
      ],
      features: [
        { title: "Email to paid, end to end", body: "Turns a payment email into a recorded payment in Cliniko and a matching entry in Xero, with staff approval in between." },
        { title: "AI document reading", body: "OCR and LLMs read emails and PDFs, including scanned ones. Model tuning raised extraction accuracy from 68% to 97.5%." },
        { title: "Automatic bank matching", body: "Matches each payment to its deposit in the bank feed, including deposits that cover many invoices at once." },
        { title: "Reliable payment recording", body: "Payments are confirmed against Cliniko before being marked done. Anything unclear is held for a person to review and raises an alert." },
        { title: "Multi-clinic", body: "Each clinic has its own setup and isolated data." },
        { title: "Security and audit trail", body: "Passkeys and two-step sign-in, a full activity log, and patient data kept out of error logs." },
      ],
      stack: [
        { label: "AI", items: "OpenAI API, OCR.space, AWS Textract" },
        { label: "Frontend", items: "Next.js 16, React 19, TypeScript, Tailwind, shadcn/ui, TanStack Query and Table" },
        { label: "Backend", items: "Bun, Elysia, Express, BullMQ, Better Auth" },
        { label: "Data", items: "PostgreSQL (Neon) with Prisma, Redis, Meilisearch" },
        { label: "Integrations", items: "Cliniko, Xero, Gmail and Outlook, Playwright" },
        { label: "Infra", items: "Docker, Dokploy on Hetzner, GitHub Actions, Doppler, Sentry, PostHog" },
        { label: "Testing", items: "Vitest (3,000+ tests), Playwright end-to-end" },
      ],
    },
  },
  {
    slug: "skillion-ai-labs",
    name: "Skillion AI Labs website",
    tagline: "AI diagnostic, chatbot and the Lara voice agent",
    group: "Skillion",
    segment: "AI services",
    period: "06.2026 – present",
    tags: ["Next.js 16", "Cloudflare Workers", "ElevenLabs", "Twilio"],
    highlights: [
      "Lara, a voice agent on the website and by phone",
      "AI maturity diagnostic with a personalised report",
      "Blog pages cut from 6.5 MB to 0.2 MB",
    ],
    liveUrl: "https://skillionailabs.com",
    featured: true,
    blurb:
      "Skillion's main site, where visitors try its AI products: a maturity diagnostic, a chat assistant and Lara, a voice agent on the web and by phone that emails call summaries and flags hot leads.",
    detail: {
      role: "Lead developer at Skillion",
      status: "Live",
      summary: [
        "skillionailabs.com is Skillion's main marketing site and the place visitors try the company's AI products: a diagnostic, a chat assistant and a voice agent.",
        "I built and run the site: the pages, the AI features, payments, analytics, performance and deployment, across about 195 merged pull requests. Content comes from a headless CMS, so the team publishes without a developer.",
      ],
      features: [
        { title: "AI maturity diagnostic", body: "A guided assessment that scores a business's AI readiness and produces a personalised report." },
        { title: "AI chat assistant", body: "A chatbot on the site that answers visitors' questions about Skillion's services." },
        { title: "Lara, the voice agent", body: "Visitors can talk to Lara on the website or by phone. After each call the team gets an email summary and promising leads are flagged." },
        { title: "Savings estimator", body: "An interactive calculator that shows a business where AI could save it time and money." },
        { title: "Video hub", body: "YouTube videos and Shorts synced from the CMS, with transcripts and search-friendly video data." },
        { title: "Privacy-first analytics", body: "Consent-managed tracking that respects opt-outs and browser privacy signals, plus ad conversion tracking." },
        { title: "Performance and cost", body: "Blog images went from 6.5 MB to 0.2 MB per page, CMS payloads shrank by 80%, and bot traffic that had used 38% of server CPU was cut out." },
        { title: "Code quality and SEO", body: "Code-quality issues brought from 206 to 0, plus structured data and llms.txt so search engines and AI assistants find the content." },
      ],
      stack: [
        { label: "AI", items: "OpenAI API through the Vercel AI SDK, ElevenLabs voice agents, Twilio" },
        { label: "Frontend", items: "Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui, Motion" },
        { label: "Backend", items: "Cloudflare Workers with OpenNext, Durable Objects" },
        { label: "Data", items: "Strapi CMS, Cloudflare R2" },
        { label: "Integrations", items: "Stripe, PostHog, GA4, Meta Conversions API, Cal.com, Fillout, Resend" },
        { label: "Infra", items: "GitHub Actions, Doppler, SonarQube" },
      ],
    },
  },
  {
    slug: "skillion-ai-labs-cms",
    name: "Skillion AI Labs CMS",
    tagline: "one CMS feeding two company sites",
    group: "Skillion",
    segment: "AI services",
    period: "06 – 10.2026",
    tags: ["Strapi 5", "Cloudflare R2", "YouTube API"],
    highlights: [
      "Content that would break the site is blocked before publishing",
      "AI-drafted video summaries with human review",
      "Publishing rebuilds the right website automatically",
    ],
  },
  {
    slug: "skillion-bikes",
    name: "Skillion Bikes website",
    tagline: "eight-page site for a cycling tech company",
    group: "Skillion",
    segment: "Cycling R&D",
    period: "07 – 08.2026",
    tags: ["Next.js 16", "OpenNext", "Strapi"],
    highlights: [
      "CMS-driven case studies, ordered by editors",
      "Publish-to-live rebuilds on Cloudflare",
      "Custom design and scroll motion",
    ],
  },
  {
    slug: "skillionx",
    name: "SkillionX",
    tagline: "AI paper-trading platform",
    group: "Skillion",
    segment: "Fintech",
    period: "10 – 12.2025",
    tags: ["Next.js 16", "Django", "FinBERT", "Celery"],
    highlights: [
      "AI trading signals, pre-computed by background jobs",
      "FinBERT news sentiment, cached to about 50 ms",
      "Chat agent with scoped, logged trading access",
    ],
  },
  {
    slug: "rfp-proposal-system",
    name: "RFP proposal system",
    tagline: "114 RFPs reviewed, 7 proposals sent",
    group: "Skillion",
    segment: "Procurement",
    period: "07 – 10.2026",
    tags: ["Astro", "Claude Code", "Cloudflare Access"],
    highlights: [
      "AI review of every RFP against the company's profile",
      "One-command Word and PDF proposal builds",
      "Private opportunity dashboard and submission tracking",
    ],
    detail: {
      role: "Sole developer at Skillion",
      summary: [
        "An internal system Skillion uses to find, review and bid on public-sector and nonprofit RFPs. An AI-assisted pipeline collects RFPs each month, has AI agents review every one against the company's capabilities, and turns the chosen ones into finished Word and PDF proposals. A private dashboard shows every opportunity, its requirements and deadlines, and how each submitted proposal is doing.",
        "I built both parts and ran the process. Over three months it handled 114 RFPs and produced 7 submitted proposals.",
      ],
      features: [
        { title: "Monthly RFP intake", body: "Leads from newsletters and lead sheets are collected into monthly batches, with the original documents stored, including scanned PDFs." },
        { title: "AI review of every RFP", body: "AI agents read each RFP in full, check its requirements (certifications, insurance, references, submission rules) against the company's profile, and grade it so the team knows which ones are worth bidding on." },
        { title: "Requirements evidence", body: "Open RFPs are checked for the proof they need, such as case studies or past performance, so the team can prepare it early." },
        { title: "Proposal workspaces", body: "Each RFP being pursued gets its own workspace for requirements, decisions, research, sections, pricing and reviews. An AI agent drafts sections with me, and I make the decisions." },
        { title: "One-command document builds", body: "A command-line tool assembles the sections into a branded Word document and PDF, then checks every page before submission." },
        { title: "Opportunity dashboard", body: "A private dashboard showing each RFP's summary, requirements, deadlines and grade, plus a deadline calendar." },
        { title: "Submission tracking", body: "Each submitted proposal's dates, follow-ups and milestones are tracked, and bad data fails the build." },
        { title: "Secure by default", body: "Access goes through Cloudflare Access, and every deploy is checked so no client names leak into what the browser downloads." },
      ],
      stack: [
        { label: "AI", items: "Claude Code and Codex agents for RFP review and proposal drafting" },
        { label: "Frontend", items: "Astro 7, React 19, Tailwind v4, shadcn/ui" },
        { label: "Backend", items: "Cloudflare Workers, a Node.js CLI for building documents" },
        { label: "Data", items: "Git-based records (JSON, Markdown, source PDFs)" },
        { label: "Integrations", items: "Pandoc, LibreOffice, Microsoft Word" },
        { label: "Infra", items: "Cloudflare Workers, Cloudflare Access, Wrangler, GitHub Actions" },
      ],
    },
  },
  {
    slug: "ai-research-pipeline",
    name: "AI research pipeline and CRM",
    tagline: "multi-model research agents with a CRM Claude can drive",
    group: "Skillion",
    segment: "Research tooling",
    period: "09 – 10.2026",
    tags: ["Claude", "DeepSeek", "Twenty CRM", "MCP"],
    highlights: [
      "Evidence-tested prompts, every answer traced to its sources",
      "Cost guard and automatic model switching",
      "Claude as the CRM interface over MCP",
    ],
    detail: {
      role: "Sole developer at Skillion",
      summary: [
        "The team needed to know which of more than 3,200 firms were worth contacting. I built a research pipeline where AI agents look each firm up on the web, rate how well it fits, and write full profiles for the best matches, with every answer saved alongside its sources.",
        "I then set up a self-hosted CRM for the outreach and connected it to Claude, so the team can log emails and follow-ups just by talking to it.",
      ],
      features: [
        { title: "AI research at scale", body: "Thousands of firms researched by AI agents running in parallel with live web search. Every prompt, source and answer is saved, so each result can be traced." },
        { title: "Evidence-tested prompts", body: "Each new prompt version was replayed against saved sources and known-good examples before use. Versions that broke a correct answer were rejected." },
        { title: "Multi-model and cost control", body: "Batches ran across Claude, DeepSeek and GPT models with automatic switching under quota limits, and a cost guard stops any run at a set budget." },
        { title: "Quality checks", body: "A second AI pass re-checked the top-rated firms and caught ones that had closed or merged. A hand audit of a random sample found 86% of fields fully correct and under 2% wrong." },
        { title: "Full profiles", body: "For the best matches, the pipeline crawled each firm's website and wrote a profile. Over 99% of quoted facts were traced back to the saved pages." },
        { title: "Team spreadsheet sync", body: "Results sync to the team's Google Sheet without overwriting the team's own edits." },
        { title: "Self-hosted CRM", body: "Twenty CRM on company infrastructure, with custom fields, separate pipelines, and all existing research and contacts imported." },
        { title: "Automated follow-ups", body: "Workflows update a firm's stage when outreach is logged, create follow-up tasks, flag overdue firms and handle handovers." },
        { title: "Claude as the CRM interface", body: "Team members connect Claude to the CRM with their own login. A custom skill lets them log messages, see what's due and hand off firms in plain English." },
      ],
      stack: [
        { label: "AI", items: "Claude (Haiku, Sonnet), DeepSeek and GPT models through OpenCode, Claude via MCP" },
        { label: "Backend", items: "Python and Node.js scripts" },
        { label: "Data", items: "PostgreSQL, Redis, JSON and CSV archives, Google Sheets" },
        { label: "Integrations", items: "Exa search API, Firecrawl, Twenty CRM (GraphQL, REST, MCP)" },
        { label: "Infra", items: "Dokploy, Docker Compose, SOPS" },
      ],
    },
  },
  {
    slug: "retro-fast",
    name: "retro-fast",
    tagline: "sprint retros straight from Jira, used every sprint",
    group: "Skillion",
    segment: "Internal tooling",
    period: "08 – 09.2026",
    tags: ["Astro", "Jira API", "Cloudflare Workers"],
    highlights: [
      "Pulls sprint goals and points straight from Jira",
      "One-click formatted retro email",
      "Plans the next sprint and writes it back to Jira",
    ],
  },
  {
    slug: "george",
    name: "George",
    tagline: "no-code object detection training",
    group: "Skillion",
    segment: "Computer vision",
    period: "11.2025",
    tags: ["YOLO", "Next.js", "MinIO", "RTX 4070"],
    highlights: [
      "Browser labelling tool for bounding boxes",
      "Queued YOLO training jobs with progress reporting",
      "In-house GPU training server",
    ],
  },
  {
    slug: "workspace-migration",
    name: "Google Workspace migration",
    tagline: "WorkMail to Google with no lost mail",
    group: "Skillion",
    segment: "IT operations",
    period: "08 – 10.2026",
    tags: ["imapsync", "Drive API", "SPF / DKIM / DMARC"],
    highlights: [
      "Verified mailbox migration and zero-downtime cutover",
      "Email authentication across every company domain",
      "Shared-drive move that kept original file links",
    ],
  },
  {
    slug: "payslip-generator",
    name: "Payslip generator",
    tagline: "Zoho-style payslip PDFs in the browser",
    group: "Skillion",
    segment: "HR / payroll",
    period: "02.2026",
    tags: ["Next.js 16", "react-pdf"],
    highlights: [
      "Payslip PDF in the Zoho Payroll layout",
      "Net pay printed in words",
      "No server: salary data never leaves the browser",
    ],
  },
  {
    slug: "video-review-platform",
    name: "Video review platform",
    tagline: "frame-accurate review for editors (stealth startup)",
    group: "Client and freelance",
    segment: "Media SaaS",
    period: "freelance",
    tags: ["Next.js 16", "Hono", "Socket.IO", "HLS"],
    highlights: [
      "Resumable chunked uploads",
      "Frame-accurate review player with pinned comments",
      "Real-time collaboration over WebSockets",
    ],
    detail: {
      role: "Full-stack engineer (part-time, freelance)",
      summary: [
        "A video review and approval platform for editors and their clients, similar to Frame.io. Editors upload cuts, clients leave comments pinned to exact frames, and teams manage versions, share links and approvals.",
        "I built the entire website: the frontend, the video player, real-time collaboration and the web app's backend work.",
      ],
      features: [
        { title: "Web app built from the ground up", body: "Rebuilt the whole web app on Next.js 16 and shadcn: auth, dashboard, projects and every review screen." },
        { title: "Resumable uploads", body: "Large video files upload in chunks and resume after a dropped connection." },
        { title: "Frame-accurate review player", body: "An HLS video player with comments and annotations pinned to exact frames and on-screen positions." },
        { title: "Real-time collaboration", body: "Comments and updates appear for everyone instantly over WebSockets." },
        { title: "Backend hardening", body: "A security and reliability pass that fixed 84 issues, ending with 721 tests passing." },
        { title: "Testing and dev environment", body: "Playwright end-to-end tests and a reproducible Nix dev setup." },
        { title: "Deployment", body: "Docker deployment through Dokploy with Traefik." },
      ],
      stack: [
        { label: "Frontend", items: "Next.js 16, React 19, TypeScript, shadcn/ui, TanStack Query, Zustand, hls.js" },
        { label: "Backend", items: "Bun, Hono, BetterAuth, BullMQ, Socket.IO" },
        { label: "Data", items: "PostgreSQL with Prisma, Redis, Cloudflare R2" },
        { label: "Infra", items: "Docker, Dokploy, Traefik, Nix, GitHub Actions" },
      ],
    },
  },
  {
    slug: "the-joy-junction",
    name: "The Joy Junction",
    tagline: "e-commerce store for a toy brand",
    group: "Client and freelance",
    segment: "E-commerce",
    period: "05 – 12.2025",
    tags: ["MedusaJS 2", "Next.js 15", "Algolia", "Razorpay"],
    highlights: [
      "Algolia search under 200 ms",
      "40% lower average API latency with Redis",
      "Webhook-driven Razorpay payments, 99.9% reliable",
    ],
  },
  {
    slug: "printsaathi",
    name: "PrintSaathi",
    tagline: "backend for a printing marketplace",
    group: "Client and freelance",
    segment: "E-commerce",
    period: "02 – 04.2025",
    tags: ["Express", "Prisma", "BullMQ", "Redis"],
    highlights: [
      "70% lower API latency with caching and query tuning",
      "10,000+ queued tasks and emails a day",
      "Coupon system, product search and rate limiting",
    ],
  },
  {
    slug: "drive-challenge",
    name: "Drive Challenge",
    tagline: "3D driving game for an event stand",
    group: "Client and freelance",
    segment: "Events",
    period: "10.2026",
    tags: ["Three.js", "React Three Fiber", "SQLite"],
    highlights: [
      "Three timed 3D driving stages",
      "Lead capture with CSV and JSON export",
      "Fully offline kiosk that survives restarts",
    ],
  },
  {
    slug: "soundprint",
    name: "SoundPrint",
    tagline: "1st place at LPU, Hack the Block 2025",
    group: "Own projects",
    segment: "Web3 / music",
    period: "03 – 04.2025",
    tags: ["React", "Rust", "Internet Computer", "Spotify API"],
    highlights: [
      "Unique taste fingerprint from Spotify",
      "Generative art minted on-chain",
      "Sound neighbours: matching people who listen alike",
    ],
    featured: true,
    blurb:
      "Turns your Spotify taste into one-of-a-kind generative art minted on the Internet Computer, and matches you with people who listen alike. Won 1st place at LPU in Hack the Block 2025.",
    detail: {
      role: "Team of 4, I built the on-chain side",
      status: "1st place at LPU, Hack the Block 2025 (Crewsphere ICP Hub India)",
      summary: [
        "SoundPrint started as a way to find your \"sound neighbours\", people whose music taste is close to yours. Every listener gets a unique fingerprint from their Spotify history, and similar fingerprints connect you to people who listen like you. The team built that matching as a separate Python service.",
        "For the Web3 hackathon we focused on owning the fingerprint: the app turns your taste into a one-of-a-kind generative artwork and mints it as an NFT on the Internet Computer. We built it in four days and won first place at our university. I built the blockchain side: login, minting, the fingerprint-to-art link, and deploying the whole app to the Internet Computer mainnet, where it's still live.",
      ],
      features: [
        { title: "Taste fingerprint", body: "Your Spotify genres are hashed into a fingerprint. The same taste always gives the same result, so each artwork belongs to one listener." },
        { title: "Generative art", body: "The fingerprint seeds an animated 3D landscape drawn with p5.js, which you can download as an image." },
        { title: "NFT minting", body: "Each artwork is minted and stored on-chain, and a taste that's already minted can't be minted again." },
        { title: "Passwordless login", body: "Internet Identity handles sign-in, with no passwords or wallet setup." },
        { title: "Fully on-chain hosting", body: "Both the frontend and the NFT backend run as canisters on the Internet Computer mainnet." },
        { title: "Sound neighbours", body: "A Python service that imports a listener's Spotify history and matches them with people who have similar taste." },
      ],
      stack: [
        { label: "Frontend", items: "React 19, TypeScript, Vite, Tailwind, React Router, p5.js, Motion" },
        { label: "Blockchain", items: "Internet Computer canisters, Rust NFT canister, Internet Identity, DFINITY SDK" },
        { label: "Integrations", items: "Spotify Web API, Web Crypto (SHA-256)" },
        { label: "Matching", items: "Python" },
      ],
    },
  },
  {
    slug: "mini-marketing-crm",
    name: "Mini marketing CRM",
    tagline: "Gemini turns plain English into audiences",
    group: "Own projects",
    segment: "Marketing tech",
    period: "05.2025",
    tags: ["Next.js", "Gemini", "BullMQ", "Docker"],
    highlights: [
      "AI segment builder and message suggestions",
      "Queued bulk ingestion and campaign engine",
      "Delivery tracking per campaign and customer",
    ],
  },
  {
    slug: "cooper-macos",
    name: "Cooper for macOS",
    tagline: "native capture panel in Swift",
    group: "Own projects",
    segment: "Productivity",
    period: "08 – 09.2026",
    tags: ["Swift", "SwiftUI", "AppKit"],
    highlights: [
      "System-wide double-Shift capture",
      "Safe data migration from the original app",
      "About 9,100 lines and 24 test files, no dependencies",
    ],
  },
  {
    slug: "video-transcoding-pipeline",
    name: "Video transcoding pipeline",
    tagline: "60% cheaper than ECS",
    group: "Own projects",
    segment: "Media infra",
    period: "11.2024 – 01.2025",
    tags: ["AWS SQS", "EC2", "ECS", "FFmpeg"],
    highlights: [
      "Upload-triggered processing through SQS",
      "Jobs on ECS Fargate or the worker's own EC2 host",
      "GPU batch compression scripts",
    ],
    repoUrl: "https://github.com/unlux/video-transcoding-pipeline",
    detail: {
      role: "Built with one collaborator (15 of 16 commits mine)",
      summary: [
        "An event-driven video transcoding service on AWS. When a video is uploaded to S3, a message lands in a queue, a worker picks it up and starts a container that transcodes the video with FFmpeg and writes the result to an output bucket.",
        "I designed it for cost: the first version launched each job on ECS Fargate, and the second runs the container directly on the EC2 host that reads the queue, which cut infrastructure spend by 60% compared with ECS.",
      ],
      features: [
        { title: "Upload-triggered processing", body: "S3 upload events flow into SQS, and a worker picks up one job at a time, skipping S3's setup test events." },
        { title: "Two ways to run jobs", body: "Each job can run as an ECS Fargate task or as a Docker container on the worker's own EC2 host. The EC2 option is the cheaper default." },
        { title: "FFmpeg transcoder container", body: "It downloads the source video, transcodes it to H.264 and AAC, uploads the result, and cleans up after itself." },
        { title: "Automated image builds", body: "GitHub Actions builds the transcoder image on every push, publishes it to the container registry, and verifies the push." },
        { title: "GPU batch compression", body: "Scripts compress whole folders of videos on an NVIDIA GPU (HEVC NVENC), keeping original timestamps and metadata." },
      ],
      stack: [
        { label: "Backend", items: "TypeScript on Bun (worker), Node.js (transcoder), FFmpeg, fluent-ffmpeg, dockerode" },
        { label: "Cloud", items: "AWS SQS, S3, EC2, ECS Fargate, ECR, AWS SDK v3" },
        { label: "Infra", items: "Docker, Docker Hub, GitHub Actions" },
        { label: "Other", items: "Bash, NVIDIA NVENC" },
      ],
    },
  },
  {
    slug: "s3-upload-tool",
    name: "S3 upload tool",
    tagline: "v1 server-backed, v2 browser-only",
    group: "Own projects",
    segment: "Cloud storage",
    period: "09.2024 – 07.2025",
    tags: ["Next.js", "AWS SDK v3", "S3"],
    highlights: [
      "Presigned uploads with per-user history (v1)",
      "Browser-only signing, keys never leave the device (v2)",
      "Live progress, speed and cancel",
    ],
    liveUrl: "https://object-easy.vercel.app",
    repoUrl: "https://github.com/unlux/ObjectEasy",
  },
  {
    slug: "helpdesk-mini",
    name: "HelpDesk Mini",
    tagline: "SLA-aware ticketing built in 27 hours",
    group: "Own projects",
    segment: "B2B SaaS",
    period: "10.2025",
    tags: ["Next.js 15", "Prisma", "Playwright"],
    highlights: [
      "SLA deadlines with breach flags",
      "Conflict detection on concurrent edits",
      "Duplicate-safe ticket creation and rate limiting",
    ],
    liveUrl: "https://sl-aware.vercel.app",
    repoUrl: "https://github.com/unlux/sl-aware",
  },
  {
    slug: "habit-tracker",
    name: "Smart-home habit tracker",
    tagline: "NFC taps and an LLM chat log daily habits",
    group: "Own projects",
    segment: "Smart home",
    period: "03 – 07.2026",
    tags: ["Home Assistant", "Python", "Grafana"],
    highlights: [
      "Tap-to-log with NFC tags",
      "Event-based streaks with a test suite",
      "Chat logging through Home Assistant's AI assistant",
    ],
  },
  {
    slug: "self-hosted-infrastructure",
    name: "Self-hosted infrastructure",
    tagline: "private-network fleet and a NixOS flake",
    group: "Own projects",
    segment: "DevOps",
    period: "2024 – present",
    tags: ["Tailscale", "Dokploy", "NixOS"],
    highlights: [
      "Health alerts on Telegram every 5 minutes",
      "Encrypted secrets in Git with SOPS",
      "One NixOS flake builds every machine",
    ],
  },
]

export const smallerProjects = [
  "Gaming parlour session timer",
  "Jyoti Automobiles backend",
  "Question bank search",
  "NSA Khatabook",
  "Shorts Lock",
  "MindFuel Breathing",
  "Passphrage",
  "Widget Sync",
  "UI component registry",
  "Open-source PRs (EnvSync, Juspay, Cloudflare workerd)",
  "Bluetooth security assessment",
]

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug)

export const projectsWithDetail = () =>
  projects.filter((project) => project.detail)
