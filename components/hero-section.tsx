"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
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
      {/* Video Background */}
      <div className="absolute inset-0 rounded-b-[20px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/0910.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Vertical Line on Left Side */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-32 bg-white/60 z-30"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
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
          <Reveal>
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight mb-6">
              <span className="whitespace-nowrap inline-block">
                <AnimatedText text="Craft ideas for" delay={0.5} />
              </span>
              <br />
              <span className="italic font-light whitespace-nowrap text-3xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl">
                <AnimatedText text="spaces that breathe." delay={1.1} />
              </span>
            </h1>
          </Reveal>

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

      {/* Info Strip - Now without BlurPanel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="mx-6 mb-6 px-8 py-6 text-center text-white/90">
          <p className="text-sm leading-relaxed">
            We are AIVS Labs — an engineering collective crafting AI solutions and transformative experiences.
            <br />
            Rooted in Bangalore, India. Innovating since 2023."
          </p>
        </div>
      </motion.div>
    </section>
  )
}
