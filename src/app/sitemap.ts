import type { MetadataRoute } from "next"
import { getProjects } from "@/src/app/lib/portfolio"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()

  const projectUrls = projects.map((project) => ({
    url: `https://anish-portfolio-beige.vercel.app/work/${project.slug}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: "https://anish-portfolio-beige.vercel.app",
      lastModified: new Date(),
    },
    ...projectUrls,
  ]
}
