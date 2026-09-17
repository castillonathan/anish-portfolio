"use client"

import { motion } from "framer-motion"

export default function Hero() {

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 sm:px-6 md:min-h-screen md:px-10">


      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* Small Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-7 text-xs font-medium uppercase tracking-[0.3em] text-black/40 dark:text-white/40 md:text-sm"  
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
        <div className="mt-10 flex flex-col justify-between gap-8 sm:mt-14 md:flex-row md:items-end">  
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-md text-lg leading-relaxed text-black/50 dark:text-white/50 md:max-w-lg"
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
            className="w-fit rounded-full bg-black dark:bg-white px-8 py-4 text-sm font-medium text-white dark:text-black transition-all duration-300 hover:bg-black/80"
          >
            Explore my work ↓
          </motion.a>

        </div>
      </div>
    </section>
  )
}