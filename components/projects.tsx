import type { ComponentProps } from "react"
import { ArrowUpRightIcon, GithubIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type ProjectItem = {
  /** Unique identifier for the project */
  id: string
  /** Project name shown as the heading */
  name: string
  /** One-line tagline that sits next to the title */
  tagline: string
  /** A short description of what it does and how it's built */
  description: string
  /** A list of technologies used */
  skills: string[]
  /** Optional live demo URL */
  liveUrl?: string
  /** Optional source repository URL */
  repoUrl?: string
}

export type ProjectsProps = {
  className?: string
  projects: ProjectItem[]
}

export function Projects({ className, projects }: ProjectsProps) {
  return (
    <div className={cn("bg-background px-4 text-foreground", className)}>
      {projects.map((project) => (
        <ProjectItemRow key={project.id} project={project} />
      ))}
    </div>
  )
}

function ProjectItemRow({ project }: { project: ProjectItem }) {
  const { name, tagline, description, skills, liveUrl, repoUrl } = project

  return (
    <div className="space-y-2 border-b border-border py-5 last:border-none">
      <div className="not-prose flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="text-lg leading-snug font-semibold">
          {liveUrl ? (
            <a
              className="link inline-flex items-center gap-0.5"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
              <ArrowUpRightIcon className="size-4 translate-y-px" aria-hidden />
            </a>
          ) : (
            name
          )}
        </h3>

        <span className="text-sm text-muted-foreground">{tagline}</span>

        {repoUrl && (
          <a
            className="ml-auto inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} source on GitHub`}
          >
            <GithubIcon className="size-4" aria-hidden />
          </a>
        )}
      </div>

      <p className="text-[0.95rem] leading-7 text-neutral-700 dark:text-neutral-300">
        {description}
      </p>

      {skills.length > 0 && (
        <ul className="not-prose flex flex-wrap gap-1.5 pt-1">
          {skills.map((skill, index) => (
            <li key={index} className="flex">
              <Skill>{skill}</Skill>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Skill({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
