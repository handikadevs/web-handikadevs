// config.ts
import { Inter, Sora, JetBrains_Mono } from "next/font/google"

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
export const baseURL = "https://handikadevs.vercel.app"

// ---------------------- Types ----------------------
export type RouteMap = Record<string, boolean>

interface DisplayConfig {
  location: boolean
  time: boolean
  themeSwitcher: boolean
}

type StyleTheme = "dark" | "light" | "system"

type NeutralColor = "sand" | "gray" | "slate" | "custom"
type BrandColor =
  | "blue"
  | "indigo"
  | "violet"
  | "magenta"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "moss"
  | "green"
  | "emerald"
  | "aqua"
  | "cyan"
  | "custom"
type AccentColor = BrandColor

type SolidOption = "color" | "contrast"
type SolidStyle = "flat" | "plastic"
type BorderStyle = "rounded" | "playful" | "conservative"
type SurfaceStyle = "filled" | "translucent"
type TransitionStyle = "all" | "micro" | "macro"
type Scaling = "90" | "95" | "100" | "105" | "110"

interface StyleConfig {
  theme: StyleTheme
  neutral: NeutralColor
  brand: BrandColor
  accent: AccentColor
  solid: SolidOption
  solidStyle: SolidStyle
  border: BorderStyle
  surface: SurfaceStyle
  transition: TransitionStyle
  scaling: Scaling
}

interface DataStyleConfig {
  variant: "flat" | "gradient" | "outline"
  mode: "categorical" | "divergent" | "sequential"
  height: number
  axis: {
    stroke: string
  }
  tick: {
    fill: string
    fontSize: number
    line: boolean
  }
}

interface EffectConfig {
  mask: { cursor: boolean; x: number; y: number; radius: number }
  gradient: {
    display: boolean
    opacity: number
    x: number
    y: number
    width: number
    height: number
    tilt: number
    colorStart: string
    colorEnd: string
  }
  dots: { display: boolean; opacity: number; size: string; color: string }
  grid: {
    display: boolean
    opacity: number
    color: string
    width: string
    height: string
  }
  lines: {
    display: boolean
    opacity: number
    color: string
    size: string
    thickness: number
    angle: number
  }
}

interface MailchimpConfig {
  action: string
  effects: EffectConfig
}

interface SchemaConfig {
  logo: string
  type: string
  name: string
  description: string
  email: string
}

interface SocialLinks {
  instagram: string
  linkedin: string
  github: string
}

// ---------------------- Configs ----------------------

export const routes: RouteMap = {
  "/": true,
  "/about": true,
  "/project": true,
  "/blog": true,
  "/gallery": true,
}

export const display: DisplayConfig = {
  location: false,
  time: false,
  themeSwitcher: true,
}

export const protectedRoutes: RouteMap = {
  "/project/coster-v3": true,
}

// Fonts
const heading = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
})
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
})
const label = Inter({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
})
const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
})

export const fonts = { heading, body, label, code }

// Style
export const style: StyleConfig = {
  theme: "system",
  neutral: "gray",
  brand: "aqua",
  accent: "violet",
  solid: "contrast",
  solidStyle: "plastic",
  border: "playful",
  surface: "translucent",
  transition: "all",
  scaling: "100",
}

// Data style
export const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  height: 24,
  axis: { stroke: "var(--neutral-alpha-weak)" },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
}

// Effects
export const effects: EffectConfig = {
  mask: { cursor: false, x: 50, y: 0, radius: 100 },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
}

// Mailchimp
export const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: { cursor: true, x: 50, y: 0, radius: 100 },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
}

// Schema
export const schema: SchemaConfig = {
  logo: "",
  type: "Individual",
  name: "Handika Kristofan Afanda",
  description:
    "I'm Handika Kristofan, a Frontend Developer and Designer, My journey in technology has always been driven by curiosity and the desire to create solutions.",
  email: "handikadevs@gmail.com",
}

// Socials
export const sameAs: SocialLinks = {
  instagram: "https://www.instagram.com/@handikabriliann",
  linkedin: "https://www.linkedin.com/in/handikadevs",
  github: "https://github.com/handikadevs",
}
