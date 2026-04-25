import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";
import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

function Table({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto my-6">
      <table {...props} className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  );
}

function CustomLink(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage({
  alt,
  className,
  ...props
}: React.ComponentProps<typeof Image>) {
  return (
    <Image
      {...props}
      alt={alt}
      className={`rounded-lg ${className ?? ""}`}
    />
  );
}

function Code({ children, ...props }: ComponentPropsWithoutRef<"code">) {
  const codeHTML = highlight(String(children ?? ""));
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(value: ReactNode) {
  return String(value)
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children: ReactNode }) => {
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  table: Table,
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead {...props} className="bg-neutral-200 dark:bg-neutral-800" />
  ),
  tbody: (props: ComponentPropsWithoutRef<"tbody">) => <tbody {...props} />,
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr
      {...props}
      className={
        (props.className || "") +
        " border-b border-neutral-300 dark:border-neutral-700 even:bg-neutral-100 dark:even:bg-neutral-900"
      }
    />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className={
        (props.className || "") +
        " px-4 py-2 text-left font-semibold text-neutral-800 dark:text-neutral-200"
      }
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      className={
        (props.className || "") +
        " px-4 py-2 text-neutral-800 dark:text-neutral-200"
      }
    />
  ),
  details: (props: ComponentPropsWithoutRef<"details">) => (
    <details {...props} />
  ),
  summary: (props: ComponentPropsWithoutRef<"summary">) => (
    <summary {...props} />
  ),
};

type CustomMDXProps = React.ComponentProps<typeof MDXRemote>;

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
