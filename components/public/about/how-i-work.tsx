import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ABOUT_WORKFLOW,
  WORKFLOW_FLOW,
  WORKFLOW_STEPS,
} from "@/constants/about"

import { AboutCard, AboutSectionHead } from "./about-card"
import { SpecialTools } from "./special-tools"

export function HowIWork() {
  return (
    <section id="how-i-work" aria-label="How I work" className="mt-20">
      <div className="flex flex-col gap-4">
        <AboutSectionHead index={ABOUT_WORKFLOW.index} title={ABOUT_WORKFLOW.title} />

        <div className="grid gap-4 lg:grid-cols-5">
          {/* Workflow steps */}
          <AboutCard className="lg:col-span-3">
            <h3 className="heading-6">{ABOUT_WORKFLOW.workflowTitle}</h3>
            <ol className="mt-2 divide-y divide-border">
              {WORKFLOW_STEPS.map((step, i) => (
                <li key={step} className="flex gap-3 py-3">
                  <span
                    aria-hidden
                    className="flex-center size-7 shrink-0 justify-center rounded-full bg-blue-600/10 text-sm font-bold text-blue-600"
                  >
                    {i + 1}
                  </span>
                  <p className="flex gap-1.5 leading-relaxed">
                    {i === 5 && (
                      <Heart
                        aria-hidden
                        className="mt-1 size-4 shrink-0 fill-destructive text-destructive"
                      />
                    )}
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </AboutCard>

          {/* How I build today */}
          <AboutCard className="flex flex-col lg:col-span-2">
            <p className="w-fit rounded-full bg-blue-600/10 px-3 py-1 text-sm font-medium text-blue-600">
              {ABOUT_WORKFLOW.todayPill}
            </p>
            <div className="flex flex-1 flex-col justify-center gap-8 py-8">
              <h3 className="heading-4">
                {ABOUT_WORKFLOW.todayBlackA}{" "}
                <span className="text-muted-foreground">
                  {ABOUT_WORKFLOW.todayGray}
                </span>{" "}
                {ABOUT_WORKFLOW.todayBlackB}
              </h3>

              <ul className="flex-center flex-wrap gap-2">
                {WORKFLOW_FLOW.map((item, i) => (
                  <li key={item} className="flex-center gap-2">
                    {i > 0 && (
                      <ArrowRight
                        aria-hidden
                        className="size-4 shrink-0 text-blue-600"
                      />
                    )}
                    <span
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm font-semibold",
                        item === "Ship"
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-border bg-muted text-foreground"
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={ABOUT_WORKFLOW.skillsHref}
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
            >
              {ABOUT_WORKFLOW.skillsLabel}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </AboutCard>
        </div>

        <SpecialTools />
      </div>
    </section>
  )
}
