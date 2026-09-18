import Link from "next/link"

import Navbar from "@/src/app/components/Navbar"
import Reveal from "@/src/app/components/Reveal"
import ProjectItems from "@/src/app/components/ProjectItems"

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

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params

  const projects = await getProjects()

  const project = projects.find(
    (project) => project.slug === slug
  )

  if (!project) {
    return {
      title: "Project Not Found — Anish Singhal",
    }
  }

  const title = `${project.title} — Anish Singhal`
  const description =
    project.description ||
    `${project.title} — Graphic design project by Anish Singhal.`

  const url = `https://anish-portfolio-beige.vercel.app/work/${project.slug}`

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
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
      <>
        <Navbar />

        <main className="flex min-h-screen items-center px-5 py-32 sm:px-6 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
              404 — Not Found
            </p>

            <h1 className="mt-6 text-[18vw] font-bold leading-[0.8] tracking-[-0.07em] sm:text-7xl md:text-9xl">
              Project
              <br />
              not found.
            </h1>

            <p className="mt-8 max-w-md text-sm leading-[1.6] text-black/50 dark:text-white/50 sm:text-base">
              The project you're looking for doesn't exist or may have
              been moved.
            </p>

            <Link
              href="/#work"
              className="mt-10 inline-flex rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
            >
              ← Back to Work
            </Link>
          </div>
        </main>
      </>
    )
  }
  const items = await getProjectItems(project.id)
  const coverImage = await getProjectCover(project.id)

  const assetsByItem: Record<
    number,
    Awaited<ReturnType<typeof getProjectAssets>>
  > = {}

  for (const item of items) {
    assetsByItem[item.id] = await getProjectAssets(item.id)
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen px-5 py-32 sm:px-6 sm:py-40 md:px-10">
        <div className="mx-auto max-w-7xl">
          <a
            href="/#work"
            className="mb-10 inline-flex text-sm font-medium text-black/45 transition-all duration-300 hover:translate-x-1 hover:text-black dark:text-white/45 dark:hover:text-white sm:mb-14"
          >
            ← Back to Work
          </a>
          <p className="text-sm uppercase tracking-[0.25em] text-black/50 dark:text-white/50">
            {project.client}
          </p>

          <Reveal>
            <h1 className="text-[14vw] font-bold leading-[0.85] tracking-[-0.06em] sm:text-6xl md:text-9xl">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-sm font-normal leading-[1.6] tracking-normal text-black/50 dark:text-white/50 md:text-base">
              {project.description}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:mt-16 sm:gap-x-6 md:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-black/40 dark:text-white/40">
                  Year
                </p>
                <p className="mt-2 text-sm font-medium tracking-[-0.01em] sm:mt-3 sm:text-base">{project.year}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-black/40 dark:text-white/40">
                  Role
                </p>
                <p className="mt-2 text-sm font-medium tracking-[-0.01em] sm:mt-3 sm:text-base">{project.role}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-black/40 dark:text-white/40">
                  Tools
                </p>
                <p className="mt-2 text-sm font-medium tracking-[-0.01em] sm:mt-3 sm:text-base">{project.tools}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-black/40 dark:text-white/40">
                  Items
                </p>
                <p className="mt-2 text-sm font-medium tracking-[-0.01em] sm:mt-3 sm:text-base">{items.length}</p>
              </div>
            </div>
          </Reveal>
          {coverImage && (
            <Reveal delay={0.45}>
              <div className="mt-20 flex justify-center sm:mt-32">
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

          <ProjectItems
            items={items}
            assetsByItem={assetsByItem}
          />

          <div className="mt-24 border-t border-black/10 dark:border-white/10 pt-8 sm:mt-32">
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
                        <span className="text-sm text-black/40 dark:text-white/40">
                          Previous
                        </span>

                        <p className="mt-2 text-base font-medium sm:text-lg transition-opacity group-hover:opacity-50">
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
                        <span className="text-sm text-black/40 dark:text-white/40">
                          Next
                        </span>

                        <p className="mt-2 text-base font-medium sm:text-lg transition-opacity group-hover:opacity-50">
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