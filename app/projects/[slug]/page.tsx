import Link from "next/link"
import { notFound } from "next/navigation"

import Reveal from "@/components/animation/Reveal"
import { ProjectLinks } from "@/components/project-index"
import { getProject, projectsWithDetail } from "@/lib/projects"
import { baseUrl } from "@/app/sitemap"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return projectsWithDetail().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata(props: ProjectPageProps) {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project?.detail) return

  const title = project.name
  const description = project.detail.summary[0]
  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/projects/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function ProjectPage(props: ProjectPageProps) {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project?.detail) notFound()

  const { name, segment, period, detail } = project

  return (
    <section className="font-[family-name:var(--font-inter)]">
      <Reveal animation="fadeUp">
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link href="/projects" className="transition-colors hover:text-foreground">
            projects
          </Link>
          <span aria-hidden> / </span>
          <span>{slug}</span>
        </nav>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {name}
        </h1>
        {detail.status && (
          <p className="mt-2 inline-flex rounded-md border bg-muted/50 px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {detail.status}
          </p>
        )}

        <dl className="mt-6 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-1.5 text-sm">
          <dt className="text-muted-foreground">Segment</dt>
          <dd>{segment}</dd>
          <dt className="text-muted-foreground">Role</dt>
          <dd>{detail.role}</dd>
          <dt className="text-muted-foreground">Period</dt>
          <dd>{period}</dd>
        </dl>
      </Reveal>

      <Reveal animation="fadeUp" delay={0.1}>
        <div className="mt-8 space-y-4 text-[1.02rem] leading-7 text-neutral-700 dark:text-neutral-300">
          {detail.summary.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <ProjectLinks project={project} />

        <h2 className="mt-10 mb-3 text-xl font-semibold tracking-tight">Key features</h2>
        <ol className="list-decimal space-y-2 pl-5 text-[0.97rem] leading-7 text-neutral-700 dark:text-neutral-300">
          {detail.features.map((feature) => (
            <li key={feature.title}>
              <span className="font-semibold text-foreground">{feature.title}.</span>{" "}
              {feature.body}
            </li>
          ))}
        </ol>

        <h2 className="mt-10 mb-3 text-xl font-semibold tracking-tight">Tech stack</h2>
        <dl className="grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2 text-sm leading-6">
          {detail.stack.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd>{row.items}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 text-sm">
          <Link href="/projects" className="link">
            ← All projects
          </Link>
        </p>
      </Reveal>
    </section>
  )
}
