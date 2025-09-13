"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Mail, User, Building, Settings } from "lucide-react"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import { AnimatedText } from "./animated-text"

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    service: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isValid, setIsValid] = useState(true)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateEmail(formData.email) && formData.name && formData.company && formData.service) {
      setIsSubmitted(true)
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setIsValid(true)
  }

  return (
    <section className="py-20 lg:py-32" id="lets-work-together">
      <div className="container-custom">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <BlurPanel className="p-8 lg:p-12 bg-white/40 backdrop-blur-md grain-texture">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4" style={{ color: "#000000" }}>
                  <span style={{ color: "#000000" }}>
                    <AnimatedText text="Let's work " delay={0.2} />
                  </span>
                  <span className="italic font-light text-black" style={{ color: "#1f2937" }}>
                    <AnimatedText text="together." delay={0.5} />
                  </span>
                </h2>
                <p className="text-lg text-black" style={{ color: "#374151" }}>
                  Tell us about your project and how we can help bring your vision to life.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={20} className="text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border rounded-full placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 text-slate-600 ${
                        !isValid ? "border-red-300 focus:ring-red-500" : "border-neutral-200"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={20} className="text-neutral-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Your email address"
                      className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border rounded-full placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 text-slate-500 ${
                        !isValid ? "border-red-300 focus:ring-red-500" : "border-neutral-200"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building size={20} className="text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Company name"
                      className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border rounded-full placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 text-slate-500 ${
                        !isValid ? "border-red-300 focus:ring-red-500" : "border-neutral-200"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                      <Settings size={20} className="text-neutral-400" />
                    </div>
                    <textarea
                      value={formData.service}
                      onChange={(e) => handleInputChange("service", e.target.value)}
                      placeholder="What service are you looking for? (e.g., Custom furniture design, Interior consultation, etc.)"
                      rows={4}
                      className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border rounded-2xl placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 resize-none text-slate-500 ${
                        !isValid ? "border-red-300 focus:ring-red-500" : "border-neutral-200"
                      }`}
                    />
                  </div>

                  {!isValid && (
                    <motion.p
                      className="text-sm text-red-600 text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Please fill in all fields with valid information
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full text-white py-4 rounded-full font-medium hover:bg-neutral-800 transition-all duration-200 bg-black"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Inquiry
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Thank you for reaching out!</h3>
                  <p className="text-neutral-600">
                    We've received your inquiry and will get back to you within 24 hours to discuss your project.
                  </p>
                </motion.div>
              )}

              <p className="text-xs text-neutral-500 text-center mt-6">
                Your information is secure and will only be used to respond to your inquiry. Read our{" "}
                <a href="#" className="underline hover:text-neutral-700 transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
            </BlurPanel>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
