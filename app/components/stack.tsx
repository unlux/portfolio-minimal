import Image from "next/image";

const technologies = [
  { src: "/nix.svg", alt: "NixOS", width: 45, height: 45 },
  { src: "/nextjs.svg", alt: "NextJS", width: 60, height: 60 },
  { src: "/aws.svg", alt: "AWS", width: 50, height: 50 },
  { src: "/ci-cd.svg", alt: "ci-cd", width: 45, height: 45 },
  { src: "/ts.svg", alt: "Typescript", width: 45, height: 45 },
  { src: "/docker.svg", alt: "Docker", width: 45, height: 45 },
  { src: "/github.svg", alt: "GitHub", width: 45, height: 45 },
  { src: "/neovim.svg", alt: "neovim", width: 45, height: 45 },
  //   { src: "/docker.svg", alt: "Docker", width: 45, height: 45 },

  // Add more technologies as needed
];

export default function Stack() {
  return (
    <div>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        {technologies.map((tech, index) => (
          <li
            key={index}
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
          >
            <Image
              width={tech.width}
              height={tech.height}
              src={tech.src}
              alt={tech.alt}
              className="items-center"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
