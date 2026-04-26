import { Suspense } from "react";
import { BlogPosts } from "@/components/posts";
import { WorkExperience } from "@/components/work-experience";
import Reveal from "@/components/animation/Reveal";
import {
  BlogPostsSkeleton,
  WorkExperienceSkeleton,
} from "@/components/ui/loading-skeleton";
import LanyardRPC from "@/components/LanyardRPC";
import { AnimatedTitle } from "@/components/AnimatedTitle";

export default function Page() {
  return (
    <section>
      <AnimatedTitle text="Hi, I'm Lakshay Choudhary" />

      <Reveal
        animation="fadeUp"
        delay={0.2}
        className="mb-4 space-y-5 font-[family-name:var(--font-inter)] text-[1.02rem] leading-7 text-neutral-300"
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
      </Reveal>

      {/* Work Experience */}
      <Reveal animation="fadeUp" delay={0.3} className="mt-10">
        <div className="text-2xl">Experience</div>
        <Suspense fallback={<WorkExperienceSkeleton />}>
          <WorkExperience
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
                  employmentPeriod: "October 2025 - Present",
                  employmentType: "Full-Time",
                  icon: "code",
                  isExpanded: true,
                  description:
                    "- Working on several AI projects, \n - Building a trading platform with AI Insights using various testing strategies",
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
                  employmentPeriod: "Apr 2025 - Present",
                  employmentType: "Part-Time",
                  icon: "code",
                  isExpanded: false,
                  description:
                    "- Developed an end-to-end e-commerce platform using Next.js for the frontend and a headless MedusaJS backend.\n- Integrated Google Auth, Razorpay payments, and PostHog analytics to create a feature-rich user experience.\n- Established a complete CI/CD pipeline with GitHub Actions for seamless deployments to Vercel and AWS Lightsail.\n- Utilized Supabase for PostgreSQL database management and object storage, with Redis for caching.",
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
                  employmentPeriod: "Feb 2025 – Apr 2025",
                  employmentType: "Internship",
                  icon: "code",
                  isExpanded: false,
                  description:
                    "- Migrated from MongoDB to PostgreSQL with Prisma ORM, enforcing strict schema validation.\n- Reduced API latency by 70% through caching hot data and optimizing SQL queries.\n- Built a Redis-backed BullMQ queue that processed over 10,000 async tasks and emails daily.\n- Refactored REST APIs, resulting in a 50% reduction in error rates and a 30% improvement in response times.",
                },
              ],
            },
          ]}
          />
        </Suspense>
      </Reveal>

      <Reveal animation="fadeUp" delay={0.4} className="mt-8">
        <div className="text-2xl pb-6">Blogs</div>
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
