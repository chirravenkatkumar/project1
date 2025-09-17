"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"

const materials = [
  {
    id: "pistachio",
    step: "Step 1",
    name: "Exploration",
    description: "We immerse ourselves in your world. A collaborative session where your challenges meet our creative insights.",
    image: "/material-oak-macro.png",
    backgroundImage: "/image1.jpg",
    tint: "bg-green-50",
  },
  {
    id: "lunar",
    step: "Step 2",
    name: "Strategy",
    description: "We develop a customized roadmap aligned with your goals and budget – clear, actionable, and precise.",
    image: "/material-walnut-macro.png",
    backgroundImage: "/image3.jpg",
    tint: "bg-gray-100",
  },
  {
    id: "martian",
    step: "Step 3",
    name: "Implementation",
    description: "Time to bring ideas to life. Our team puts the plan into action, transforming concepts into tangible results.",
    image: "/material-steel-macro.png",
    backgroundImage: "/image4.jpg",
    tint: "bg-red-50",
  },
]

export function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState("pistachio")

  const activeMaterialData = materials.find((m) => m.id === activeMaterial) || materials[0]

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="materials">
      <div className="absolute inset-0 z-0">
        {materials.map((material) => (
          <motion.div
            key={material.id}
            className="absolute inset-0"
            initial={{ opacity: material.id === activeMaterial ? 1 : 0 }}
            animate={{ opacity: material.id === activeMaterial ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              src={material.backgroundImage || "/placeholder.svg"}
              alt={`${material.name} background`}
              fill
              className="object-cover brightness-[.55] blur-[1px]"
              priority
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>

      <div className="absolute top-[120px] left-0 right-0 z-10">
        <div className="container-custom text-white">
          <Reveal>
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMaterial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Step Number - Italic Bold with Fade Effect */}
                  <motion.h3
                    className="font-bold italic mb-2 text-2xl lg:text-3xl"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    <AnimatedText text={activeMaterialData.step} delay={0.1} />
                  </motion.h3>
                  
                  {/* Main Heading */}
                  <motion.h2
                    className="font-bold mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                    style={{
                      textShadow: '0 4px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    <AnimatedText text={activeMaterialData.name} delay={0.2} />
                  </motion.h2>
                </motion.div>
              </AnimatePresence>
              
              {/* Description */}
              <motion.p 
                className="text-lg text-white/90 leading-relaxed max-w-2xl"
                key={`desc-${activeMaterial}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {activeMaterialData.description}
              </motion.p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-10 max-w-md hidden">
        <Reveal delay={0.3}>
          <blockquote className="pl-0 py-4">
            <p className="text-xl text-white leading-relaxed italic lg:text-base font-medium">
              "We believe in creating furniture that transcends trends—pieces that become more beautiful with age,
              carrying stories and memories through generations."
            </p>
            <footer className="mt-4 text-sm text-white/70">— KATACHI Studio</footer>
          </blockquote>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container-custom">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {materials.map((material) => (
                <motion.button
                  key={material.id}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-lg border border-white/20",
                    activeMaterial === material.id 
                      ? "bg-white/20 text-white shadow-lg shadow-white/10" 
                      : "bg-white/10 text-white/90 hover:bg-white/15 hover:text-white"
                  )}
                  onClick={() => setActiveMaterial(material.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {material.step}
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
