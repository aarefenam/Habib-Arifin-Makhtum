import { About } from "@/components/public/home/about"
import { Contact } from "@/components/public/home/contact"
import { Faq } from "@/components/public/home/faq"
import { Hero } from "@/components/public/home/hero"
import { Projects } from "@/components/public/home/projects"
import { Skills } from "@/components/public/home/skills"

export default function Home() {
  return (
    <main id="top" className="flex flex-col gap-4 pb-24">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Faq />
      <Contact />
    </main>
  )
}
