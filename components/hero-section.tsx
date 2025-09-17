"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Reveal } from "./reveal"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const contentRotateX = useTransform(scrollYProgress, [0, 1], [0, -15])
  const contentZ = useTransform(scrollYProgress, [0, 1], [0, 100])

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
    <section ref={containerRef} className="relative h-screen overflow-hidden rounded-b-[20px] bg-black">
      {/* Image Background replacing video */}
      <div className="absolute inset-0 rounded-b-[20px] overflow-hidden">
        <Image src="/26580.jpg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/60 supports-[backdrop-filter]:bg-black/50 backdrop-blur-lg" />
      </div>

      {/* Spline 3D Model Overlay */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none mix-blend-screen brightness-150 contrast-125"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.0, ease: "easeInOut" }}
      >
        <iframe
          src="https://my.spline.design/cubeandballs-GvDkzk4LDCMY1wT8GpTB9Oga/"
          title="AIVS Labs 3D"
          frameBorder={0}
          className="w-full h-full"
        />
      </motion.div>

      {/* Vertical line removed */}

      {/* Content */}
      <motion.div
        className="relative z-30 h-full flex items-center justify-center"
        style={{
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
          rotateX: contentRotateX,
          z: contentZ,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <div className="container-custom text-center text-white">
          <Reveal delay={0.2}>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              AIVS LABS is a design studio that crafts ideas for spaces that breathe.
            </motion.p>
          </Reveal>
        </div>
      </motion.div>

      {/* Contact Us Button - Bottom Right */}
      <motion.div
        className="absolute bottom-6 right-6 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <button className="bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          Contact Us Now
        </button>
      </motion.div>

      {/* Info Strip - Now without BlurPanel */}
      <motion.div
        className="absolute bottom-24 md:bottom-0 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="mx-6 mb-6 px-8 py-6 text-center text-white/90">
          <p className="text-sm leading-relaxed">
            We are AIVS Labs — an engineering collective crafting AI solutions and transformative experiences.
            <br />
            Rooted in Hyderabad, India. Innovating since 2025."
          </p>
        </div>
      </motion.div>
    </section>
  )
}
