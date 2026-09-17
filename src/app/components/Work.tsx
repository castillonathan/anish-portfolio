import {
  getCategories,
  getProjects,
  getProjectCover,
  getVideos,
} from "@/src/app/lib/portfolio"

import CategoryFilter from "./CategoryFilter"

export default async function Work() {
  const categories = await getCategories()
  const projects = await getProjects()
  const videos = await getVideos()

  const projectsWithCovers = await Promise.all(
    projects.map(async (project) => {
      const coverImage = await getProjectCover(project.id)

      return {
        ...project,
        cover_image: coverImage,
      }
    })
  )

  return (
    <section
      id="work"
      className="px-5 py-24 sm:px-6 sm:py-32 md:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-black/40 dark:text-white/40 md:text-sm">
              Selected Work
            </p>

            <h2 className="mt-5 text-[14vw] font-bold leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-8xl">
              Things I've
              <br />
              created.
            </h2>
          </div>

          <p className="max-w-sm text-black/50 dark:text-white/50">
            A collection of graphic design, branding, merchandise,
            social media, and creative projects.
          </p>
        </div>

        {/* Categories + Projects + Videos */}
        <CategoryFilter
          categories={categories}
          projects={projectsWithCovers}
          videos={videos}
        />

      </div>
    </section>
  )
}