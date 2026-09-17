"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const TEXT_SELECTOR =
  "p, h1, h2, h3, h4, h5, h6, a, button, span, li, label"

export default function CursorTracer() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  const [overText, setOverText] = useState(false)

  useEffect(() => {
    let activeTextElements: HTMLElement[] = []

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event

      setMousePosition({
        x: clientX,
        y: clientY,
      })

      const tracerRadius = 76

      const textElements = Array.from(
        document.querySelectorAll<HTMLElement>(TEXT_SELECTOR)
      )

      const overlappingTextElements = textElements.filter((element) => {
        const rect = element.getBoundingClientRect()

        return (
          clientX + tracerRadius > rect.left &&
          clientX - tracerRadius < rect.right &&
          clientY + tracerRadius > rect.top &&
          clientY - tracerRadius < rect.bottom
        )
      })

      activeTextElements.forEach((element) => {
        if (!overlappingTextElements.includes(element)) {
          element.classList.remove("cursor-text-active")
        }
      })

     overlappingTextElements.forEach((element) => {
  const isInsideButton = element.closest("button") !== null

  if (!isInsideButton) {
    element.classList.add("cursor-text-active")
  }
})

      activeTextElements = overlappingTextElements

      setOverText(overlappingTextElements.length > 0)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)

      activeTextElements.forEach((element) => {
        element.classList.remove("cursor-text-active")
      })
    }
  }, [])

  return (
    <motion.div
      animate={{
        x: mousePosition.x - 76,
        y: mousePosition.y - 76,
      }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 18,
        mass: 0.1,
      }}
      style={{
        opacity: overText ? 0.08 : 0.75,
      }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-38 w-38 rounded-full bg-[#ff5a36] md:block"
    />
  )
}