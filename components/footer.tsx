"use client"
import { motion } from "framer-motion"
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react"
import Image from "next/image" // Added Image import for logo

// Custom X Logo Component
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512" 
    width={size} 
    height={size}
    fill="currentColor"
  >
    <path d="M357.2 48L427.8 48 273.6 224.2 455 464 313 464 201.7 318.6 74.5 464 3.8 464 168.7 275.5-5.2 48 140.4 48 240.9 180.9 357.2 48zM332.4 421.8l39.1 0-252.4-333.8-42 0 255.3 333.8z"/>
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ]

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/aivslabs/" },
    { name: "X", icon: XIcon, href: "https://x.com/aivslabs" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/aivs-labs/" },
  ]

  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="container-custom py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          {/* Brand Section */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <Image src="/labs-footer-logo.png" alt="LABS" width={480} height={250} className="h-24 w-auto" />
              </div>
              <p className="mb-6 leading-relaxed text-neutral-700 max-w-md">
              AIVS Labs delivers Gen AI solutions, 3D landing pages, UI/UX, full-stack websites, and AI-powered marketing with videos, posters & content.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={18} />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Section - Right Side */}
          <div className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-row gap-6 text-right">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-neutral-900 transition-colors duration-200 group flex items-center justify-end text-neutral-700"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 pb-4 border-t border-neutral-200 flex justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-neutral-500 text-center">
            <p>&copy; {currentYear} AIVS Labs. All rights reserved.</p>
            <div className="flex space-x-6">
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
