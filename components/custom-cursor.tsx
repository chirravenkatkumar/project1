"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === "div") {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === "div") {
        setIsHovering(false)
      }
    }

    // Add mouse move listener
    window.addEventListener("mousemove", updateMousePosition)

    // Add hover listeners to all divs
    const divs = document.querySelectorAll("div")
    divs.forEach((div) => {
      div.addEventListener("mouseenter", handleMouseEnter)
      div.addEventListener("mouseleave", handleMouseLeave)
    })

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      divs.forEach((div) => {
        div.removeEventListener("mouseenter", handleMouseEnter)
        div.removeEventListener("mouseleave", handleMouseLeave)
      })
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-300 ease-out ${
        isHovering ? "w-20 h-20 -translate-x-10 -translate-y-10" : "w-4 h-4 -translate-x-2 -translate-y-2"
      }`}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
    >
      <div
        className={`w-full h-full rounded-full transition-all duration-300 ease-out ${
          isHovering ? "bg-white/10 backdrop-blur-sm shadow-2xl" : "bg-white/60"
        }`}
        style={{
          backdropFilter: isHovering ? "blur(2px) brightness(1.5) contrast(1.3) saturate(1.2)" : "none",
          background: isHovering
            ? `radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`
            : undefined,
        }}
      />
    </div>
  )
}
