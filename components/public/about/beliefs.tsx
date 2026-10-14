import { ABOUT_BELIEFS, BELIEFS } from "@/constants/about"

import { AboutCard, AboutSectionHead } from "./about-card"
import { MyRuleCard } from "./my-rule-card"

export function Beliefs() {
  return (
    <section id="beliefs" aria-label="Things I believe" className="mt-20">
      <div className="flex flex-col gap-4">
        <AboutSectionHead index={ABOUT_BELIEFS.index} title={ABOUT_BELIEFS.title} />

        <div className="grid gap-4 lg:grid-cols-2">
          <AboutCard>
            <ul className="divide-y divide-border">
              {BELIEFS.map((belief) => (
                <li
                  key={belief}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <p className="heading-4">{belief}</p>
                </li>
              ))}
            </ul>
          </AboutCard>

          <MyRuleCard />
        </div>
      </div>
    </section>
  )
}
