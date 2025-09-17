"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CollectionStrip } from "@/components/collection-strip"
import { MaterialsSection } from "@/components/materials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <div className="bg-white">
        <div className="bg-black rounded-b-[40px] overflow-hidden">
          <CollectionStrip />
          <MaterialsSection />
          <NewsletterSection />
        </div>
        <Footer />
      </div>
    </main>
  )
}
