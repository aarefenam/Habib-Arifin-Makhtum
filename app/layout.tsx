import localFont from "next/font/local"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { BackToTop } from "@/components/shared/back-to-top"
import { GlobalContactDialog } from "@/components/shared/global-contact-dialog"
import { FloatingThemeToggle } from "@/components/shared/floating-theme-toggle"
import { FloatingFullscreenToggle } from "@/components/shared/floating-fullscreen-toggle"
import { FloatingCommandButton } from "@/components/shared/floating-command-button"
import { CommandPalette } from "@/components/shared/command-palette"
import { Toaster } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

const switzer = localFont({
  src: [
    {
      path: "../fonts/Switzer-Variable.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Switzer-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://fazle-rabbi-dev.vercel.app"),
  title: "Fazle Rabbi | Software Developer",
  description:
    "Fazle Rabbi is a Bangladeshi software developer specializing in web development, building software that makes everyday life a little easier.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: [
    "Fazle Rabbi",
    "fazlerabbidev",
    "fazle-rabbi-dev",
    "fazle_rabbi_dev",
    "Bangladeshi software developer",
    "web developer Bangladesh",
    "MERN stack developer",
    "Next.js developer",
  ],
  authors: [{ name: "Fazle Rabbi" }],
  creator: "Fazle Rabbi",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fazle Rabbi",
  alternateName: ["fazlerabbidev", "fazle-rabbi-dev", "fazle_rabbi_dev"],
  url: "https://fazle-rabbi-dev.vercel.app",
  jobTitle: "Software Developer",
  sameAs: [
    "https://x.com/fazle_rabbi_dev",
    "https://github.com/fazle-rabbi-dev",
    "https://www.linkedin.com/in/fazlerabbidev",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", switzer.variable)}
    >
      <head>
        <meta
          name="google-site-verification"
          content="bBOJ8YhTLw-vz1qayvGCHKw3GnTLPoQ4RWRodFvBqI4"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <Navbar />
          <SmoothScroll>
            <div className="max-body">
              <div className="border-foreground/15 px-2 pt-24 sm:border-x sm:px-6 dark:border-foreground/10">
                {children}
              </div>
            </div>
          </SmoothScroll>
          <Footer />
          <BackToTop />
          <GlobalContactDialog />
          <CommandPalette />
          <FloatingCommandButton />
          <FloatingFullscreenToggle />
          <FloatingThemeToggle />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
