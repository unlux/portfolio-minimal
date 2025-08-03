import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";
import React from "react";

function Table({ children }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
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

let components = {
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
  thead: (props) => (
    <thead {...props} className="bg-neutral-200 dark:bg-neutral-800" />
  ),
  tbody: (props) => <tbody {...props} />,
  tr: (props) => (
    <tr
      {...props}
      className={
        (props.className || "") +
        " border-b border-neutral-300 dark:border-neutral-700 even:bg-neutral-100 dark:even:bg-neutral-900"
      }
    />
  ),
  th: (props) => (
    <th
      {...props}
      className={
        (props.className || "") +
        " px-4 py-2 text-left font-semibold text-neutral-800 dark:text-neutral-200"
      }
    />
  ),
  td: (props) => (
    <td
      {...props}
      className={
        (props.className || "") +
        " px-4 py-2 text-neutral-800 dark:text-neutral-200"
      }
    />
  ),
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
