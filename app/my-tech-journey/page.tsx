import type { Metadata } from "next"

import { TechJourneyReader } from "@/components/public/about/tech-journey-reader"

export const metadata: Metadata = {
  title: "My Tech Journey | Fazle Rabbi",
  description:
    "How Fazle Rabbi got into tech, from keypad phones to becoming a Bangladeshi software developer building for the web.",
}

export default function MyTechJourneyPage() {
  return <TechJourneyReader />
}
