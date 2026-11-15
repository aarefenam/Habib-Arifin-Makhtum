import localFont from "next/font/local"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/smooth-scroll"
import { PageShell } from "@/components/shared/page-shell"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { BackToTop } from "@/components/shared/back-to-top"
import { GlobalContactDialog } from "@/components/shared/global-contact-dialog"
import { FloatingThemeToggle } from "@/components/shared/floating-theme-toggle"
import { FloatingFullscreenToggle } from "@/components/shared/floating-fullscreen-toggle"
import { FloatingCommandButton } from "@/components/shared/floating-command-button"
import { CommandPalette } from "@/components/shared/command-palette"
import { Toaster } from "@/components/ui/toast"
import { SITE, SITE_DESCRIPTION } from "@/constants/site"
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
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: `${SITE.name} | ${SITE.role}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  keywords: [
    "Habib Arifin Makhtum",
    "full-stack developer",
    "IT solver",
    "ERP developer",
    "web developer Indonesia",
    "Next.js developer",
    "integrasi API",
    "Cloudflare R2",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE.siteUrl,
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE_DESCRIPTION,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE_DESCRIPTION,
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: [SITE.handle],
  url: SITE.siteUrl,
  jobTitle: SITE.role,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  sameAs: [SITE.github, SITE.linkedin, SITE.instagram],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", switzer.variable)}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <Navbar />
          <SmoothScroll>
            <PageShell>{children}</PageShell>
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
