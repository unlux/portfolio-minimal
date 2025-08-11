import { Inter } from "@/app/lib/fonts";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={`mb-16 ${Inter.className}`}>
      <ul className="font-sm mt-8 flex flex-row flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://dub.sh/luxhub"
          >
            <FaGithub size={20} />
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/whyunlux"
          >
            <FaXTwitter size={20} />
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://dub.sh/lux-linkedin"
          >
            <FaLinkedin size={20} />
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/resume.pdf"
          >
            <FaFileAlt size={20} />
            <span>cv</span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/unlux/portfolio-minimal"
          >
            <FaGithub size={20} />
            <span>view source</span>
          </a>
        </li>
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        built with nextjs and cloudflare mindfuk <br /> © 1969 MIT Licensed to
        fkn no one
      </p>
    </footer>
  );
}
