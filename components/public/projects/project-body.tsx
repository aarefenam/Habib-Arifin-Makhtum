import {
  BarChart3,
  Link2,
  Lock,
  Palette,
  Search,
  ShieldCheck,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { ProjectCover } from "@/components/shared/project-cover"

import type {
  ProjectDetails,
  ProjectFeatureIcon,
} from "@/constants/project-details"

const FEATURE_ICONS: Record<ProjectFeatureIcon, typeof Lock> = {
  auth: Lock,
  safety: ShieldCheck,
  links: Link2,
  theming: Palette,
  analytics: BarChart3,
  seo: Search,
}

function Eyebrow({ label }: { label: string }) {
  return (
    <p className="flex-center gap-2 text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
      <span aria-hidden className="h-px w-5 bg-blue-600" />
      {label}
    </p>
  )
}

// Cover + why + features + deep dive, stacked like the design.
export function ProjectBody({
  details,
  cover,
}: {
  details: ProjectDetails
  cover: string
}) {
  return (
    <div className="flex flex-col gap-12 pb-4 sm:gap-16">
      {/* Cover - same ring/padding/object-cover style as card, shorter banner ratio */}
      <section aria-label={`${details.title} preview`}>
        <ProjectCover
          cover={cover}
          name={details.title}
          innerClassName="aspect-[16/9]"
          imgClassName="object-top"
        />
      </section>

      {/* Why */}
      <section
        aria-label="Why this project"
        className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]"
      >
        <div>
          <Eyebrow label="Why" />
          <h2 className="heading-3 mt-2">{details.whyTitle}</h2>
        </div>
        <p className="text-lg leading-7 font-medium">
          {details.whyLead}
          <span className="text-muted-foreground">{details.whyRest}</span>
        </p>
      </section>

      {/* Features */}
      {details?.features.length > 0 && (
        <section
          aria-label="Core features"
          className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]"
        >
          <div>
            <Eyebrow label="Features" />
            <h2 className="heading-3 mt-2">Core features</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {details.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon]
              return (
                <Card
                  key={feature.title}
                  className="rounded-2xl transition hover:ring-2 hover:ring-blue-600/50"
                >
                  <CardContent className="flex flex-col gap-2 p-5">
                    <span className="flex-center size-8 justify-center rounded-lg bg-blue-600/10 text-blue-600">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-base leading-6 text-muted-foreground">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {/* Deep dive */}
      {details.deepDive?.length > 0 && (
        <section
          aria-label="Deep dive"
          className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]"
        >
          <div>
            <Eyebrow label="Deep dive" />
            <h2 className="heading-3 mt-2">A closer look</h2>
          </div>
          <Card className="overflow-hidden rounded-2xl py-0">
            <CardContent className="p-0">
              {details.deepDive.map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[140px_1fr] sm:gap-4"
                >
                  <p className="pt-0.5 text-base font-semibold tracking-[0.2em] text-blue-600 uppercase">
                    {row.label}
                  </p>
                  <p className="text-base leading-6">{row.text}</p>
                  {i < details.deepDive.length - 1 && (
                    <div
                      aria-hidden
                      className="border-b border-dashed border-border sm:col-span-2"
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}
