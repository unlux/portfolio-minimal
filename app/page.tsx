import { Suspense } from "react";
import { CodeXmlIcon } from "lucide-react";
import { BlogPosts } from "@/components/posts";
import { WorkExperience } from "@/components/work-experience";
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
                    "- Building AI-backed product workflows across full-stack surfaces.\n- Working on a trading platform with AI insights, backend integrations, and test coverage around critical flows.\n- Ship company marketing sites end to end — Next.js 16, Tailwind v4, statically generated from a headless Strapi CMS, deployed to Cloudflare Workers via OpenNext.\n- Built the content platform behind them: Strapi Cloud CMS with a Cloudflare R2 media pipeline, publish-triggered rebuild webhooks, and GitHub Actions deploys.",
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
