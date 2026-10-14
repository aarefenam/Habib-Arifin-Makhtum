"use client"

import { ArrowRight } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function WhyDialog({
  label,
  title,
  body,
  chain,
}: {
  label: string
  title: string
  body: string[]
  chain: string[]
}) {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline">
        {label}
        <span className="flex-center size-5 justify-center rounded-full bg-blue-600 text-white">
          <ArrowRight aria-hidden className="size-3" />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {body.map((para, i) => (
            <p key={i} className="text-base text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
        <ul className="flex flex-wrap items-center gap-1.5">
          {chain.map((step, i) => (
            <li key={step} className="flex items-center gap-1.5">
              {i > 0 && (
                <ArrowRight aria-hidden className="size-3 text-blue-600" />
              )}
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {step}
              </span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
