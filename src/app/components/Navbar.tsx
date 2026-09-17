"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion" 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

useEffect(() => {
  const savedMode = localStorage.getItem("theme")

  if (savedMode === "dark") {
    document.documentElement.classList.add("dark")
    setDarkMode(true)
  }
}, [])

const toggleDarkMode = () => {
  const nextMode = !darkMode

  setDarkMode(nextMode)

  if (nextMode) {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }
}

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-[calc(1rem+env(safe-area-inset-top))] md:px-10 md:py-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/10 dark:border-white/10 bg-[#f7f5f0]/90 px-6 py-3 backdrop-blur-md dark:border-white/10 dark:bg-[#171717]/90">
        
        {/* Logo */}
        <a
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          ANISH.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
  <a
    href="/"
    className="text-sm transition-opacity hover:opacity-50"
  >
    Home
  </a>

  <a
    href="/#work"
    className="text-sm transition-opacity hover:opacity-50"
  >
    Work
  </a>

  <a
    href="/#profile"
    className="text-sm transition-opacity hover:opacity-50"
  >
    Profile
  </a>

  <a
    href="/#contact"
    className="text-sm transition-opacity hover:opacity-50"
  >
    Contact
  </a>

  <button
    onClick={toggleDarkMode}
    aria-label="Toggle dark mode"
    className="flex h-9 w-16 items-center rounded-full border border-black/15 dark:border-white/15 bg-black/5 p-1 transition-colors dark:border-white/20 dark:bg-white/10"
  >
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs text-white shadow-sm transition-transform duration-300 dark:bg-white dark:text-black ${
        darkMode ? "translate-x-7" : "translate-x-0"
      }`}
    >
      {darkMode ? "☾" : "☀"}
    </span>
  </button>
</div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm text-white transition-transform duration-300 hover:scale-105 dark:bg-white dark:text-black md:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mx-6 mt-2 rounded-3xl border border-black/10 dark:border-white/10 bg-[#f7f5f0] p-7 md:hidden"
    >
      <motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  }}
  className="flex flex-col gap-5"
>
  <motion.a
    href="/"
    onClick={() => setMenuOpen(false)}
    variants={{
      hidden: { opacity: 0, x: -10 },
      visible: { opacity: 1, x: 0 },
    }}
    whileHover={{ x: 5, opacity: 0.6 }}
    whileTap={{ scale: 0.98 }}
  >
    Home
  </motion.a>

  <motion.a
    href="/#work"
    onClick={() => setMenuOpen(false)}
    variants={{
      hidden: { opacity: 0, x: -10 },
      visible: { opacity: 1, x: 0 },
    }}
    whileHover={{ x: 5, opacity: 0.6 }}
    whileTap={{ scale: 0.98 }}
  >
    Work
  </motion.a>

  <motion.a
    href="/#profile"
    onClick={() => setMenuOpen(false)}
    variants={{
      hidden: { opacity: 0, x: -10 },
      visible: { opacity: 1, x: 0 },
    }}
    whileHover={{ x: 5, opacity: 0.6 }}
    whileTap={{ scale: 0.98 }}
  >
    Profile
  </motion.a>

  <motion.a
    href="/#contact"
    onClick={() => setMenuOpen(false)}
    variants={{
      hidden: { opacity: 0, x: -10 },
      visible: { opacity: 1, x: 0 },
    }}
    whileHover={{ x: 5, opacity: 0.6 }}
    whileTap={{ scale: 0.98 }}
  >
    Contact
  </motion.a>
</motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </header>
  )
}