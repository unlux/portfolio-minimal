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
Builds the Next.js application (`next build`). Use `npm run build:deploy` to run `prisma migrate deploy` first.

### Production Server
```bash
npm start
```
Starts the production server (must run `npm run build` first).

### Linting & Typechecking
```bash
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
```
CI (`.github/workflows/ci.yml`) runs typecheck + lint + build on push/PR to main.

### Database Commands
```bash
npx prisma generate        # Generate Prisma client
npx prisma migrate dev     # Create and apply migrations
npx prisma migrate deploy  # Apply migrations in production
npx prisma studio          # Open Prisma Studio GUI
```

## Architecture Overview

### Tech Stack
- **Next.js 16** with App Router and **React 19**
- **TypeScript** with path alias `@/*` pointing to project root
- **Tailwind CSS v4** for styling
- **Prisma ORM** with PostgreSQL (`@prisma/client`)
- **Clerk** for authentication (optional, auto-disabled without env vars)
- **MDX** for blog content
- **Radix UI** primitives for accessible components (shadcn new-york style, `components.json`)
- **Motion** (`motion/react`) for animations; framer-motion was removed, never reintroduce it (same library, duplicate bundle)
- **next-themes** for light/dark (class-based, dark default) with a View Transitions circle-blur toggle effect
- **Lenis** for smooth scrolling
- Several components come from **Chanh Dai's registry** (`npx shadcn@latest add "https://chanhdai.com/r/<name>.json"`): work-experience, toc-minimap, shimmering-text, scroll-fade utilities, theme-toggle-effect

### Key Design Patterns

#### Optional Authentication
The app gracefully handles missing Clerk credentials:
- `middleware.ts`: Returns no-op function when Clerk env vars are missing
- `app/layout.tsx`: Conditionally wraps app in `ClerkProvider` only if `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` exists

#### Prisma Client Setup
Prisma client is generated through `@prisma/client` and imported via `lib/prisma.ts`, which implements a singleton pattern for development hot-reloading.

#### MDX Blog System
- Blog posts live in `app/blog/posts/*.mdx`
- `app/blog/utils.ts` provides utilities: `getBlogPosts()`, `parseFrontmatter()`, `formatDate()`
- Frontmatter schema: `title`, `publishedAt` (YYYY-MM-DD), `summary`, `image` (optional)
- Slug is derived from filename
- Dynamic routes at `/blog/[slug]`

#### Password-Protected Sections
The app implements custom password protection (separate from Clerk), centered on `lib/private-auth.ts`:
- `POST /api/contacts/verify` checks `CONTACTS_PASSWORD` (constant-time) and sets a `private_session` cookie containing an HMAC-derived token, never the raw password. Rotating the env var invalidates sessions.
- All mutating routes (`POST /api/contacts`, `DELETE /api/contacts/[id]`, `POST /api/albums`) require that session via `isAuthorized()`.
- Password endpoints are rate-limited in-memory (fine for single-instance deploys; revisit if horizontally scaled).
- Photo albums can be individually password-protected via database field (plaintext in DB; album unlock at `POST /api/albums/[id]` is public but rate-limited).

#### Theme System
- `ThemeProvider` (next-themes) in `app/layout.tsx`: `attribute="class"`, `defaultTheme="dark"`, system enabled.
- Toggle is `components/theme-toggle.tsx`, a single sun/moon button wrapping `setTheme` in `document.startViewTransition` for the circle-blur effect (CSS in `global.css` `@layer base`). The user explicitly rejected a 3-button segmented switcher.
- `ThemeColorSync` keeps `<meta name="theme-color">` in step with the toggle.
- Code blocks (blog + notion) intentionally stay DARK in both themes; sugar-high vars are fixed to the dark palette.

#### LCP Rule
Above-the-fold homepage content (hero words, intro) animates via CSS keyframes (`.hero-word`, `.animate-fade-up` in `global.css`), NOT motion variants with `initial="hidden"`, which leave content invisible until hydration and wreck LCP. Keep it that way.

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
  animation/                # Reveal (scroll reveal) + BlogPostsClient (list w/ hover backdrop)
  ui/                       # Radix/shadcn components + IconTooltip, ClickSpark, InteractiveLink
  nav.tsx                   # Navigation (scroll-fade link row, theme toggle pinned right)
  footer.tsx                # Footer (social icons w/ tooltips, email, CV popover menu)
  mdx.tsx                   # MDX component mappings (exports slugify used by the blog TOC)
  work-experience.tsx       # Chanh Dai canonical (structured periods, auto duration, skills)
  toc-minimap.tsx           # Hoverable TOC minimap on blog posts (lg+)
  theme-toggle.tsx          # Sun/moon toggle w/ view-transition effect
  theme-provider.tsx        # next-themes wrapper
  theme-color-sync.tsx      # Syncs meta theme-color with the active theme
  LenisProvider.tsx         # Smooth scroll provider

hooks/
  use-sound.ts              # soundcn hook (toc-minimap open sound)

lib/
  prisma.ts                 # Prisma client singleton
  private-auth.ts           # Session tokens, password verify, rate limiting for /private
  sound-engine.ts, sound-types.ts, u-mini-map-open.ts  # soundcn assets
  utils.ts                  # cn() classname helper

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
- `Reveal` (`components/animation/Reveal.tsx`): scroll-triggered reveal wrapper, respects reduced motion
- All animation imports use `motion/react`
- Blog list hover backdrop is ONE persistent element that springs between rows (a shared-layoutId crossfade flickers mid-transition, don't regress)

### Database Schema (Prisma)

**PhotoAlbum**
- `id`, `name`, `url` (unique), `password` (nullable), `isProtected` (boolean), timestamps

**Contact**
- `id`, `name`, `phone`, `notes` (nullable), timestamps

### SEO & Metadata
- Base URL configured in `app/sitemap.ts` (update `baseUrl` for production)
- Dynamic metadata per route using the Next.js metadata API
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

- `npm run build` is plain `next build`; `npm run build:deploy` also applies Prisma migrations
- `postinstall` script runs `prisma generate` to ensure client is generated after npm install
- Content rule: NEVER name or link Skillion's websites in portfolio copy; describe that work generically
- PostHog initializes in `instrumentation-client.ts` only when `NEXT_PUBLIC_POSTHOG_KEY`/`HOST` are set
- Path imports use `@/` alias (points to project root)
- The app is designed to work without Clerk - middleware becomes a no-op if credentials are missing
- Prisma Client is generated into the default `@prisma/client` package location.
