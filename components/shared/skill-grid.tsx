import { cn } from "@/lib/utils"
import type { SkillItem } from "@/constants/skills"

function WebSocketIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6 text-blue-600"
    >
      <path d="M7 4v13" />
      <path d="m4 7 3-3 3 3" />
      <path d="M17 20V7" />
      <path d="m14 17 3 3 3-3" />
    </svg>
  )
}

export function SkillRow({
  title,
  note,
  items,
  lgCols,
  grayscale = false,
}: {
  title: string
  note: string
  items: SkillItem[]
  lgCols: string
  grayscale?: boolean
}) {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between gap-4">
        <h3 className="heading-5">{title}</h3>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
      <ul
        className={cn(
          "grid grid-cols-2 border-t border-l border-border bg-background sm:grid-cols-4",
          lgCols
        )}
      >
        {items.map((skill) => (
          <li
            key={skill.name}
            className="group relative flex flex-col items-center justify-center gap-2 border-r border-b border-border bg-background p-4 text-center hover:z-10 hover:outline-1 hover:-outline-offset-0 hover:outline-blue-600 sm:aspect-square"
          >
            <span
              aria-hidden
              className="absolute top-2 right-2 size-1.5 bg-blue-600 opacity-0 transition-opacity group-hover:opacity-100"
            />
            <span className="flex-center size-9 justify-center rounded bg-muted-foreground/20 transition-transform duration-300 group-hover:scale-110">
              {skill.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  loading="lazy"
                  className={cn(
                    "size-7 object-contain transition-[filter] duration-300",
                    grayscale && "grayscale group-hover:grayscale-0",
                    skill.darkInvert && "dark:invert"
                  )}
                />
              ) : skill.custom === "websocket" ? (
                <WebSocketIcon />
              ) : (
                <span
                  aria-hidden
                  className="text-sm font-extrabold text-blue-600"
                >
                  {skill.monogram}
                </span>
              )}
            </span>
            <p className="h-10 text-sm font-bold">{skill.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
