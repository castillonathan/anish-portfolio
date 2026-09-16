"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion" 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-6 py-5 md:px-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/10 bg-[#f7f5f0]/90 px-6 py-3 backdrop-blur-md">
        
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
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm text-white transition-transform duration-300 hover:scale-105 md:hidden"
          aria-label="Toggle menu"
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
      className="mx-6 mt-2 rounded-3xl border border-black/10 bg-[#f7f5f0] p-7 md:hidden"
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