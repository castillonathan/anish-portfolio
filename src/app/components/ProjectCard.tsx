import RevealImage from "./RevealImage"

import Link from "next/link"

type ProjectCardProps = {
  project: {
    id: number
    title: string
    slug: string
    client: string
    year: string
    category_id: number
    cover_image?: string | null
}
index?: number
}

export default function ProjectCard({
  project,
  index = 0,
}: ProjectCardProps) {
 return (
  <RevealImage delay={index * 0.08}>
    <Link
      href={`/work/${project.slug}`}
  className="group block transition-transform duration-500 ease-out hover:-translate-y-1"
>
      <article>
        {/* Image Placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-black/5">
          {project.cover_image ? (
            <img
              src={project.cover_image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm uppercase tracking-[0.2em] text-black/40">
                {project.title}
              </span>
            </div>
          )}

          {/* Hover Arrow */}
          <div className="absolute right-5 top-5 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white text-xl opacity-0 shadow-sm transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:rotate-6 group-hover:opacity-100">
  ↗
</div>
        </div>

        {/* Project Information */}
        <div className="mt-7 flex items-start justify-between gap-6">
  <div>
    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] transition-opacity duration-300 group-hover:opacity-60">
  {project.title}
</h3>

    <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-black/40">
  {project.client}
</p>
  </div>

  <span className="pt-1 text-lg font-medium tracking-[0.18em] text-black/45">
  {project.year}
</span>
</div>
      </article>
        </Link>
  </RevealImage>
)
}