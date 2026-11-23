import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const siteUrl = "https://www.nicolasfaraci.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((project) => !project.isExample)
    .map((project) => ({
      url: `${siteUrl}/projets/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
