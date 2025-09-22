"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering] = useState(false)
  const [isOverFooter] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Add mouse move listener only
    window.addEventListener("mousemove", updateMousePosition)
    // Do not hide default cursor
    document.body.style.cursor = "auto"

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-300 ease-out w-3 h-3 -translate-x-1.5 -translate-y-1.5`}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-full h-full transition-all duration-300 ease-out opacity-80`}
        style={{
          filter: `drop-shadow(0 2px 6px ${isOverFooter ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)'})`,
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
