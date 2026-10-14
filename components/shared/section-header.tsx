import { cn } from "cn"

export function SectionHeader({
  badge,
  titleBlack,
  titleGray,
  sideNote,
  center,
  badgeCenter = false,
}: {
  badge: string
  titleBlack: string
  titleGray: string
  sideNote: string
  center: boolean
  badgeCenter?: boolean
}) {
  if (badgeCenter) {
    return (
      <header className="flex flex-col gap-4">
        <div className="flex justify-center">
          <p className="flex-center w-fit gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-blue-600">
            <span aria-hidden className="size-1.5 rounded-full bg-blue-600" />
            {badge}
          </p>
        </div>
        <div
          className={cn(
            "flex flex-col items-center gap-4 text-center",
            !center && "md:flex-row md:items-end md:justify-between md:text-left"
          )}
        >
          <h2 className="big-heading font-bold">
            {titleBlack}
            <br />
            <span className="text-muted-foreground">{titleGray}</span>
          </h2>
          {center ? (
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {sideNote}
            </p>
          ) : (
            <p className="max-w-xs text-sm text-muted-foreground">{sideNote}</p>
          )}
        </div>
      </header>
    )
  }
  return (
    <header
      className={cn(
        "flex flex-col items-center gap-4 text-center",
        !center && "md:flex-row md:items-end md:justify-between md:text-left"
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center",
          !center && "md:items-start"
        )}
      >
        <p className="flex-center w-fit gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-blue-600">
          <span aria-hidden className="size-1.5 rounded-full bg-blue-600" />
          {badge}
        </p>
        <h2 className="big-heading mt-4 font-bold">
          {titleBlack}
          <br />
          <span className="text-muted-foreground">{titleGray}</span>
        </h2>
        {center && (
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {sideNote}
          </p>
        )}
      </div>
      {!center && (
        <p className="max-w-xs text-sm text-muted-foreground">{sideNote}</p>
      )}
    </header>
  )
}
