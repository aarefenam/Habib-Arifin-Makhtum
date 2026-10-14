"use client"

import { List } from "lucide-react"

import { ABOUT_TOP } from "@/constants/about"
import { scrollToSection, scrollToTop } from "@/lib/scroll"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AboutToc() {
  return (
    <div className="fixed top-20 right-6 z-40 z-50 flex justify-end md:top-6">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="On this page"
          title="On this page"
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:border-blue-600 hover:text-blue-600 [&_svg]:size-5"
        >
          <List aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          sideOffset={8}
          className=""
        >
          <DropdownMenuItem
            onClick={scrollToTop}
            className="font-medium text-blue-600"
          >
            Return to top
          </DropdownMenuItem>
          {ABOUT_TOP.links.map((link) => (
            <DropdownMenuItem
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-muted-foreground"
            >
              {link.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
