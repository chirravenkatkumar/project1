"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const menuItems = [
    { label: "Home", action: scrollToTop },
    { label: "Our Craft", action: () => scrollToSection("featured-products") },
    { label: "Our Method", action: () => scrollToSection("materials") },
    { label: "Our Promise", action: () => scrollToSection("what-we-deliver") },
    { label: "Talk to Us", action: () => scrollToSection("lets-work-together") },
  ]

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-transparent" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-start h-12 lg:h-16 relative">
          {/* Logo */}
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <a href="#" aria-label="LABS Studio Home" onClick={scrollToTop}>
              <Image
                src="/labs-logo.png"
                alt="LABS"
                width={360}
                height={144}
                className="h-28 lg:h-32 w-auto"
                priority
              />
            </a>
          </motion.div>

          {/* Menu Button */}
          <motion.button
            className="absolute right-0 flex flex-col justify-center items-end w-8 h-8 lg:w-10 lg:h-10 group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Top line */}
            <motion.div
              className={cn("w-6 h-0.5 mb-1.5 transition-all duration-300", isScrolled ? "bg-neutral-900" : "bg-white")}
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
            />

            <motion.div 
              className="relative mb-1.5 overflow-visible"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
            >
              <div
                className={cn(
                  "w-[25vw] h-0.5 transition-all duration-300",
                  isScrolled
                    ? "bg-gradient-to-l from-neutral-900 to-transparent"
                    : "bg-gradient-to-l from-white to-transparent",
                )}
              />
            </motion.div>

            {/* Bottom line */}
            <motion.div 
              className={cn("w-4 h-0.5 transition-all duration-300", isScrolled ? "bg-neutral-900" : "bg-white")} 
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Navigation Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="absolute top-20 right-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 min-w-[320px] shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              <nav className="space-y-6">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={item.action}
                    className="block w-full text-left text-white/80 hover:text-white transition-all duration-300 py-3 px-4 text-lg font-medium rounded-xl hover:bg-white/5 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative">
                      {item.label}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-white/60 rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
