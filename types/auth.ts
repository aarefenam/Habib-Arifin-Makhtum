export type AdminSession = {
  username: string
  role: "admin"
}

export type AdminTokenKind = "access" | "refresh"
