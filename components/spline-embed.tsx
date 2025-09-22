"use client"

import { useEffect, useRef, useState } from "react"

type SplineEmbedProps = {
  src: string
  className?: string
}

export default function SplineEmbed({ src, className }: SplineEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { root: null, rootMargin: "0px", threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {isVisible ? (
        <iframe
          src={src}
          title="Spline Scene"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      ) : (
        <div className="w-full h-full bg-black/50 animate-pulse" />
      )}
    </div>
  )
}


