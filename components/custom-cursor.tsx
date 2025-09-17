"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isOverFooter, setIsOverFooter] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === "div") {
        setIsHovering(true)
      }
      
      // Check if hovering over footer
      const footer = target.closest('footer')
      if (footer) {
        setIsOverFooter(true)
      }
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === "div") {
        setIsHovering(false)
      }
      
      // Check if leaving footer
      const footer = target.closest('footer')
      if (footer) {
        setIsOverFooter(false)
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
      <svg
        viewBox="0 0 24 24"
        className={`w-full h-full transition-all duration-300 ease-out ${
          isHovering ? "opacity-100" : "opacity-80"
        }`}
        style={{
          filter: isHovering 
            ? `drop-shadow(0 8px 20px ${isOverFooter ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)'})` 
            : `drop-shadow(0 2px 6px ${isOverFooter ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)'})`,
        }}
        aria-hidden="true"
      >
        <path
          d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
          fill={isOverFooter ? "#000000" : "#ffffff"}
        />
      </svg>
    </div>
  )
}
