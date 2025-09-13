import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BlurPanelProps {
  children: ReactNode
  className?: string
}

export function BlurPanel({ children, className }: BlurPanelProps) {
  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl shadow-black/25 will-change-transform block w-fit mx-auto",
        className,
      )}
      role="region"
    >
      {children}
    </div>
  )
}
