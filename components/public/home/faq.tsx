"use client"

import { Plus } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CtaPill } from "@/components/shared/cta-pill"

import type { HomePageContent, PortfolioFaq } from "@/types/cms"

export function Faq({
  content,
  faqs,
}: {
  content: HomePageContent["faq"]
  faqs: PortfolioFaq[]
}) {
  const visibleFaqs = faqs.filter((faq) => faq.visible)

  return (
    <section id="faq" aria-label="FAQ" className="mt-6 sm:mt-10">
      <div className="grid gap-10 md:grid-cols-5">
        {/* Left */}
        <div className="flex flex-col items-center text-center md:col-span-2 md:items-start md:text-left">
          <p className="flex-center w-fit gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-blue-600">
            <span aria-hidden className="size-1.5 rounded-full bg-blue-600" />
            {content.badge}
          </p>
          <h2 className="big-heading mt-4 font-bold">
            {content.titleBlack}
            <br />
            <span className="text-muted-foreground">{content.titleGray}</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {content.sideNote}
          </p>
          <div className="mt-5">
            <CtaPill
              label={content.ctaLabel}
              variant="outline"
              href={content.ctaHref}
            />
          </div>
        </div>

        {/* Right */}
        <Accordion className="border-t border-border md:col-span-3">
          {visibleFaqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-border"
            >
              <AccordionTrigger className="py-5 text-base font-bold hover:no-underline [&_svg[data-slot=accordion-trigger-icon]]:hidden">
                {faq.question}
                <span
                  aria-hidden
                  className="ml-auto flex-center size-7 shrink-0 justify-center rounded-full bg-blue-600/10 text-blue-600 transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45"
                >
                  <Plus aria-hidden className="size-4" />
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
          {visibleFaqs.length === 0 ? (
            <p className="py-8 text-sm text-muted-foreground">
              {content.emptyText}
            </p>
          ) : null}
        </Accordion>
      </div>
    </section>
  )
}
