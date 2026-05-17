import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ἑλληνικά — Greek Trainer",
    short_name: "Ἑλληνικά",
    description:
      "Tichý trenér moderní řečtiny: alfabeta, frekvenční slovní zásoba a gramatická kostra.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0B0F19",
    theme_color: "#0B0F19",
    lang: "cs",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Alfabeta",
        short_name: "Alfa",
        description: "Trénink řeckých písmen",
        url: "/alphabet",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Slovní zásoba",
        short_name: "Slova",
        description: "Trénink slovní zásoby",
        url: "/vocabulary",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Gramatika",
        short_name: "Gram",
        description: "Gramatická reference",
        url: "/grammar",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
