import Link from "next/link"

import Navbar from "@/src/app/components/Navbar"
import Reveal from "@/src/app/components/Reveal"
import RevealImage from "@/src/app/components/RevealImage"

import {
  getProjects,
  getProjectItems,
  getProjectAssets,
  getProjectCover,
} from "@/src/app/lib/portfolio"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({
  params,
}: PageProps) {
  const { slug } = await params

  const projects = await getProjects()

  const project = projects.find(
    (project) => project.slug === slug
  )

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          Project not found
        </h1>
      </main>
    )
  }

  const items = await getProjectItems(project.id)
  const coverImage = await getProjectCover(project.id)

  return (
  <>
    <Navbar />

    <main className="min-h-screen px-6 py-40 md:px-10">
      <div className="mx-auto max-w-7xl">
            <a
                 href="/#work"
                className="mb-14 inline-flex text-sm font-medium text-black/45 transition-all duration-300 hover:translate-x-1 hover:text-black"
             >
                ← Back to Work
             </a>
        <p className="text-sm uppercase tracking-[0.25em] text-black/50">
          {project.client}
        </p>

        <Reveal>
  <h1 className="text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-9xl">
    {project.title}
  </h1>
</Reveal>

        <Reveal delay={0.15}>
  <p className="mt-6 max-w-2xl text-sm font-normal leading-[1.6] tracking-normal text-black/50 md:text-base">
    {project.description}
  </p>
</Reveal>

<Reveal delay={0.3}>
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
  <div>
    <p className="text-xs uppercase tracking-wider text-black/40">
      Year
    </p>
    <p className="mt-3 font-medium tracking-[-0.01em]">{project.year}</p>
  </div>

  <div>
    <p className="text-xs uppercase tracking-wider text-black/40">
      Role
    </p>
    <p className="mt-3 font-medium tracking-[-0.01em]">{project.role}</p>
  </div>

  <div>
    <p className="text-xs uppercase tracking-wider text-black/40">
      Tools
    </p>
    <p className="mt-3 font-medium tracking-[-0.01em]">{project.tools}</p>
  </div>

  <div>
    <p className="text-xs uppercase tracking-wider text-black/40">
      Items
    </p>
    <p className="mt-3 font-medium tracking-[-0.01em]">{items.length}</p>
  </div>
</div>
</Reveal>
{coverImage && (
  <Reveal delay={0.45}>
    <div className="mt-32 flex justify-center">
      <div className="w-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-black/5 md:rounded-[2.5rem]">
        <img
          src={coverImage}
          alt={project.title}
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  </Reveal>
)}

<div className="mt-32 space-y-28">
  {items.map(async (item) => {
    const assets = await getProjectAssets(item.id)

    return (
      <Reveal key={item.id}>
  <section className="border-t border-black/5 pt-12">
        <h2 className="mb-6 text-4xl font-bold leading-[0.95] tracking-[-0.04em] md:text-5xl">
          {item.title}
        </h2>

        <p className="mb-10 max-w-2xl text-lg font-normal leading-[1.6] tracking-normal text-black/50">
  {item.description}
</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {assets.map((asset) => (
            <RevealImage key={asset.id}>
  <div
    
    className="group overflow-hidden rounded-[2.5rem] bg-black/5"
  >
              {asset.asset_type === "video" ? (
                <video
                  src={asset.file_url || ""}
                  controls
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                <img
                  src={asset.file_url || ""}
                  alt={asset.alt_text || asset.title}
                  className="h-auto max-h-[600px] w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] md:max-h-[700px]"
                />
              )}
            </div>
            </RevealImage>
          ))}
        </div>
        
        </section>
</Reveal>
    )
  })}
</div>

<div className="mt-32 border-t border-black/10 pt-8">
  <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

    {(() => {
      const currentIndex = projects.findIndex(
        (p) => p.id === project.id
      )

      const previousProject = projects[currentIndex - 1]
      const nextProject = projects[currentIndex + 1]

      return (
        <>
          {previousProject ? (
            <Link
              href={`/work/${previousProject.slug}`}
              className="group"
            >
              <span className="text-sm text-black/40">
                Previous
              </span>

              <p className="mt-2 text-lg font-medium transition-opacity group-hover:opacity-50">
                ← {previousProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group text-right"
            >
              <span className="text-sm text-black/40">
                Next
              </span>

              <p className="mt-2 text-lg font-medium transition-opacity group-hover:opacity-50">
                {nextProject.title} →
              </p>
            </Link>
          ) : (
            <div />
          )}
        </>
      )
    })()}

  </div>
</div>

      </div>
    </main>
  </>
  )
}