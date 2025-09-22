"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Mail, User, Phone, Settings } from "lucide-react"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import { AnimatedText } from "./animated-text"

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    service: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!(validateEmail(formData.email) && formData.name && formData.phone && formData.service)) {
      setIsValid(false)
      return
    }

    try {
      setIsSubmitting(true)
      setIsValid(true)

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
        }),
      })

      if (!response.ok) throw new Error("Submit failed")
      const data = await response.json().catch(() => ({} as any))
      if (data?.status === "ok" || response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error("Unexpected response")
      }
    } catch (err) {
      setSubmitError("We couldn't submit your inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
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
            <BlurPanel className="p-8 lg:p-12 bg-transparent backdrop-blur-0">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4" style={{ color: "#000000" }}>
                  <span className="italic" style={{ color: "white", fontFamily: "'Ivy Presto', serif" }}>
                    <AnimatedText text="Let's work " delay={0.2} />
                  </span>
                  <span className="italic font-light text-black" style={{ color: "white", fontFamily: "'Ivy Presto', serif" }}>
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
                      className={`w-full pl-12 pr-4 py-4 bg-transparent border-1 rounded-2xl placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 text-white ${
                        !isValid ? "border-red-400 focus:ring-red-500" : "border-white/70"
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
                      className={`w-full pl-12 pr-4 py-4 bg-transparent border-1 rounded-2xl placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 text-white ${
                        !isValid ? "border-red-400 focus:ring-red-500" : "border-white/70"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={20} className="text-neutral-400" />
                    </div>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="[+()\-\s\d]{7,20}"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Your contact number"
                      className={`w-full pl-12 pr-4 py-4 bg-transparent border-1 rounded-2xl placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 text-white ${
                        !isValid ? "border-red-400 focus:ring-red-500" : "border-white/70"
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
                      className={`w-full pl-12 pr-4 py-4 bg-transparent border-1 rounded-2xl placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 resize-none text-white ${
                        !isValid ? "border-red-400 focus:ring-red-500" : "border-white/70"
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

                  {submitError && (
                    <motion.p
                      className="text-sm text-red-600 text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {submitError}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-black py-4 rounded-full font-medium transition-all duration-200 bg-white hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
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
                <a href="/privacy" className="underline hover:text-neutral-700 transition-colors">Privacy Policy</a>
                {" "}and our{" "}
                <a href="/terms" className="underline hover:text-neutral-700 transition-colors">Terms of Service</a>.
              </p>
            </BlurPanel>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
