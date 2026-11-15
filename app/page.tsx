import { About } from "@/components/public/home/about"
import { Contact } from "@/components/public/home/contact"
import { Faq } from "@/components/public/home/faq"
import { Hero } from "@/components/public/home/hero"
import { Projects } from "@/components/public/home/projects"
import { Skills } from "@/components/public/home/skills"
import { getPortfolioCmsSnapshot } from "@/lib/cms"

export default async function Home() {
  const snapshot = await getPortfolioCmsSnapshot()
  const profileImageUrl = snapshot.site.profileImageKey
    ? snapshot.media.find(
        (asset) => asset.storageKey === snapshot.site.profileImageKey
      )?.publicUrl
    : undefined

  return (
    <main id="top" className="flex flex-col gap-4 pb-24">
      <Hero
        content={snapshot.content.hero}
        messageLabel={snapshot.content.contact.ctaLabel}
      />
      <About
        content={snapshot.content.about}
        site={snapshot.site}
        profileImageUrl={profileImageUrl}
      />
      <Skills content={snapshot.content.skills} skills={snapshot.skills} />
      <Projects
        content={snapshot.content.projects}
        projects={snapshot.projects}
        media={snapshot.media}
      />
      <Faq content={snapshot.content.faq} faqs={snapshot.faqs} />
      <Contact content={snapshot.content.contact} site={snapshot.site} />
    </main>
  )
}
