"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    image: string
    badge?: "New" | "Back in stock" | "Limited"
    description: string
  }
  onQuickLook: (product: any) => void
}

export function ProductCard({ product, onQuickLook }: ProductCardProps) {
  return (
    <motion.div
      className="group relative bg-white overflow-hidden cursor-pointer"
      style={{
        borderRadius: "24px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
      }}
      layout
      onClick={() => onQuickLook(product)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-20">
          <span
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm",
              product.badge === "New" && "bg-green-500/90 text-white",
              product.badge === "Back in stock" && "bg-blue-500/90 text-white",
              product.badge === "Limited" && "bg-amber-500/90 text-white",
            )}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "25/36" }}>
        <div className="relative w-full h-full">
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>
      </div>

      {/* Service Info Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="relative z-10">
          {/* Service Title - Big faded letters */}
          <motion.h3 
            className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {product.name}
          </motion.h3>
          
          {/* Service Description */}
          <motion.p 
            className="text-sm text-white/90 leading-relaxed max-w-sm md:block line-clamp-2 md:line-clamp-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {product.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
