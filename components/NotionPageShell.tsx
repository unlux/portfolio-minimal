import Reveal from "@/components/animation/Reveal";
import InteractiveLink from "@/components/ui/InteractiveLink";
import type { ReactNode } from "react";

type NotionPageShellProps = {
  title: string;
  description: string;
  notionUrl?: string;
  children: ReactNode;
};

export function NotionPageShell({
  title,
  description,
  notionUrl,
  children,
}: NotionPageShellProps) {
  return (
    <section className="notion-shell">
      <Reveal animation="fadeUp">
        <div className="mb-8 border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            {description}
          </p>
          {notionUrl && (
            <div className="mt-4 text-sm">
              <InteractiveLink
                href={notionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>open in notion</span>
              </InteractiveLink>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal animation="fadeUp" delay={0.1}>
        {children}
      </Reveal>
    </section>
  );
}
