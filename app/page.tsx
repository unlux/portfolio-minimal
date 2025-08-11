import { BlogPosts } from "@/components/posts";
import { Inter } from "./lib/fonts";
import BlurText from "@/components/ui/BlurText";
import { WorkExperience } from "@/components/work-experience";
import FadeIn from "@/components/animation/FadeIn";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-4xl font-semibold tracking-tighter">
        <BlurText
          delay={100}
          stepDuration={0.2}
          direction="bottom"
          text="Hi, I'm Lakshay Choudhary"
        />
      </h1>

      <FadeIn className={`mb-4 ${Inter.className}`}>
        a full-stack and cloud developer with a love for solving complex
        problems and building efficient, reliable systems. I thrive on creating
        solutions that work seamlessly and enjoy diving deep into the technical
        side of things. My approach is practical and detail-oriented, always
        focused on delivering results that matter. When it comes to web
        development,
        <br />
        <br />I specialize in building modern, scalable applications that get
        the job done. I enjoy working with frameworks like Next.js and
        leveraging tools like Prisma to create robust backends. For me, web
        development isn’t about flashy designs—it’s about functionality,
        performance, and creating systems that make life easier for users.
        <br />
        <br />
        On the cloud side, I’m passionate about designing and optimizing
        infrastructure. I’ve worked extensively with platforms like AWS and R2,
        streamlining workflows and deploying scalable solutions. Whether it’s
        automating processes, running containerized applications, or cutting
        operational costs, I’m always looking for ways to make systems more
        efficient.
        <br />
        <br />
        I’m also a big fan of NixOS. Running it on my laptop and my VPS has
        taught me to configure, customize, and manage systems at a deep level.
        From managing packages to setting up advanced tools like Disko with
        Btrfs, NixOS has been central to my development journey.
        <br />
        <br />
      </FadeIn>

      {/* Work Experience */}
      <FadeIn className="mt-10">
        <WorkExperience
          experiences={[
            {
              id: "printsaathi",
              companyName: "PrintSaathi",
              positions: [
                {
                  id: "printsaathi-backend-intern",
                  title: "Backend Development Intern",
                  employmentPeriod: "Feb 2025 – Apr 2025",
                  employmentType: "Internship",
                  icon: "code",
                  isExpanded: true,
                  description:
                    "- Migrated from MongoDB to PostgreSQL with Prisma ORM, enforcing strict schema validation.\n- Reduced API latency by 70% through caching hot data and optimizing SQL queries.\n- Built a Redis-backed BullMQ queue that processed over 10,000 async tasks and emails daily.\n- Refactored REST APIs, resulting in a 50% reduction in error rates and a 30% improvement in response times.",
                },
              ],
            },
          ]}
        />
      </FadeIn>

      <FadeIn className="mt-8" delay={0.05}>
        <BlogPosts />
      </FadeIn>
      {/* <LanyardRPC /> // TODO */}
    </section>
  );
}
