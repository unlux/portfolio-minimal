# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Next.js 16** with App Router and **React 19.2**
- **TypeScript** with path alias `@/*` pointing to project root
- **Tailwind CSS v4** for styling with shadcn/ui components
- **Prisma ORM** with PostgreSQL (custom output: `lib/generated/prisma`)
- **Clerk** for authentication (optional, auto-disabled without env vars)
- **MDX** for blog content via `next-mdx-remote`
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations
- **Lenis** for smooth scrolling
- **PostHog** for analytics (optional)
- **Vercel Analytics** and **Speed Insights**
- **Lanyard** for Discord real-time presence
- **Notion** integration via `react-notion-x`

### Key Design Patterns

#### Optional Authentication
The app gracefully handles missing Clerk credentials:
- `middleware.ts`: Returns no-op function when Clerk env vars are missing
- `app/layout.tsx`: Conditionally wraps app in `ClerkProvider` only if `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` exists
- Navbar adapts UI based on Clerk availability

#### Prisma Client Setup
Prisma client is generated to a custom location (`lib/generated/prisma`) and imported via `lib/prisma.ts`, which implements singleton pattern for development hot-reloading.

#### MDX Blog System
- Blog posts live in `app/blog/posts/*.mdx`
- `app/blog/utils.ts` provides utilities: `getBlogPosts()`, `parseFrontmatter()`, `formatDate()`
- Frontmatter schema: `title`, `publishedAt` (YYYY-MM-DD), `summary`, `image` (optional)
- Slug is derived from filename
- Dynamic routes at `/blog/[slug]`
- Syntax highlighting via `sugar-high`
- Styled with Tailwind Typography plugin

#### Password-Protected Sections
The app implements custom password protection (separate from Clerk):
- Contacts page (`/private/contacts`) requires session-based password verification
- Photo albums can be individually password-protected via database field
- Verification endpoints at `/api/contacts/verify` and album password check flows
- Session-based authentication using Next.js cookies

#### Animation System
Comprehensive animation library based on industry standards:
- Pre-built animation presets in `lib/animation-presets.ts`
- Easing curves from Apple HIG and Material Design
- Scroll-triggered animations via hooks in `lib/hooks/useScrollAnimation.ts`
- Reusable animation components in `components/animation/`
- See `ANIMATIONS.md` for complete documentation

#### Smooth Scrolling with Lenis
- Global smooth scroll via `LenisProvider.tsx`
- Auto-scrolling for hash links with 80px offset
- Mobile optimizations (native touch scrolling)
- Programmatic control via `useLenis()` hook
- See `LENIS_USAGE.md` for complete documentation

#### API Utilities
Standardized API error handling and validation:
- `lib/api-utils.ts` provides error response creators
- Consistent error types: VALIDATION, NOT_FOUND, UNAUTHORIZED, INTERNAL, DATABASE
- Helper functions: `validateRequiredFields()`, `parseIntId()`, `handleApiError()`
- Used across all API routes for consistent error responses

### Directory Structure

```
app/
  api/                      # API routes
    contacts/               # CRUD for contacts (Prisma)
      [id]/route.ts         # Individual contact operations
      verify/route.ts       # Password verification
      route.ts              # List/create contacts
    albums/                 # CRUD for photo albums (Prisma)
      [id]/route.ts         # Individual album operations
      route.ts              # List/create albums
    login/route.ts          # Custom login for private sections
  blog/
    posts/                  # MDX blog posts
      Git-squash-vs.mdx
      Redis-to-the-rescue.mdx
      Rooting-my-life.mdx
    [slug]/page.tsx         # Dynamic blog post renderer
    page.tsx                # Blog listing
    utils.ts                # Blog utilities (parseFrontmatter, getBlogPosts)
  private/                  # Password-protected sections
    contacts/               # Contact management
      ContactsClientPage.tsx
      page.tsx
    albums/                 # Photo album management
      [id]/page.tsx
      page.tsx
    page.tsx                # Private section index
  sign-in/                  # Clerk sign-in (optional)
    [[...sign-in]]/page.tsx
  sign-up/                  # Clerk sign-up (optional)
    [[...sign-up]]/page.tsx
  currently-reading/        # Currently reading page
    page.tsx
  todo/                     # Todo list page
    page.tsx
  gotcha/                   # Easter egg/hidden page
    page.tsx
  og/route.tsx              # Dynamic OG image generation
  rss/route.ts              # RSS feed generation
  robots.ts                 # robots.txt generator
  sitemap.ts                # sitemap.xml generator
  lib/fonts.tsx             # Font configurations
  layout.tsx                # Root layout (fonts, metadata, providers)
  global.css                # Global styles with Tailwind v4
  page.tsx                  # Homepage
  not-found.tsx             # 404 page

components/
  animation/                # Animation components
    AnimatedCard.tsx        # Card with hover effects
    AnimatedLink.tsx        # Link with animated underline
    BlogPostsClient.tsx     # Blog posts with animations
    Counter.tsx             # Animated number counter
    MagneticButton.tsx      # Magnetic hover effect
    Parallax.tsx            # Parallax scroll effects
    Reveal.tsx              # Scroll-triggered reveal
    ShimmerButton.tsx       # Shimmer effect button
  ui/                       # shadcn/ui Radix components
    alert-dialog.tsx
    ArrowIcon.tsx
    breadcrumb.tsx
    button.tsx
    card.tsx
    ClickSpark.tsx          # Click effect component
    collapsible.tsx
    dialog.tsx
    input.tsx
    InteractiveLink.tsx
    label.tsx
    loading-skeleton.tsx
    popover.tsx
    separator.tsx
  AddAlbumDialog.tsx        # Dialog for adding albums
  AddContactDialog.tsx      # Dialog for adding contacts
  AlbumPasswordDialog.tsx   # Password input for albums
  AlbumsGrid.tsx            # Grid display for albums
  AnimatedTitle.tsx         # Animated page title
  CodeBlock.tsx             # Code syntax highlighting
  CopyToClipboard.tsx       # Copy button component
  footer.tsx                # Site footer
  LanyardRPC.tsx            # Discord presence component
  LenisProvider.tsx         # Smooth scroll provider
  mdx.tsx                   # MDX component mappings
  nav.tsx                   # Navigation component
  NotionRenderer.tsx        # Notion page renderer
  posts.tsx                 # Blog posts listing
  work-experience.tsx       # Work experience component

lib/
  animation-presets.ts      # Framer Motion animation variants
  api-utils.ts              # API error handling utilities
  prisma.ts                 # Prisma client singleton
  utils.ts                  # Utility functions (cn() for classnames)
  hooks/
    useLanyard.ts           # Discord Lanyard WebSocket hook
    useScrollAnimation.ts   # Scroll animation hooks
  generated/prisma/         # Generated Prisma client

prisma/
  schema.prisma             # Database schema (PhotoAlbum, Contact models)
  migrations/               # Database migrations

Root Files:
  middleware.ts             # Clerk middleware (optional)
  instrumentation-client.ts # PostHog analytics initialization
  components.json           # shadcn/ui configuration
  next.config.ts            # Next.js configuration
  postcss.config.mjs        # PostCSS configuration
  tsconfig.json             # TypeScript configuration
  .eslintrc.json            # ESLint configuration
  ANIMATIONS.md             # Animation system documentation
  LENIS_USAGE.md            # Smooth scroll documentation
  future-todo.md            # Future feature ideas
  flake.nix                 # Nix development environment
```

### Component Patterns

#### Server/Client Component Split
- Page routes are server components by default
- Client components use `"use client"` directive (e.g., `ContactsClientPage.tsx`)
- Password verification and interactive features are handled in client components
- Server components handle data fetching and pass props to client components

#### Animation Components
- `Reveal`: Scroll-triggered reveal animations with multiple presets
- `Parallax`: Parallax scroll effects with configurable speed
- `Counter`: Animated number counter with formatting options
- `MagneticButton`: Buttons with magnetic hover effect
- `AnimatedCard`: Cards with lift, scale, or glow hover effects
- `AnimatedLink`: Links with animated underlines
- `ShimmerButton`: Buttons with shimmer effect on hover

#### UI Components (shadcn/ui)
All UI components follow shadcn/ui conventions:
- Based on Radix UI primitives
- Styled with Tailwind CSS
- Customizable via `components.json`
- Using "new-york" style preset
- CSS variables for theming
- Located in `components/ui/`

### Database Schema (Prisma)

**PhotoAlbum**
```prisma
model PhotoAlbum {
  id          Int      @id @default(autoincrement())
  name        String
  url         String   @unique
  password    String?
  isProtected Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Contact**
```prisma
model Contact {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Styling & Design System

#### Tailwind CSS v4
- Using Tailwind CSS v4 (latest version)
- Configuration in `app/global.css` using `@theme inline`
- Custom color system using OKLCH color space
- Dark mode via `.dark` class
- CSS variables for dynamic theming
- Typography plugin for prose styles

#### Color System
Colors defined as CSS variables in OKLCH format:
- `--background`, `--foreground`
- `--primary`, `--secondary`, `--muted`, `--accent`
- `--destructive`, `--border`, `--input`, `--ring`
- Chart colors: `--chart-1` through `--chart-5`
- Sidebar-specific colors
- Automatic dark mode variants

#### Fonts
Multiple font families loaded:
- **Geist Sans** - Primary sans-serif font
- **Geist Mono** - Monospace font for code
- **Inter** - Additional sans-serif font
- Configured in `app/lib/fonts.tsx`
- Applied via CSS variables in `layout.tsx`

#### Code Highlighting
- Syntax highlighting via `sugar-high` (lightweight)
- Prism themes for Notion content (`prism-tomorrow.css`)
- Custom code block styling in `global.css`
- `.prose` styles for MDX content

### Third-Party Integrations

#### Vercel Analytics & Speed Insights
Integrated in `app/layout.tsx`:
```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
```

#### PostHog Analytics (Optional)
- Client-side initialization in `instrumentation-client.ts`
- Requires `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`
- Gracefully handles missing credentials

#### Lanyard (Discord Presence)
- Real-time Discord presence via WebSocket
- Custom hook: `useLanyard(userId)`
- Returns: Discord status, activities, Spotify data
- Component: `LanyardRPC.tsx`
- Auto-reconnection on connection loss

#### Notion Integration
- Render Notion pages via `react-notion-x`
- Component: `NotionRenderer.tsx`
- Styles imported in `global.css`
- Used for rich content rendering

### SEO & Metadata

#### Dynamic Metadata
- Base URL configured in `app/sitemap.ts`
- Per-route metadata using Next.js 15 metadata API
- Default metadata in `app/layout.tsx`:
  - Title: "unlux"
  - Template: "%s | unlux"
  - OpenGraph tags
  - Robots configuration

#### Generated Routes
- **OG Images**: `/og?title=...` - Dynamic OpenGraph image generation
- **RSS Feed**: `/rss` - Auto-generated from blog posts
- **Sitemap**: `/sitemap.xml` - Includes homepage, blog index, and all blog posts
- **Robots**: `/robots.txt` - Auto-generated

#### Blog Post SEO
- JSON-LD structured data per blog post
- Dynamic OG images with post titles
- Proper meta descriptions from frontmatter `summary`
- Canonical URLs

### Environment Variables

**Required for Clerk (optional)**:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

**Required for Prisma**:
```env
DATABASE_URL=postgresql://...
```

**Optional - PostHog Analytics**:
```env
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Optional - Lanyard (Discord)**:
```env
NEXT_PUBLIC_DISCORD_USER_ID=your_discord_id
```

## Animation System

The portfolio includes a comprehensive animation library. Key features:

### Animation Presets (`lib/animation-presets.ts`)
- **Easing curves**: Apple HIG and Material Design standards
- **Durations**: Predefined timing values (instant, fast, quick, normal, smooth, slow, verySlow)
- **Variants**: Fade, scale, slide, blur animations
- **Stagger containers**: Sequential animation of children
- **Hover/Tap effects**: Interactive micro-animations

### Scroll Animation Hooks (`lib/hooks/useScrollAnimation.ts`)
- `useScrollReveal()` - Trigger animations on viewport entry
- `useParallax()` - Parallax scroll effects
- `useScrollCounter()` - Animated counters on scroll
- `useScrollScale()`, `useScrollProgress()`, `useScrollDirection()`, etc.

### Best Practices
- All animations respect `prefers-reduced-motion`
- Use GPU-accelerated properties (`transform`, `opacity`)
- Avoid layout-triggering properties (`width`, `height`, `top`, `left`)
- Lazy load animations for performance

**See `ANIMATIONS.md` for comprehensive documentation and examples.**

## Smooth Scrolling with Lenis

Lenis provides enhanced smooth scrolling throughout the site.

### Features
- Automatic smooth scroll on page navigation
- Hash link support with 80px offset for fixed headers
- Native touch scrolling on mobile (better performance)
- Programmatic control via `useLenis()` hook
- Scroll direction detection for UI effects
- Custom easing and duration options

### Usage Example
```tsx
import { useLenis } from "@/components/LenisProvider";

function MyComponent() {
  const { scrollTo, scrollDirection } = useLenis();

  // Scroll to element
  scrollTo("#section", { offset: -100, duration: 1.5 });

  // Use scroll direction
  console.log(scrollDirection); // 'up' or 'down'
}
```

**See `LENIS_USAGE.md` for comprehensive documentation.**

## Important Notes & Best Practices

### Build & Deployment
- Build script runs `prisma migrate deploy` before `next build` - migrations are auto-applied
- `postinstall` script runs `prisma generate` to ensure client is generated after npm install
- TypeScript and ESLint errors are ignored in production builds (`ignoreBuildErrors: true`)
- This allows rapid iteration but should be addressed before production deployment

### Code Organization
- Path imports use `@/` alias (points to project root)
- Server components by default, mark client components with `"use client"`
- Keep API routes thin - business logic in separate modules
- Use `lib/api-utils.ts` for consistent error handling

### Optional Features
- The app is designed to work without Clerk - middleware becomes a no-op if credentials are missing
- PostHog analytics gracefully handles missing configuration
- Lanyard integration fails silently if Discord user ID not provided
- All optional integrations should degrade gracefully

### Database
- Custom Prisma client output location: `lib/generated/prisma` (not default `node_modules`)
- Always use the singleton instance from `lib/prisma.ts`
- Migrations are run automatically on build
- Use Prisma Studio for GUI database management: `npx prisma studio`

### Performance
- Lenis smooth scroll is disabled on mobile (native scrolling for better performance)
- Images should use Next.js `Image` component for optimization
- Animations use GPU-accelerated properties
- Code splitting via dynamic imports where appropriate

### Accessibility
- All animations respect `prefers-reduced-motion`
- Semantic HTML throughout
- Radix UI primitives provide keyboard navigation
- ARIA labels on interactive elements
- Focus states via Tailwind `outline-ring` utility

### Content Management
- Blog posts are file-based (MDX in `app/blog/posts/`)
- Add new posts by creating `.mdx` files with proper frontmatter
- Images referenced in blog posts should be in `public/`
- Notion integration available for rich content pages

### Styling Conventions
- Use `cn()` utility from `lib/utils.ts` for className merging
- Prefer Tailwind utilities over custom CSS
- Use CSS variables for theming (defined in `global.css`)
- Follow shadcn/ui component patterns for new UI components
- Dark mode via `.dark` class on `<html>` element

### Security
- Session-based password protection for private routes
- Passwords hashed for album protection
- API routes validate input using `lib/api-utils.ts`
- CSRF protection via Next.js built-in mechanisms
- Environment variables for sensitive data

### Development Workflow
1. Run `npm run dev` for development server with hot reload
2. Add new shadcn/ui components: `npx shadcn-ui@latest add [component]`
3. Database changes: Create migration with `npx prisma migrate dev`
4. Test build locally: `npm run build && npm start`
5. Check for type errors: `npx tsc --noEmit`
6. Lint code: `npm run lint`

### Additional Documentation
- `ANIMATIONS.md` - Complete animation system guide
- `LENIS_USAGE.md` - Smooth scrolling documentation
- `future-todo.md` - Planned features and improvements
- `README.md` - Project overview

## shadcn/ui Configuration

The project uses shadcn/ui with the following settings (`components.json`):
- **Style**: new-york
- **Base color**: neutral
- **CSS variables**: enabled
- **Icon library**: lucide-react
- **Aliases**:
  - `@/components` - components directory
  - `@/lib/utils` - utilities
  - `@/components/ui` - UI components
  - `@/lib` - lib directory
  - `@/hooks` - hooks directory

To add new components:
```bash
npx shadcn-ui@latest add button
```

## Package Manager

The project supports multiple package managers:
- `package-lock.json` - npm
- `yarn.lock` - Yarn
- `bun.lock` - Bun

Use your preferred package manager consistently.
