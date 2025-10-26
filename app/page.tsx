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

      <Reveal animation="fadeUp" delay={0.2} className="mb-4 font-[family-name:var(--font-inter)]">
        a full-stack and cloud developer with a love for solving complex
        problems and building efficient, reliable systems. I thrive on creating
        solutions that work seamlessly and enjoy diving deep into the technical
        side of things. My approach is practical and detail-oriented, always
        focused on delivering results that matter.
        <br />
        <br />
        When it comes to web development, I specialize in building modern,
        scalable applications that get the job done. I enjoy working with
        frameworks like Next.js and leveraging tools like Prisma to create
        robust backends. For me, web development isn't about flashy designs-it's
        about functionality, performance, and creating systems that make life
        easier for users.
        <br />
        <br />
        On the cloud side, I'm passionate about designing and optimizing
        infrastructure. I've worked extensively with platforms like AWS and GCP,
        streamlining workflows and deploying scalable solutions. Whether it's
        automating processes, running containerized applications, or cutting
        operational costs, I'm always looking for ways to make systems more
        efficient.
        <br />
        <br />
        I'm also a big fan of NixOS. Running it on my laptop and my VPS has
        taught me to configure, customize, and manage systems at a deep level.
        From managing packages to setting up advanced tools like Disko with
        Btrfs, NixOS has been central to my development journey.
        <br />
        <br />
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
