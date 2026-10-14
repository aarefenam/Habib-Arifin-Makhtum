import Image from "next/image"
import { BookOpen, Rocket, Search, ShieldCheck } from "lucide-react"

import {
  ADDITIONAL,
  CORE_SKILLS,
  SKILLS_HEADER,
  TOOLKIT,
  type SkillItem,
} from "@/constants/skills"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/shared/section-header"

const EXTRA_ICONS = {
  search: Search,
  "shield-check": ShieldCheck,
  rocket: Rocket,
  "book-open": BookOpen,
} as const

function SkillIcon({ skill }: { skill: SkillItem }) {
  if (!skill.logo) return null
  return (
    <Image
      src={skill.logo}
      alt=""
      aria-hidden
      width={20}
      height={20}
      loading="lazy"
      className={cn(
        "size-4 shrink-0 object-contain",
        skill.darkInvert && "dark:invert"
      )}
    />
  )
}

function SkillPill({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <li className="flex-center w-fit gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600 hover:shadow-[0_8px_20px_-6px_rgb(37_99_235/0.45)]">
      {icon}
      {name}
    </li>
  )
}

function SkillGroup({
  title,
  countLabel,
  description,
  children,
}: {
  title: string
  countLabel: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-5 border-t border-border pt-8 md:grid-cols-[180px_1fr]">
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-1.5 w-fit rounded-full bg-blue-600/10 px-2.5 py-0.5 text-xs font-medium text-blue-600">
          {countLabel}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <ul className="flex flex-wrap content-start gap-2">{children}</ul>
    </div>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="relative mt-6 overflow-hidden sm:mt-10"
    >
      {/* Subtle grid bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] bg-[size:36px_36px] opacity-60"
      />
      <div className="relative flex flex-col gap-8">
        <SectionHeader
          badge={SKILLS_HEADER.badge}
          titleBlack={SKILLS_HEADER.titleBlack}
          titleGray={SKILLS_HEADER.titleGray}
          sideNote={SKILLS_HEADER.sideNote}
          center={false}
          badgeCenter
        />

        <SkillGroup
          title="Core skills"
          countLabel={`${CORE_SKILLS.length} tools`}
          description="The stack I build products with."
        >
          {CORE_SKILLS.map((skill) => (
            <SkillPill
              key={skill.name}
              name={skill.name}
              icon={<SkillIcon skill={skill} />}
            />
          ))}
        </SkillGroup>

        <SkillGroup
          title="Toolkit"
          countLabel={`${TOOLKIT.length} tools`}
          description="The tools I work in every day."
        >
          {TOOLKIT.map((skill) => (
            <SkillPill
              key={skill.name}
              name={skill.name}
              icon={<SkillIcon skill={skill} />}
            />
          ))}
        </SkillGroup>

        <SkillGroup
          title="Additional"
          countLabel={`${ADDITIONAL.length} skills`}
          description="Beyond the code."
        >
          {ADDITIONAL.map((extra) => {
            const Icon = EXTRA_ICONS[extra.icon]
            return (
              <SkillPill
                key={extra.label}
                name={extra.label}
                icon={
                  <Icon aria-hidden className="size-4 shrink-0 text-blue-600" />
                }
              />
            )
          })}
        </SkillGroup>
      </div>
    </section>
  )
}
