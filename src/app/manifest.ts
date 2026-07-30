import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nicolas Faraci — Product builder",
    short_name: "Nicolas Faraci",
    description: "Product builder et développeur full-stack à Lille.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f6f0",
    theme_color: "#11110f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "64x64",
        type: "image/svg+xml",
      },
    ],
  };
}
