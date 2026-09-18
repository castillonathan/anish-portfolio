"use client"

import { useState } from "react"

import Reveal from "./Reveal"
import RevealImage from "./RevealImage"
import ProjectItemViewer from "./ProjectItemViewer"

type Asset = {
  id: number
  title: string
  file_url?: string | null
  asset_type?: string | null
  alt_text?: string | null
}

type ProjectItem = {
  id: number
  title: string
  description?: string | null
}

type ProjectItemsProps = {
  items: ProjectItem[]
  assetsByItem: Record<number, Asset[]>
}

export default function ProjectItems({
  items,
  assetsByItem,
}: ProjectItemsProps) {
  const [openItem, setOpenItem] = useState<ProjectItem | null>(null)

  return (
    <>
      <div className="mt-32 space-y-28">
        {items.map((item) => {
          const assets = assetsByItem[item.id] || []

          return (
            <Reveal key={item.id}>
              <section className="border-t border-black/5 pt-12 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setOpenItem(item)}
                  className="group block w-full text-left"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.04em] transition-opacity duration-300 group-hover:opacity-60 md:text-5xl">
                        {item.title}
                      </h2>

                      {item.description && (
                        <p className="mt-6 max-w-2xl text-lg font-normal leading-[1.6] tracking-normal text-black/50 dark:text-white/50">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-xl text-white transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 dark:bg-white dark:text-black">
                      ↗
                    </span>
                  </div>
                </button>

                {/* Preview of the first asset */}
                {assets.length > 0 && (
                  <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10">
                    {assets.slice(0, 2).map((asset) => (
                      <RevealImage key={asset.id}>
                        <button
                          type="button"
                          onClick={() => setOpenItem(item)}
                          className="group block w-full overflow-hidden rounded-[1.5rem] bg-black/5 text-left dark:bg-white/5 sm:rounded-[2rem] md:rounded-[2.5rem]"
                        >
                          {asset.asset_type === "video" ? (
                            <video
                              src={asset.file_url || ""}
                              muted
                              playsInline
                              preload="metadata"
                              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                          ) : (
                            <img
                              src={asset.file_url || ""}
                              alt={asset.alt_text || asset.title}
                              className="h-auto max-h-[600px] w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] md:max-h-[700px]"
                            />
                          )}
                        </button>
                      </RevealImage>
                    ))}
                  </div>
                )}
              </section>
            </Reveal>
          )
        })}
      </div>

      <ProjectItemViewer
        item={openItem}
        assets={openItem ? assetsByItem[openItem.id] || [] : []}
        onClose={() => setOpenItem(null)}
      />
    </>
  )
}