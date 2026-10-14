export const FAQ_HEADER = {
  badge: "FAQ",
  titleBlack: "Questions",
  titleGray: "answered.",
  sideNote: "Answers to common questions about my services and workflow.",
}

export const FAQ_CTA = {
  label: "Ask me directly",
  href: "#contact",
}

export const FAQS = [
  {
    question: "What do you work with?",
    answer:
      "Next.js, TypeScript and Node.js for full-stack web apps - from the database to the screen, including auth, hosting and deployment.",
  },
  {
    question: "Are you available for work?",
    answer:
      "Yes, I am open to internships, freelance projects and MERN/React/Next roles. Use the contact section to reach me.",
  },
  {
    question: "How do you build projects?",
    answer:
      "I keep it simple: make it exist first, then make it good later. Small steps, working software, steady improvement over perfectionism.",
  },
  {
    question: "Do you work with a CLI agent workflow?",
    answer:
      "Yes. I work with Open-Code CLI and I manage parallel work with git worktrees and branches, so each feature gets its own isolated session without breaking the main checkout.",
  },
  {
    question: "Where can I see more of your work?",
    answer:
      "Check the projects section for selected work & projects page for more work and GitHub for everything else including experiments and side projects.",
  },
] as const
