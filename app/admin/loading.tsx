import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoading() {
  return (
    <div className="min-h-dvh bg-background-body lg:pl-72">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-border bg-card p-6 lg:block">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="mt-12 h-4 w-24" />
        <Skeleton className="mt-4 h-11 w-full" />
        <div className="mt-10 space-y-2">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-11 w-full" />
          ))}
        </div>
      </aside>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 xl:px-12">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="mt-3 h-10 w-72 max-w-full" />
        <Skeleton className="mt-4 h-5 w-[34rem] max-w-full" />
        <Skeleton className="mt-8 h-48 w-full rounded-2xl" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-56 rounded-xl" />
          ))}
        </div>
      </main>
    </div>
  )
}
