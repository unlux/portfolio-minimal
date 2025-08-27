## Portfolio Minimal (Next.js 15 + React 19)

A minimal, fast personal portfolio with a built-in MDX blog, SEO-ready routes (OG images, RSS, sitemap, robots), optional authentication, and tasteful animations.

### Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **React 19**
- **Tailwind CSS v4**
- **MDX** for blog content
- **Vercel Analytics** and **Speed Insights**
- **Clerk** (optional auth; auto-disabled if no env set)
- **Radix UI** primitives, **Framer Motion**, **Lenis** scrolling, **Geist** fonts

### Features

- **MDX Blog**: drop `.mdx` files with frontmatter into `app/blog/posts`
- **SEO**: dynamic metadata, Open Graph images at `/og`, JSON-LD per post
- **Syndication**: **RSS** at `/rss` and **sitemap** at `/sitemap.xml`, **robots** at `/robots.txt`
- **Optional Auth**: sign-in/up routes included; middleware becomes a no-op without Clerk keys
- **Performance**: Turbopack dev, optimized fonts, small footprint

## Getting started

### Prerequisites

- Node.js 18+

### Install

Use your preferred package manager:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### Develop

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Build & run

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Environment variables (optional auth)

If you want to enable Clerk authentication, copy `.env.example` to `.env.local` and fill the values:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

- If these are not set, middleware and providers automatically no-op and the app works without auth.

## Content authoring (Blog)

- Add posts to `app/blog/posts` as `.mdx` files. The slug is the filename.
- Supported frontmatter keys: `title`, `publishedAt` (YYYY-MM-DD), `summary`, `image` (absolute URL or local path).

Frontmatter example:

```md
---
title: "Redis to the rescue"
publishedAt: "2024-07-21"
summary: "How I used Redis to fix a tricky bottleneck."
image: "/some/local/og.jpg"
---

Your MDX content here…
```

What happens automatically:

- `/blog` lists posts; `/blog/[slug]` renders a post
- `/rss` exposes an RSS feed sorted by `publishedAt`
- `/sitemap.xml` includes the homepage, blog index, and all posts
- `/og?title=...` generates a social card (or use frontmatter `image`)

## Configuration

- Update your site URL in `app/sitemap.ts` by changing `baseUrl`.
- Global metadata and fonts live in `app/layout.tsx`.
- Robots and sitemap are generated from `app/robots.ts` and `app/sitemap.ts`.
- Open Graph image route: `app/og/route.tsx` (customize styles as needed).
- Middleware for auth: `middleware.ts` (acts as no-op without Clerk env set).

## Project structure

```text
app/
  blog/
    posts/                # Your .mdx posts
    [slug]/page.tsx       # Blog post page (+metadata/params)
    page.tsx              # Blog index
  og/route.tsx            # Dynamic Open Graph image
  rss/route.ts            # RSS feed
  robots.ts               # robots.txt
  sitemap.ts              # sitemap.xml
  layout.tsx              # Root layout, fonts, providers
  page.tsx                # Home page
components/               # UI components (nav, footer, mdx, animations, etc.)
```

## Deployment

- Recommended: deploy to Vercel.
- Set environment variables (if using Clerk) in your hosting provider.
- Ensure `baseUrl` in `app/sitemap.ts` matches your production domain.

## Scripts

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Notes

- TypeScript and ESLint errors are configured to be ignored during production builds in `next.config.ts`. Adjust to your preference for stricter CI.
