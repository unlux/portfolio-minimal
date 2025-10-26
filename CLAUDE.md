# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Starts the Next.js development server with Turbopack at `http://localhost:3000`.

### Building for Production
```bash
npm run build
```
Runs Prisma migrations (`prisma migrate deploy`), then builds the Next.js application.

### Production Server
```bash
npm start
```
Starts the production server (must run `npm run build` first).

### Linting
```bash
npm run lint
```
Runs Next.js ESLint. Note: TypeScript and ESLint errors are ignored during production builds per `next.config.ts`.

### Database Commands
```bash
npx prisma generate        # Generate Prisma client
npx prisma migrate dev     # Create and apply migrations
npx prisma migrate deploy  # Apply migrations in production
npx prisma studio          # Open Prisma Studio GUI
```

## Architecture Overview

### Tech Stack
- **Next.js 15** with App Router and **React 19**
- **TypeScript** with path alias `@/*` pointing to project root
- **Tailwind CSS v4** for styling
- **Prisma ORM** with PostgreSQL (custom output: `lib/generated/prisma`)
- **Clerk** for authentication (optional, auto-disabled without env vars)
- **MDX** for blog content
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations
- **Lenis** for smooth scrolling

### Key Design Patterns

#### Optional Authentication
The app gracefully handles missing Clerk credentials:
- `middleware.ts`: Returns no-op function when Clerk env vars are missing
- `app/layout.tsx`: Conditionally wraps app in `ClerkProvider` only if `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` exists

#### Prisma Client Setup
Prisma client is generated to a custom location (`lib/generated/prisma`) and imported via `lib/prisma.ts`, which implements singleton pattern for development hot-reloading.

#### MDX Blog System
- Blog posts live in `app/blog/posts/*.mdx`
- `app/blog/utils.ts` provides utilities: `getBlogPosts()`, `parseFrontmatter()`, `formatDate()`
- Frontmatter schema: `title`, `publishedAt` (YYYY-MM-DD), `summary`, `image` (optional)
- Slug is derived from filename
- Dynamic routes at `/blog/[slug]`

#### Password-Protected Sections
The app implements custom password protection (separate from Clerk):
- Contacts page (`/private/contacts`) requires session-based password verification
- Photo albums can be individually password-protected via database field
- Verification endpoints at `/api/contacts/verify` and album password check flows

### Directory Structure

```
app/
  api/                      # API routes
    contacts/               # CRUD for contacts (Prisma)
    albums/                 # CRUD for photo albums (Prisma)
    login/                  # Custom login for private sections
  blog/
    posts/                  # MDX blog posts
    [slug]/page.tsx         # Dynamic blog post renderer
    page.tsx                # Blog listing
    utils.ts                # Blog utilities (parseFrontmatter, getBlogPosts)
  private/                  # Password-protected sections
    contacts/               # Contact management with verification
    albums/                 # Photo album management
    login/                  # Login page for private sections
  sign-in/                  # Clerk sign-in (optional)
  sign-up/                  # Clerk sign-up (optional)
  og/route.tsx              # Dynamic OG image generation
  rss/route.ts              # RSS feed generation
  robots.ts                 # robots.txt generator
  sitemap.ts                # sitemap.xml generator
  layout.tsx                # Root layout (fonts, metadata, providers)
  page.tsx                  # Homepage

components/
  animation/                # Animation wrappers (FadeIn, AutoAnimate)
  ui/                       # Radix UI components (button, card, dialog, etc.)
  nav.tsx                   # Navigation component
  footer.tsx                # Footer component
  mdx.tsx                   # MDX component mappings
  LenisProvider.tsx         # Smooth scroll provider

lib/
  prisma.ts                 # Prisma client singleton
  utils.ts                  # Utility functions (likely cn() for classnames)
  generated/prisma/         # Generated Prisma client

prisma/
  schema.prisma             # Database schema (PhotoAlbum, Contact models)
  migrations/               # Database migrations
```

### Component Patterns

#### Server/Client Component Split
- Page routes are server components by default
- Client components use `"use client"` directive (e.g., `ContactsClientPage.tsx`)
- Password verification and interactive features are handled in client components
- Server components handle data fetching and pass props to client components

#### Animation Components
- `FadeIn`: Wrapper for fade-in animations with optional delay
- `AutoAnimate`: Uses `@formkit/auto-animate` for list transitions
- Components in `components/animation/` wrap Framer Motion patterns

### Database Schema (Prisma)

**PhotoAlbum**
- `id`, `name`, `url` (unique), `password` (nullable), `isProtected` (boolean), timestamps

**Contact**
- `id`, `name`, `phone`, `notes` (nullable), timestamps

### SEO & Metadata
- Base URL configured in `app/sitemap.ts` (update `baseUrl` for production)
- Dynamic metadata per route using Next.js 15 metadata API
- OG image generation at `/og?title=...`
- RSS feed at `/rss` (auto-generated from blog posts)
- Sitemap includes homepage, blog index, and all blog posts
- JSON-LD structured data per blog post

### Environment Variables

**Required for Clerk (optional)**:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

**Required for Prisma**:
```
DATABASE_URL=postgresql://...
```

## Important Notes

- Build script runs `prisma migrate deploy` before `next build` - migrations are auto-applied
- `postinstall` script runs `prisma generate` to ensure client is generated after npm install
- Path imports use `@/` alias (points to project root)
- TypeScript errors are ignored in production builds (`ignoreBuildErrors: true`)
- The app is designed to work without Clerk - middleware becomes a no-op if credentials are missing
- Custom Prisma client output location: `lib/generated/prisma` (not default `node_modules`)
