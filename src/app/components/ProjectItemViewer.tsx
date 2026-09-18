"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Asset = {
  id: number
  title: string
  file_url?: string | null
  asset_type?: string | null
  alt_text?: string | null
}

type ProjectItemViewerProps = {
  item: {
    id: number
    title: string
    description?: string | null
  } | null
  assets: Asset[]
  onClose: () => void
}

export default function ProjectItemViewer({
  item,
  assets,
  onClose,
}: ProjectItemViewerProps) {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(
    null
  )

  const selectedAsset =
    selectedAssetIndex !== null
      ? assets[selectedAssetIndex]
      : null

  // Close the asset viewer whenever the project item viewer closes
  useEffect(() => {
    if (!item) {
      setSelectedAssetIndex(null)
    }
  }, [item])

  // Keyboard controls
  useEffect(() => {
    if (!item) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // If an asset is open, control the asset viewer first
      if (selectedAssetIndex !== null) {
        if (event.key === "Escape") {
          setSelectedAssetIndex(null)
          return
        }

        if (event.key === "ArrowLeft") {
          setSelectedAssetIndex((current) => {
            if (current === null || assets.length === 0) return current
            return (current - 1 + assets.length) % assets.length
          })
          return
        }

        if (event.key === "ArrowRight") {
          setSelectedAssetIndex((current) => {
            if (current === null || assets.length === 0) return current
            return (current + 1) % assets.length
          })
          return
        }

        return
      }

      // Otherwise Escape closes the Project Item Viewer
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [item, selectedAssetIndex, assets.length, onClose])

  // Prevent background page scrolling while either viewer is open
  useEffect(() => {
    if (!item) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [item])

  const closeAssetViewer = () => {
    setSelectedAssetIndex(null)
  }

  const showPreviousAsset = () => {
    setSelectedAssetIndex((current) => {
      if (current === null || assets.length === 0) return current
      return (current - 1 + assets.length) % assets.length
    })
  }

  const showNextAsset = () => {
    setSelectedAssetIndex((current) => {
      if (current === null || assets.length === 0) return current
      return (current + 1) % assets.length
    })
  }

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Project Item Viewer */}
          <motion.div
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] bg-[#f7f5f0] dark:bg-[#171717] sm:rounded-[2rem]"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10 sm:px-7 sm:py-5">
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                  {item.title}
                </h2>

                {item.description && (
                  <p className="mt-1 max-w-xl text-xs leading-[1.5] text-black/45 dark:text-white/45 sm:text-sm">
                    {item.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close viewer"
                className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-lg text-white transition-transform duration-300 hover:scale-105 dark:bg-white dark:text-black"
              >
                ×
              </button>
            </div>

            {/* Assets */}
            <div className="overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                {assets.map((asset, index) => (
                  <motion.button
                    key={asset.id}
                    type="button"
                    onClick={() => setSelectedAssetIndex(index)}
                    className="group block w-full overflow-hidden rounded-[1rem] bg-black/5 text-left dark:bg-white/5 sm:rounded-[1.5rem]"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {asset.asset_type === "video" ? (
                      <div className="relative">
                        <video
                          src={asset.file_url || ""}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-auto w-full"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            ▶
                          </span>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={asset.file_url || ""}
                        alt={asset.alt_text || asset.title}
                        className="h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {assets.length === 0 && (
                <div className="flex min-h-40 items-center justify-center">
                  <p className="text-sm text-black/40 dark:text-white/40">
                    No assets available.
                  </p>
                </div>
              )}
            </div>

            {/* Asset Viewer */}
            <AnimatePresence>
              {selectedAsset && selectedAssetIndex !== null && (
                <motion.div
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={closeAssetViewer}
                >
                  <motion.div
                    className="relative flex h-full w-full flex-col"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {/* Asset Header */}
                    <div className="flex shrink-0 items-center justify-between text-white">
                      <div>
                        <p className="text-sm font-medium sm:text-base">
                          {selectedAsset.title}
                        </p>

                        <p className="mt-1 text-xs text-white/50">
                          {selectedAssetIndex + 1} / {assets.length}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={closeAssetViewer}
                        aria-label="Close asset viewer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-black transition-transform duration-300 hover:scale-105"
                      >
                        ×
                      </button>
                    </div>

                    {/* Asset */}
                    <div className="relative flex min-h-0 flex-1 items-center justify-center py-6 sm:py-8">
                      {selectedAsset.asset_type === "video" ? (
                        <video
                          src={selectedAsset.file_url || ""}
                          controls
                          autoPlay
                          playsInline
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <img
                          src={selectedAsset.file_url || ""}
                          alt={
                            selectedAsset.alt_text || selectedAsset.title
                          }
                          className="max-h-full max-w-full object-contain"
                        />
                      )}

                      {/* Previous */}
                      {assets.length > 1 && (
                        <button
                          type="button"
                          onClick={showPreviousAsset}
                          aria-label="Previous asset"
                          className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-black transition-all duration-300 hover:scale-105 sm:left-2 sm:h-12 sm:w-12"
                        >
                          ←
                        </button>
                      )}

                      {/* Next */}
                      {assets.length > 1 && (
                        <button
                          type="button"
                          onClick={showNextAsset}
                          aria-label="Next asset"
                          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-black transition-all duration-300 hover:scale-105 sm:right-2 sm:h-12 sm:w-12"
                        >
                          →
                        </button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}