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
import Link from "next/link";
import { baseUrl } from "@/app/sitemap";
import { projects } from "@/lib/projects";

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
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: "Lovely Professional University",
                },
                knowsAbout: [
                  "AI products",
                  "LLM applications",
                  "Full-stack development",
                  "Next.js",
                  "TypeScript",
                  "Cloud infrastructure",
                ],
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
          I build AI products end to end: the model work, the product around
          it, and the infrastructure that keeps it running. At Skillion I built
          Reconexa, which reads insurer payment emails with AI and reconciles
          clinic invoices in Cliniko and Xero, plus the company&apos;s
          AI-powered website and voice agent.
        </p>

        <p>
          I work mostly in TypeScript and Next.js, with Python where it fits,
          on Cloudflare, AWS and my own servers.
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
                    "- Built Reconexa end to end as sole developer: an AI product that reads insurer payment emails and marks invoices paid in Cliniko and Xero, live with two physiotherapy clinics.\n- Raised invoice extraction accuracy from 68% to 97.5% by benchmarking LLMs against staff-verified invoices.\n- Built skillionailabs.com on Next.js 16 and Cloudflare Workers, with an AI diagnostic, a chatbot and Lara, a voice agent on ElevenLabs and Twilio.\n- Built internal AI tools: an RFP proposal system, a multi-model research pipeline with a CRM Claude can drive, and a Jira retro tool used every sprint.",
                  skills: [
                    "OpenAI",
                    "Next.js",
                    "TypeScript",
                    "BullMQ",
                    "PostgreSQL",
                    "Cloudflare Workers",
                    "ElevenLabs",
                  ],
                },
              ],
            },
            {
              id: "JoyJunction",
              companyName: "The Joy Junction",
              companyLogo: "/JJ.png",
              positions: [
                {
                  id: "JoyJunction-Full-Stack-Developer",
                  title: "Full Stack Developer",
                  employmentPeriod: { start: "05.2025", end: "12.2025" },
                  employmentType: "Part-Time",
                  icon: <CodeXmlIcon />,
                  isExpanded: false,
                  description:
                    "- Built the brand's e-commerce platform from scratch on MedusaJS 2 and Next.js 15.\n- Algolia search under 200 ms; Redis caching, event bus and workflows cut average API latency by 40%.\n- Razorpay with webhook-driven order expiry and refunds, Google sign-in, and GitHub Actions deploys to AWS Lightsail.",
                  skills: [
                    "Next.js",
                    "MedusaJS",
                    "Algolia",
                    "Razorpay",
                    "Redis",
                    "AWS Lightsail",
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
                    "- Designed the move from MongoDB to PostgreSQL with Prisma: a 29-table schema, migrations and data-copy scripts.\n- Cut API latency by 70% with Redis caching and SQL tuning.\n- Built a BullMQ queue handling 10,000+ tasks and emails a day, plus coupon redemption and Algolia search.\n- Refactored REST APIs, cutting error rates by 50%.",
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
        <div className="text-2xl">Selected projects</div>
        <Projects
          className="px-0 pt-2"
          projects={projects
            .filter((project) => project.featured)
            .map((project) => ({
              id: project.slug,
              name: project.name,
              tagline: project.tagline,
              description: project.blurb ?? project.highlights.join(". "),
              skills: project.tags,
              liveUrl: project.detail ? `/projects/${project.slug}` : project.liveUrl,
              repoUrl: project.repoUrl,
            }))}
        />
        <Link
          href="/projects"
          className="link mt-2 inline-block font-[family-name:var(--font-inter)] text-sm"
        >
          All projects →
        </Link>
      </Reveal>

      {/* Education and awards */}
      <Reveal animation="fadeUp" delay={0.38} className="mt-10">
        <div className="text-2xl">Education and awards</div>
        <ul className="not-prose mt-4 grid grid-cols-2 gap-2 font-[family-name:var(--font-inter)] text-sm sm:grid-cols-4">
          {[
            { title: "B.Tech CSE", detail: "LPU, 2022 – 2026" },
            { title: "AZ-104", detail: "Azure Administrator" },
            { title: "1st place", detail: "Hack the Block 2025 at LPU" },
            { title: "GDSC LPU", detail: "Core team, 2022 – 2024" },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-dashed border-border px-3 py-2.5"
            >
              <span className="block font-semibold text-foreground">{item.title}</span>
              <span className="text-muted-foreground">{item.detail}</span>
            </li>
          ))}
        </ul>
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
