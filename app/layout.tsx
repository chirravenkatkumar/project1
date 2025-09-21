import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import CustomCursor from "@/components/custom-cursor"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "AIVS LABS — Craft ideas for spaces that breathe",
  description: "Architected in Belgium, built to last—timeless pieces.",
  generator: "v0.app",
  alternates: {
    canonical: "https://katachi.example/",
  },
  openGraph: {
    siteName: "AIVS LABS",
    title: "Craft ideas for spaces that breathe. | Katachi",
    description: "Architected in Belgium, built to last—timeless pieces.",
    type: "website",
    url: "https://katachi.example/",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-katachi.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg",
        alt: "Katachi design furniture — timeless pieces, architected in Belgium",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_BE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Craft ideas for spaces that breathe. | Katachi",
    description: "Architected in Belgium, built to last—timeless pieces.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-katachi.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg",
        alt: "Katachi design furniture — timeless pieces, architected in Belgium",
      },
    ],
    site: "@katachi",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZJNQPR3PWR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZJNQPR3PWR');
          `}
        </Script>
      </head>
      <body className="font-sans bg-neutral-900 text-white overflow-x-hidden relative min-h-screen">
        <CustomCursor />
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/26580.jpg)",
            backgroundAttachment: "fixed",
            filter: "blur(2px)",
            transform: "scale(1.02)",
          }}
        />
        <div className="fixed inset-0 z-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
