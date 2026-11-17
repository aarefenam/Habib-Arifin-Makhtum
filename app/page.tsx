import { About } from "@/components/public/home/about"
import { Contact } from "@/components/public/home/contact"
import { Faq } from "@/components/public/home/faq"
import { Hero } from "@/components/public/home/hero"
import { Projects } from "@/components/public/home/projects"
import { Skills } from "@/components/public/home/skills"
import { Testimonials } from "@/components/public/home/testimonials"
import { getPortfolioCmsSnapshot } from "@/lib/cms"
import { getTestimonials } from "@/lib/testimonials"

export default async function Home() {
  const [snapshot, testimonials] = await Promise.all([
    getPortfolioCmsSnapshot(),
    getTestimonials({ visibleOnly: true }),
  ])
  // Resolve a media storage key (picked in the CMS) to its public URL
  const mediaUrl = (key: string | null) =>
    key
      ? snapshot.media.find((asset) => asset.storageKey === key)?.publicUrl
      : undefined
  const profileImageUrl = mediaUrl(snapshot.site.profileImageKey)

  return (
    <main id="top" className="flex flex-col gap-4 pb-24">
      <Hero content={snapshot.content.hero} />
      <About
        content={snapshot.content.about}
        site={snapshot.site}
        profileImageUrl={profileImageUrl}
      />
      <Skills
        content={snapshot.content.skills}
        skills={snapshot.skills}
        media={snapshot.media}
      />
      <Projects
        content={snapshot.content.projects}
        projects={snapshot.projects}
        media={snapshot.media}
      />
      <Testimonials testimonials={testimonials} />
      <Faq content={snapshot.content.faq} faqs={snapshot.faqs} />
      <Contact
        content={snapshot.content.contact}
        site={snapshot.site}
        avatarUrl={mediaUrl(snapshot.content.contact.avatarKey)}
      />
    </main>
  )
}
