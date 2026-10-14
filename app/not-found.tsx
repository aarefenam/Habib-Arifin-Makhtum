import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
}

const HELPFUL_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
]

export default function NotFound() {
  return (
    <main className="pt-10 pb-24">
      {/* Universe panel - always dark, like the message card */}
      <section
        aria-label="Page not found"
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#0d0d35] px-6 py-16 text-center text-white sm:px-12 sm:py-20"
      >
        {/* Starfield layers */}
        <div aria-hidden className="universe-stars absolute inset-0" />
        <div aria-hidden className="universe-stars-far absolute inset-0" />

        {/* Soft nebula glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/4 size-72 rounded-full bg-indigo-600/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -bottom-24 size-80 rounded-full bg-blue-600/20 blur-3xl"
        />

        {/* Decorative shapes */}
        {/* Eye planet - top left */}
        <div
          aria-hidden
          className="universe-float absolute top-8 left-8 hidden sm:block"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-blue-400">
            <div className="flex size-7 items-center justify-center rounded-full bg-white">
              <div className="size-3 rounded-full bg-orange-400 ring-2 ring-slate-900" />
            </div>
          </div>
        </div>

        {/* Starburst - left */}
        <div
          aria-hidden
          className="universe-float-slow absolute top-1/3 left-[8%] hidden md:block"
        >
          <div className="relative size-14">
            <div className="absolute inset-0 rotate-0 bg-[#ff8a7a]" />
            <div className="absolute inset-0 rotate-45 bg-[#ff8a7a]" />
          </div>
        </div>

        {/* Squiggle - left bottom */}
        <svg
          aria-hidden
          className="universe-float absolute bottom-16 left-[6%] hidden w-24 text-blue-500 md:block"
          viewBox="0 0 100 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        >
          <path d="M4 22 C 20 4, 32 4, 44 18 S 68 32, 80 14 S 92 8, 98 16" />
        </svg>

        {/* Ringed planet - right */}
        <div
          aria-hidden
          className="universe-float-slow absolute top-10 right-[10%] hidden sm:block"
        >
          <div className="relative flex size-20 items-center justify-center">
            <div className="size-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-700" />
            <div className="absolute h-20 w-20 rotate-[-20deg] rounded-full border-4 border-blue-300/50" />
            <div className="absolute -top-1 -right-6 size-2 rounded-full bg-orange-400" />
            <div className="absolute top-6 -right-9 h-1.5 w-8 rounded-full bg-orange-400" />
          </div>
        </div>

        {/* Teal wave - right middle */}
        <svg
          aria-hidden
          className="universe-float absolute top-[42%] right-[6%] hidden w-16 text-teal-400 md:block"
          viewBox="0 0 64 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        >
          <path d="M2 12 q 7 -10 14 0 t 14 0 t 14 0 t 14 0" />
        </svg>

        {/* Crescent moon - bottom left */}
        <div
          aria-hidden
          className="universe-float-slow absolute bottom-24 left-[16%] hidden lg:block"
        >
          <div className="size-10 rounded-full bg-[#0d0d35] shadow-[10px_6px_0_0_#f5d76e]" />
        </div>

        {/* Plus signs */}
        <span
          aria-hidden
          className="absolute top-16 right-[30%] hidden text-xl text-blue-300/60 lg:block"
        >
          +
        </span>
        <span
          aria-hidden
          className="absolute right-[22%] bottom-28 hidden text-lg text-orange-300/60 lg:block"
        >
          +
        </span>

        {/* Steps - bottom right */}
        <div
          aria-hidden
          className="absolute right-8 bottom-0 hidden items-end gap-1 sm:flex"
        >
          <div className="h-6 w-14 border border-b-0 border-white/40 bg-white/10" />
          <div className="h-10 w-14 border border-b-0 border-white/40 bg-white/15" />
          <div className="h-14 w-14 border border-b-0 border-white/40 bg-white/20" />
        </div>

        {/* Content */}
        <div className="relative">
          <p className="text-sm font-semibold tracking-[0.3em] text-blue-300 uppercase">
            Error
          </p>
          <p className="mt-2 text-[clamp(6rem,20vw,12rem)] leading-none font-extrabold tracking-tight drop-shadow-[0_10px_40px_rgb(80_120_255/0.35)]">
            404
          </p>
          <p className="mt-2 text-xl font-semibold text-blue-200 sm:text-2xl">
            This page is outside of the universe
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            The page you are trying to access doesn&apos;t exist or has been
            moved. Try going back to our homepage.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 transition-transform hover:scale-105"
            >
              Go to homepage
            </Link>
            <Link
              href="/#contact"
              className="rounded-md border border-white/25 px-8 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/60 hover:text-white"
            >
              Contact me
            </Link>
          </div>

          {/* Helpful links */}
          <div className="mt-10 border-t border-white/10 pt-5">
            <p className="text-xs text-white/40">
              Here are some helpful links instead:
            </p>
            <nav
              aria-label="Helpful links"
              className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm"
            >
              {HELPFUL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </main>
  )
}
