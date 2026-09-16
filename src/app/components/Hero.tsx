"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 md:px-10">
      
      {/* Interactive Orange Orb */}
      <motion.div
  animate={{ x: mousePosition.x - 90, y: mousePosition.y - 90 }}
  transition={{ type: "spring", stiffness: 110, damping: 18, mass: 0.1 }}
  className="pointer-events-none fixed left-0 top-0 z-0 hidden h-38 w-38 rounded-full bg-[#ff5a36] opacity-75 blur-[2px] md:block"
/>

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* Small Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-7 text-xs font-medium uppercase tracking-[0.3em] text-black/40 md:text-sm"  
        >
          Graphic Designer · Visual Designer · UI/UX
        </motion.p>

        {/* Main Heading */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
           className="max-w-6xl text-[clamp(3.5rem,12vw,11rem)] font-bold leading-[0.8] tracking-[-0.07em]"
          >
            ANISH
            <br />
            SINGHAL
          </motion.h1>
        </div>

        {/* Bottom Content */}
        <div className="mt-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-md text-lg leading-relaxed text-black/60 md:max-w-lg"
          >
            Creating bold visual experiences through graphic design,
            branding, digital design, and creative storytelling.
          </motion.p>

          <motion.a
            href="#work"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-black/80"
          >
            Explore my work ↓
          </motion.a>

        </div>
      </div>
    </section>
  )
}