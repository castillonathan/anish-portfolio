"use client"

import { motion } from "framer-motion"

type RevealImageProps = {
  children: React.ReactNode
  delay?: number
}

export default function RevealImage({
  children,
  delay = 0,
}: RevealImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}