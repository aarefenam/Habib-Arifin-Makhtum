import { SectionHeader } from "@/components/shared/section-header"
import type {
  HomePageContent,
  PortfolioMediaAsset,
  PortfolioSkill,
} from "@/types/cms"

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

export function Skills({
  content,
  skills,
  media,
}: {
  content: HomePageContent["skills"]
  skills: PortfolioSkill[]
  media: PortfolioMediaAsset[]
}) {
  const groups = [
    {
      description: content.coreDescription,
      items: skills.filter(
        (skill) => skill.visible && skill.category === "core"
      ),
      title: content.coreTitle,
    },
    {
      description: content.toolkitDescription,
      items: skills.filter(
        (skill) => skill.visible && skill.category === "toolkit"
      ),
      title: content.toolkitTitle,
    },
    {
      description: content.additionalDescription,
      items: skills.filter(
        (skill) => skill.visible && skill.category === "additional"
      ),
      title: content.additionalTitle,
    },
  ]

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
          badge={content.badge}
          titleBlack={content.titleBlack}
          titleGray={content.titleGray}
          sideNote={content.sideNote}
          center={false}
          badgeCenter
        />

        {groups.map((group, index) => (
          <SkillGroup
            key={index}
            title={group.title}
            countLabel={`${group.items.length} ${content.countLabel}`}
            description={group.description}
          >
            {group.items.map((skill) => {
              const icon = media.find(
                (asset) => asset.storageKey === skill.iconKey
              )
              return (
                <SkillPill
                  key={skill.id}
                  name={skill.name}
                  icon={
                    icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={icon.publicUrl}
                        alt=""
                        className="size-5 shrink-0 object-contain"
                      />
                    ) : null
                  }
                />
              )
            })}
          </SkillGroup>
        ))}
      </div>
    </section>
  )
}
