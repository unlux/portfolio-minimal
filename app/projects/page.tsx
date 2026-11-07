import Reveal from "@/components/animation/Reveal"
import { ProjectIndex } from "@/components/project-index"
import { projectGroups, projects, smallerProjects } from "@/lib/projects"

export const metadata = {
  title: "Projects",
  description:
    "Everything Lakshay Choudhary has built: AI products at Skillion, client and freelance work, and personal projects.",
  alternates: {
    canonical: "/projects",
  },
}

export default function Page() {
  const groups = projectGroups.map((group) => ({
    group,
    projects: projects.filter((project) => project.group === group),
  }))

  return (
    <section>
      <Reveal animation="fadeUp">
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-neutral-900 italic dark:text-neutral-100">
          Projects
        </h1>
        <p className="mb-8 font-[family-name:var(--font-inter)] text-[1.02rem] leading-7 text-neutral-700 dark:text-neutral-300">
          Everything I&apos;ve built: product work at Skillion, client and
          freelance jobs, and my own projects. Open any row for details.
        </p>
      </Reveal>
      <Reveal animation="fadeUp" delay={0.1}>
        <ProjectIndex groups={groups} smallerProjects={smallerProjects} />
      </Reveal>
    </section>
  )
}
