"use client"

import { useState } from "react"
import ProjectCard from "./ProjectCard"

type Category = {
  id: number
  name: string
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

type CategoryFilterProps = {
  categories: Category[]
  projects: Project[]
}

export default function CategoryFilter({
  categories,
  projects,
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  const filteredProjects =
    activeCategory === null
      ? projects
      : projects.filter(
          (project) => project.category_id === activeCategory
        )

  return (
    <div>
      {/* Category Buttons */}
      <div className="mb-14 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
            activeCategory === null
              ? "border-black bg-black text-white"
              : "border-black/15 bg-transparent hover:bg-black hover:text-white"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? "border-black bg-black text-white"
                : "border-black/15 bg-transparent hover:bg-black hover:text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Projects */}
      <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard
  key={project.id}
  project={project}
  index={filteredProjects.indexOf(project)}
/>
        ))}
      </div>
    </div>
  )
}