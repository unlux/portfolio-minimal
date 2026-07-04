import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "unlux — Lakshay Choudhary",
    short_name: "unlux",
    description:
      "Lakshay Choudhary — full-stack developer focused on backend-heavy products, cloud infrastructure, and systems that stay maintainable after v1 ships.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
