"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Reveal } from "./reveal"

const collections = [
  {
    id: "modern-seating",
    name: "MODERN SEATING",
    image: "/modern-armchair-pillows.png",
    count: "8 pieces",
    description: "Sleek lines meet ultimate comfort in our contemporary seating collection",
  },
  {
    id: "modular-design",
    name: "MODULAR DESIGN",
    image: "/modular-cushion-bench.png",
    count: "6 pieces",
    description: "Adaptable furniture that transforms with your lifestyle and space",
  },
  {
    id: "cloud-collection",
    name: "CLOUD COLLECTION",
    image: "/cloud-white-sofa.png",
    count: "4 pieces",
    description: "Soft, dreamy pieces that float like clouds in your living space",
  },
  {
    id: "artistic-pieces",
    name: "ARTISTIC PIECES",
    image: "/distressed-artistic-chair.png",
    count: "5 pieces",
    description: "Where art meets function in bold, statement-making designs",
  },
  {
    id: "contemporary",
    name: "CONTEMPORARY",
    image: "/green-modular-loveseat.png",
    count: "7 pieces",
    description: "Clean aesthetics with a modern twist for today's living",
  },
  {
    id: "textural-craft",
    name: "TEXTURAL CRAFT",
    image: "/braided-rope-loveseat.png",
    count: "3 pieces",
    description: "Handcrafted textures that tell stories of artisan mastery",
  },
  {
    id: "maximalist-art",
    name: "MAXIMALIST ART",
    image: "/colorful-patchwork-sofa.png",
    count: "4 pieces",
    description: "Bold colors and patterns for those who dare to be different",
  },
  {
    id: "scandinavian-comfort",
    name: "SCANDINAVIAN COMFORT",
    image: "/minimalist-boucle-loveseat.png",
    count: "6 pieces",
    description: "Nordic simplicity meets cozy comfort in timeless designs",
  },
  {
    id: "abstract-forms",
    name: "ABSTRACT FORMS",
    image: "/abstract-artistic-sofa.png",
    count: "5 pieces",
    description: "Sculptural furniture that challenges conventional design boundaries",
  },
  {
    id: "luxury-textures",
    name: "LUXURY TEXTURES",
    image: "/textured-cream-loveseat.png",
    count: "8 pieces",
    description: "Premium materials and rich textures for sophisticated interiors",
  },
]

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)
  const [maxDrag, setMaxDrag] = useState(0)
  const [currentDragX, setCurrentDragX] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const itemWidth = 320
    const totalWidth = collections.length * (itemWidth + 32) - 32
    const containerWidth = window.innerWidth
    const calculatedMaxDrag = Math.max(0, totalWidth - containerWidth + 48)
    setMaxDrag(calculatedMaxDrag)
  }, [])

  useEffect(() => {
    const itemWidth = 352 // 320px + 32px gap
    const newIndex = Math.round(Math.abs(currentDragX) / itemWidth)
    setActiveIndex(Math.min(newIndex, collections.length - 1))
  }, [currentDragX])

  const scrollToCollection = (index: number) => {
    const itemWidth = 352 // 320px + 32px gap
    const targetX = -index * itemWidth
    const clampedX = Math.max(-maxDrag, Math.min(0, targetX))
    dragX.set(clampedX)
    setCurrentDragX(clampedX)
    setActiveIndex(index)
  }

  const scrollLeft = () => {
    const currentX = dragX.get()
    const newX = Math.min(0, currentX + 704)
    dragX.set(newX)
    setCurrentDragX(newX)
  }

  const scrollRight = () => {
    const currentX = dragX.get()
    const newX = Math.max(-maxDrag, currentX - 704)
    dragX.set(newX)
    setCurrentDragX(newX)
  }

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden" id="what-we-deliver">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-6xl font-normal">What We Deliver Previously</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our expertize works, where every project reflects innovation, precision, and our unique design philosophy.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          disabled={currentDragX >= 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={scrollRight}
          disabled={currentDragX <= -maxDrag}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <motion.div
          ref={scrollContainerRef}
          className="flex gap-8 px-6"
          style={{ x: dragX }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
          onDrag={(event, info) => {
            dragX.set(info.offset.x)
            setCurrentDragX(info.offset.x)
          }}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="flex-shrink-0 w-80 group cursor-pointer relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ filter: "blur(1px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                </motion.div>

                <motion.div
                  className="absolute inset-0 bg-violet-500/20 backdrop-blur-md border border-violet-400/30 rounded-2xl flex items-center justify-center p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="text-center text-white">
                    <h4 className="text-xl font-semibold mb-3 text-violet-100">{collection.name}</h4>
                    <p className="text-sm text-violet-200 leading-relaxed">{collection.description}</p>
                    <div className="mt-4 px-3 py-1 bg-violet-400/20 rounded-full inline-block">
                      <span className="text-xs text-violet-100">{collection.count}</span>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                  <motion.div
                    className="text-center text-white"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold tracking-wider mb-2">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.count}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {collections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCollection(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
              activeIndex === index
                ? "bg-white border-white shadow-lg"
                : "bg-transparent border-white/40 hover:border-white/60"
            }`}
            aria-label={`Go to collection ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
