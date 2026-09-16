"use client"

import { motion } from "framer-motion"

type PageTransitionProps = {
  children: React.ReactNode
}

export default function PageTransition({
  children,
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}