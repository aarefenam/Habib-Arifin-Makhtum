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
import { getPublicSiteConfiguration } from "@/lib/cms"
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

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getPublicSiteConfiguration()

  return {
    metadataBase: new URL(SITE.siteUrl),
    title: {
      default: site.seoTitle || `${site.name} | ${site.role}`,
      template: `%s | ${site.name}`,
    },
    description: site.seoDescription || SITE_DESCRIPTION,
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    keywords: [
      site.name,
      "full-stack developer",
      "IT solver",
      "ERP developer",
      "web developer",
      "Next.js developer",
      "API integration",
      "Cloudflare R2",
    ],
    authors: [{ name: site.name }],
    creator: site.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE.siteUrl,
      title: site.seoTitle || `${site.name} | ${site.role}`,
      description: site.seoDescription || SITE_DESCRIPTION,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: site.seoTitle || `${site.name} | ${site.role}`,
      description: site.seoDescription || SITE_DESCRIPTION,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { site, content, logoUrl } = await getPublicSiteConfiguration()
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    alternateName: [site.handle],
    description: site.seoDescription,
    jobTitle: site.role,
    name: site.name,
    sameAs: Object.values(site.socialLinks).filter(Boolean),
    url: SITE.siteUrl,
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", switzer.variable)}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <Navbar content={content.header} logoUrl={logoUrl} />
          <SmoothScroll>
            <PageShell>{children}</PageShell>
          </SmoothScroll>
          <Footer site={site} content={content.footer} />
          <BackToTop />
          <GlobalContactDialog site={site} content={content.contactDialog} />
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
