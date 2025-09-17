"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Reveal } from "./reveal"

const collections = [
  {
    id: "modern-seating",
    name: "KFC Ad Video",
    image: "/KFCAD.jpg",
    count: "8 pieces",
    description: "From idea to ad in moments with AI-powered magic for KFC campaigns.",
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

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
    const n = collections.length
    const current = typeof expandedIndex === "number" ? expandedIndex : activeIndex
    const next = (current - 1 + n) % n
    setExpandedIndex(next)
    scrollToCollection(next)
  }

  const scrollRight = () => {
    const n = collections.length
    const current = typeof expandedIndex === "number" ? expandedIndex : activeIndex
    const next = (current + 1) % n
    setExpandedIndex(next)
    scrollToCollection(next)
  }

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden" id="what-we-deliver">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-white mb-4 text-6xl font-normal">What We Deliver Previously</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Explore our expertize works, where every project reflects innovation, precision, and our unique design philosophy.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300"
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
          onDragEnd={() => {
            const itemWidth = 352
            const newIndex = Math.round(Math.abs(dragX.get()) / itemWidth)
            const clamped = Math.min(Math.max(newIndex, 0), collections.length - 1)
            setExpandedIndex(clamped)
            scrollToCollection(clamped)
          }}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className={`flex-shrink-0 group cursor-pointer relative transition-all duration-300 ${
                expandedIndex === index ? "w-[500px]" : "w-[320px]"
              }`}
              onClick={() => {
                setExpandedIndex((prev) => (prev === index ? null : index))
                scrollToCollection(index)
              }}
              whileHover={{ scale: expandedIndex === index ? 1 : 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4 shadow-lg">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 500px, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />

                {/* Collapsed title */}
                <div className={`absolute left-0 right-0 bottom-0 z-10 px-6 pb-3 pt-4 text-white transition-all duration-300 ${
                  expandedIndex === index ? "translate-y-0" : "translate-y-[calc(100%-54px)]"
                }`}>
                  <h3 className="text-3xl font-bold tracking-wider mb-2">{collection.name}</h3>
                  <p className={`text-sm text-white/90 transition-opacity duration-300 ${
                    expandedIndex === index ? "opacity-100" : "opacity-0"
                  }`}>
                    {collection.description}
                  </p>
                  <div className={`mt-3 inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs transition-opacity duration-300 ${
                    expandedIndex === index ? "opacity-100" : "opacity-0"
                  }`}>
                    {collection.count}
                  </div>
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
            onClick={() => {
              setExpandedIndex(index)
              scrollToCollection(index)
            }}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
              (typeof expandedIndex === 'number' ? expandedIndex : activeIndex) === index
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
