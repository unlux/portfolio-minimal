"use client"

import Link from "next/link"
import { ArrowUpRightIcon, ChevronDownIcon } from "lucide-react"
import { FaGithub } from "react-icons/fa"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type { Project, ProjectGroup } from "@/lib/projects"

type ProjectIndexProps = {
  groups: { group: ProjectGroup; projects: Project[] }[]
  smallerProjects: string[]
}

export function ProjectIndex({ groups, smallerProjects }: ProjectIndexProps) {
  return (
    <div className="font-[family-name:var(--font-inter)]">
      {groups.map(({ group, projects }) => (
        <section key={group} className="mb-8">
          <h2 className="mb-1 font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {group}
          </h2>
          <ul className="not-prose">
            {projects.map((project) => (
              <li key={project.slug} className="border-b border-border">
                <ProjectRow project={project} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mb-8">
        <h2 className="mb-2 font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Smaller projects
        </h2>
        <p className="text-sm leading-7 text-muted-foreground">
          {smallerProjects.join(" · ")}
        </p>
      </section>
    </div>
  )
}

function ProjectRow({ project }: { project: Project }) {
  const { name, tagline, segment, period, highlights, tags, detail } = project

  return (
    <Collapsible>
      <CollapsibleTrigger
        className={cn(
          "group/row grid w-full cursor-pointer grid-cols-[1fr_auto] items-start gap-x-4 gap-y-0.5 py-3 text-left",
          "relative before:absolute before:-inset-x-2 before:inset-y-0.5 before:rounded-lg hover:before:bg-muted/40",
          "focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-ring"
        )}
      >
        <span className="relative">
          <span className="font-semibold text-foreground">{name}</span>
          <span className="ml-2 text-sm text-muted-foreground">{tagline}</span>
        </span>
        <span className="relative flex items-start gap-2 text-right text-xs leading-5 text-muted-foreground">
          <span>
            {segment}
            <br />
            {period}
          </span>
          <ChevronDownIcon
            className="mt-0.5 size-4 shrink-0 transition-transform duration-200 group-data-[panel-open]/row:rotate-180 motion-reduce:transition-none"
            aria-hidden
          />
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent className="pb-4">
        <ol className="list-decimal space-y-0.5 pl-5 text-[0.95rem] leading-7 text-neutral-700 dark:text-neutral-300">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ol>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} showDetail={Boolean(detail)} />
      </CollapsibleContent>
    </Collapsible>
  )
}

export function ProjectLinks({
  project,
  showDetail = false,
}: {
  project: Project
  showDetail?: boolean
}) {
  const { slug, name, liveUrl, repoUrl } = project
  if (!showDetail && !liveUrl && !repoUrl) return null

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
      {showDetail && (
        <Link href={`/projects/${slug}`} className="link font-medium">
          Read the full write-up →
        </Link>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          Live site
          <ArrowUpRightIcon className="size-3.5" aria-hidden />
        </a>
      )}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} source on GitHub`}
          className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <FaGithub className="size-3.5" aria-hidden />
          Source
        </a>
      )}
    </div>
  )
}
