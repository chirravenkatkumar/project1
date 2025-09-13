"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

const featuredProducts = [
  {
    id: "4",
    name: "AI & Innovation",
    image: "/service1.jpg",
    badge: "New" as const,
    description: "We design and deploy LLM models, craft advanced Generative AI solutions. Our expertise extends to voice cloning, conversational AI agents powered by n8n, and intelligent automation delivering future-ready solutions that elevate business intelligence and creativity.",
  },
  {
    id: "7",
    name: "Design & Experience",
    image: "/service2.jpg",
    badge: "New" as const,
    description: "We craft immersive 3D landing pages, sleek UI/UX designs, and interactive digital experiences that make your brand stand out. Our creative team delivers branding assets, motion graphics, marketing videos, and posters that blend design with storytelling to captivate your audience.",
  },
  {
    id: "8",
    name: "Tech & Development",
    image: "/service3.jpg",
    badge: "Limited" as const,
    description: "From full-stack websites to scalable applications and workflow automation, we engineer reliable solutions tailored to your business. Our expertise spans API integrations, cloud deployment, database management, and AI-powered backends, ensuring performance, security, and seamless digital transformation.",
  },
]

const companyLogos = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg" },
  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg" },
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
]

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section
      className="py-20 lg:py-32 bg-black text-white"
      id="featured-products"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="container-custom">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl mb-6 lg:text-6xl text-white">
              Trusted by <span className="italic font-light text-white">Industry Leaders</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-16">
              We collaborate with the world's most innovative companies to create exceptional design experiences.
            </p>

            {/* Auto-scrolling logos */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll">
                {/* First set of logos */}
                {companyLogos.map((company, index) => (
                  <div key={`first-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center h-16 w-32">
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      className="max-h-12 max-w-full object-contain filter brightness-0 invert opacity-40 hover:opacity-70 transition-opacity duration-300"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {companyLogos.map((company, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 mx-8 flex items-center justify-center h-16 w-32"
                  >
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      className="max-h-12 max-w-full object-contain filter brightness-0 invert opacity-40 hover:opacity-70 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl ring-1 ring-black/5">
          <Reveal>
            <div className="text-left mb-10">
              <h2 className="mb-4">
                <span className="text-5xl lg:text-7xl font-extrabold text-black tracking-tight">Our</span>{" "}
                <span className="text-4xl lg:text-6xl italic font-light text-neutral-700">Services</span>
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl">
                Discover our comprehensive range of services, each designed to elevate your business with cutting-edge technology and innovative solutions.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    },
                  },
                }}
              >
                <Reveal delay={index * 0.1}>
                  <ProductCard product={product} onQuickLook={handleQuickLook} />
                </Reveal>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
