import {
  ArrowDown,
  ArrowUp,
  Folder,
  House,
  Mail,
  Maximize,
  Moon,
  User,
  Zap,
} from "lucide-react"

export const PALETTE_NAVIGATE = [
  { id: "home", label: "Home", icon: House, target: "top" },
  { id: "about", label: "About", icon: User, target: "#about" },
  { id: "skills", label: "Skills", icon: Zap, target: "#skills" },
  { id: "projects", label: "Projects", icon: Folder, target: "#projects" },
  { id: "contact", label: "Contact", icon: Mail, target: "#contact" },
] as const

export const PALETTE_COMMANDS = [
  { id: "fullscreen", label: "Toggle full screen", icon: Maximize, hint: "F" },
  { id: "theme", label: "Toggle dark mode", icon: Moon, hint: "D" },
  { id: "top", label: "Scroll to top", icon: ArrowUp, hint: "P" },
  { id: "bottom", label: "Scroll to bottom", icon: ArrowDown, hint: "L" },
] as const
