import { Inter } from "app/lib/fonts";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
            <span>github</span>
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
            <span>X</span>
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
            <span>linkedIn</span>
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
