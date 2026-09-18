"use client"

import { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"

type Category = {
  id: number
  name: string
  slug: string
  cover_image?: string | null
}

type Project = {
  id: number
  title: string
  slug: string
  client: string
  year: string
  category_id: number
  cover_image?: string | null
}

type Video = {
  id: number
  project_item_title: string
  project_title: string
  project_slug: string
  file_url?: string | null
}

type CategoryFilterProps = {
  categories: Category[]
  projects: Project[]
  videos: Video[]
}

export default function CategoryFilter({
  categories,
  projects,
  videos,
}: CategoryFilterProps) {
  const [activeFilter, setActiveFilter] = useState<
    number | "videos" | null
  >(null)

  // Read category from the URL when the page loads
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const categorySlug = params.get("category")

    if (!categorySlug) {
      setActiveFilter(null)
      return
    }

    if (categorySlug === "videos") {
      setActiveFilter("videos")
      return
    }

    const category = categories.find(
      (category) => category.slug === categorySlug
    )

    if (category) {
      setActiveFilter(category.id)
    }
  }, [categories])

  const updateFilter = (filter: number | "videos" | null) => {
    setActiveFilter(filter)

    const url = new URL(window.location.href)

    if (filter === null) {
      url.searchParams.delete("category")
    } else if (filter === "videos") {
      url.searchParams.set("category", "videos")
    } else {
      const category = categories.find(
        (category) => category.id === filter
      )

      if (category) {
        url.searchParams.set("category", category.slug)
      }
    }

    url.hash = "work"

    window.history.pushState({}, "", url.toString())
  }

  const activeCategory =
    typeof activeFilter === "number" ? activeFilter : null

  const filteredProjects =
    activeCategory === null
      ? []
      : projects.filter(
          (project) => project.category_id === activeCategory
        )

  return (
    <div>
      {/* Category Buttons */}
      <div className="mb-10 flex flex-wrap gap-2 sm:mb-14">
        <button
          onClick={() => updateFilter(null)}
          className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
            activeFilter === null
              ? "border-black bg-black text-white"
              : "border-black/15 bg-transparent hover:bg-black hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-black"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => updateFilter(category.id)}
            className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
              activeFilter === category.id
                ? "border-black bg-black text-white"
                : "border-black/15 bg-transparent hover:bg-black hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-black"
            }`}
          >
            {category.name}
          </button>
        ))}

        <button
          onClick={() => updateFilter("videos")}
          className={`rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
            activeFilter === "videos"
              ? "border-black bg-black text-white"
              : "border-black/15 bg-transparent hover:bg-black hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-black"
          }`}
        >
          Videos
        </button>
      </div>

      {/* All — Category Cards */}
      {activeFilter === null && (
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateFilter(category.id)}
              className="group block w-full text-left"
            >
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-black/5 dark:bg-white/5">
                  {category.cover_image ? (
                    <img
                      src={category.cover_image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-sm uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                        {category.name}
                      </span>
                    </div>
                  )}

                  <div className="absolute right-5 top-5 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white text-xl opacity-0 shadow-sm transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:rotate-6 group-hover:opacity-100 dark:bg-black dark:text-white">
                    ↗
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] transition-opacity duration-300 group-hover:opacity-60">
                    {category.name}
                  </h3>

                  <span className="text-sm text-black/40 dark:text-white/40">
                    View work ↗
                  </span>
                </div>
              </article>
            </button>
          ))}

          {/* Videos Category Card */}
          <button
            onClick={() => updateFilter("videos")}
            className="group block w-full text-left"
          >
            <article>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-black">
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl font-bold tracking-[-0.06em] text-white md:text-8xl">
                    ▶
                  </span>
                </div>

                <div className="absolute right-5 top-5 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white text-xl opacity-0 shadow-sm transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:rotate-6 group-hover:opacity-100">
                  ↗
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] transition-opacity duration-300 group-hover:opacity-60">
                  Videos
                </h3>

                <span className="text-sm text-black/40">
                  View videos ↗
                </span>
              </div>
            </article>
          </button>
        </div>
      )}

      {/* Category — Project Cards */}
      {activeCategory !== null && (
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Videos */}
      {activeFilter === "videos" && (
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id} className="group">
              <article>
                <div className="relative aspect-video overflow-hidden rounded-[2.5rem] bg-black">
                  <video
                    src={video.file_url ?? undefined}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    controls
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-7">
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">
                    {video.project_item_title}
                  </h3>

                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-black/40 dark:text-white/40">
                    {video.project_title}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}

      {/* Empty category */}
      {activeCategory !== null && filteredProjects.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-black/40 dark:text-white/40">
            No projects in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}