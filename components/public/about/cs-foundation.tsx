import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Cpu, Database, History, Network } from "lucide-react"

import { CS_CARD } from "@/constants/skills"

const TOPIC_ICONS = {
  cpu: Cpu,
  network: Network,
  database: Database,
  history: History,
}

export function CsFoundation() {
  return (
    <article className="grid gap-6 rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-600/20 md:grid-cols-2 md:items-center md:p-8">
      <div>
        <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90">
          {CS_CARD.eyebrow}
        </p>
        <h3 className="heading-3 mt-3">{CS_CARD.heading}</h3>
        <p className="mt-1 text-sm text-white/80">{CS_CARD.sub}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CS_CARD.topics.map((topic) => {
            const Icon = TOPIC_ICONS[topic.icon]
            return (
              <li
                key={topic.label}
                className="flex-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black"
              >
                <Icon aria-hidden className="size-3.5 text-blue-600" />
                {topic.label}
              </li>
            )
          })}
        </ul>
        <Link
          href={CS_CARD.notesHref}
          className="mt-4 flex-center w-fit gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-opacity hover:opacity-90"
        >
          {CS_CARD.notesLabel}
          <ArrowUpRight
            aria-hidden
            className="size-4 rounded-full bg-blue-600 text-white"
          />
        </Link>
      </div>
      <div className="relative">
        <Image
          src={CS_CARD.image}
          alt={CS_CARD.imageAlt}
          width={640}
          height={400}
          loading="lazy"
          className="rounded-xl object-cover shadow-xl"
        />
      </div>
    </article>
  )
}
