import { Suspense } from "react";
import { CodeXmlIcon } from "lucide-react";
import { BlogPosts } from "@/components/posts";
import { WorkExperience } from "@/components/work-experience";
import { Projects } from "@/components/projects";
import Reveal from "@/components/animation/Reveal";
import {
  BlogPostsSkeleton,
  WorkExperienceSkeleton,
} from "@/components/ui/loading-skeleton";
import LanyardRPC from "@/components/LanyardRPC";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { baseUrl } from "@/app/sitemap";

export default function Page() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${baseUrl}/#person`,
                name: "Lakshay Choudhary",
                alternateName: "unlux",
                url: baseUrl,
                email: "mailto:contact@unlux.dev",
                jobTitle: "Full Stack Developer",
                worksFor: {
                  "@type": "Organization",
                  name: "Skillion",
                },
                sameAs: [
                  "https://github.com/unlux",
                  "https://x.com/whyunlux",
                  "https://dub.sh/lux-linkedin",
                ],
              },
              {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                name: "unlux",
                url: baseUrl,
                author: { "@id": `${baseUrl}/#person` },
              },
            ],
          }),
        }}
      />
      <AnimatedTitle text="Hi, I'm Lakshay Choudhary" />

      <div
        className="animate-fade-up mb-4 space-y-5 font-[family-name:var(--font-inter)] text-[1.02rem] leading-7 text-neutral-700 dark:text-neutral-300"
        style={{ animationDelay: "0.2s" }}
      >
        <p>
          I&apos;m Lakshay Choudhary, a full-stack developer focused on
          backend-heavy products, cloud infrastructure, and systems that stay
          maintainable after the first version ships.
        </p>

        <p>
          I work mostly with Next.js, TypeScript, Prisma, Redis, AWS, GCP, and
          Linux/NixOS. Lately, I&apos;ve been building AI-backed product
          workflows, trading tools, ecommerce systems, and infrastructure setups
          that are boring in the best way: reliable, observable, and easy to
          change.
        </p>
      </div>

      {/* Work Experience */}
      <Reveal animation="fadeUp" delay={0.3} className="mt-10">
        <div className="text-2xl">Experience</div>
        <Suspense fallback={<WorkExperienceSkeleton />}>
          <WorkExperience
            className="px-0"
            experiences={[
            {
              id: "Skillion",
              companyName: "Skillion",
              companyLogo: "/Skillion.png",
              isCurrentEmployer: true,
              positions: [
                {
                  id: "Skillion-Full-Stack-Developer",
                  title: "Full Stack Developer",
                  employmentPeriod: { start: "10.2025" },
                  employmentType: "Full-Time",
                  icon: <CodeXmlIcon />,
                  isExpanded: true,
                  description:
                    "- Building AI-backed product workflows across full-stack surfaces.\n- Working on a trading platform with AI insights, backend integrations, and test coverage around critical flows.\n- Ship company marketing sites end to end with Next.js 16, Tailwind v4, statically generated from a headless Strapi CMS, deployed to Cloudflare Workers via OpenNext.\n- Built the content platform behind them: Strapi Cloud CMS with a Cloudflare R2 media pipeline, publish-triggered rebuild webhooks, and GitHub Actions deploys.",
                  skills: [
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Strapi",
                    "Cloudflare Workers",
                    "PostgreSQL",
                  ],
                },
              ],
            },
            {
              id: "JoyJunction",
              companyName: "The Joy Junction",
              companyLogo: "/JJ.png",
              isCurrentEmployer: true,
              positions: [
                {
                  id: "JoyJunction-Full-Stack-Developer",
                  title: "Full Stack Developer",
                  employmentPeriod: { start: "04.2025" },
                  employmentType: "Part-Time",
                  icon: <CodeXmlIcon />,
                  isExpanded: false,
                  description:
                    "- Built an end-to-end ecommerce platform with Next.js and a headless MedusaJS backend.\n- Integrated Google Auth, Razorpay payments, PostHog analytics, Supabase storage, and Redis caching.\n- Set up CI/CD with GitHub Actions for deployments across Vercel and AWS Lightsail.",
                  skills: [
                    "Next.js",
                    "MedusaJS",
                    "Razorpay",
                    "Supabase",
                    "Redis",
                    "GitHub Actions",
                  ],
                },
              ],
            },
            {
              id: "printsaathi",
              companyName: "PrintSaathi",
              companyLogo: "/PrintSaathi.png",
              positions: [
                {
                  id: "printsaathi-backend-intern",
                  title: "Backend Development Intern",
                  employmentPeriod: { start: "02.2025", end: "04.2025" },
                  employmentType: "Internship",
                  icon: <CodeXmlIcon />,
                  isExpanded: false,
                  description:
                    "- Migrated core data from MongoDB to PostgreSQL with Prisma and stricter schema validation.\n- Reduced API latency by 70% by caching hot paths and tightening SQL queries.\n- Built Redis/BullMQ workers for async jobs and transactional email processing.\n- Refactored REST APIs to reduce error rates and improve response times.",
                  skills: ["PostgreSQL", "Prisma", "Redis", "BullMQ", "MongoDB"],
                },
              ],
            },
          ]}
          />
        </Suspense>
      </Reveal>

      {/* Projects */}
      <Reveal animation="fadeUp" delay={0.35} className="mt-10">
        <div className="text-2xl">Projects</div>
        <Projects
          className="px-0 pt-2"
          projects={[
            {
              id: "sla-ticketing",
              name: "SLAWARE",
              tagline: "SLA-aware support portal",
              liveUrl: "https://sl-aware.vercel.app",
              repoUrl: "https://github.com/unlux/sl-aware",
              description:
                "A full-stack ticketing system with role-based workflows for users, agents, and admins. SLA deadlines with breach detection, a full event timeline, optimistic locking that returns 409 on stale writes, plus per-user rate limiting and idempotent ticket creation.",
              skills: [
                "Next.js",
                "React 19",
                "Prisma",
                "PostgreSQL",
                "TanStack Query",
                "Zod",
              ],
            },
            {
              id: "joy-junction-commerce",
              name: "Joy Junction storefront",
              tagline: "headless commerce platform",
              liveUrl: "https://tjj.unlux.dev",
              description:
                "An end-to-end ecommerce platform for a toy-and-games brand: a Next.js 15 storefront on a headless MedusaJS backend, with Google auth, Razorpay payments, Supabase storage, and Redis caching, deployed across Vercel and AWS Lightsail.",
              skills: [
                "Next.js",
                "MedusaJS",
                "Razorpay",
                "Supabase",
                "Redis",
                "AWS Lightsail",
              ],
            },
            {
              id: "video-transcoding-pipeline",
              name: "Video transcoding pipeline",
              tagline: "cost-aware AWS pipeline",
              repoUrl: "https://github.com/unlux/video-transcoding-pipeline",
              description:
                "A video transcoding pipeline built for cost, not convenience: SQS-driven jobs running containers directly on the EC2 instance instead of ECS to avoid the orchestration overhead, reading from and writing back to S3.",
              skills: ["AWS SQS", "EC2", "S3", "Docker", "TypeScript"],
            },
            {
              id: "objecteasy",
              name: "ObjectEasy",
              tagline: "client-side S3 uploader",
              liveUrl: "https://object-easy.vercel.app",
              repoUrl: "https://github.com/unlux/ObjectEasy",
              description:
                "A browser-only S3 uploader: credentials live in local storage and go straight to AWS, never touching a server. Direct-to-S3 uploads with live progress, cancellation, and a copyable link history.",
              skills: ["Next.js", "AWS SDK v3", "S3", "shadcn/ui", "TypeScript"],
            },
          ]}
        />
      </Reveal>

      <Reveal animation="fadeUp" delay={0.4} className="mt-8">
        <div className="text-2xl pb-6">Writing</div>
        <Suspense fallback={<BlogPostsSkeleton />}>
          <BlogPosts />
        </Suspense>
      </Reveal>

      <Reveal animation="fadeUp" delay={0.5} className="mt-8">
        <LanyardRPC />
      </Reveal>
    </section>
  );
}
