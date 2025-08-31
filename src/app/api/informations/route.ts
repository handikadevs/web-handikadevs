import { okRead, fail } from "@/lib/api"
import { fetchCsvRows, sheetCsvUrl, splitPipes } from "@/lib/sheets"

interface CsvInformationRow {
  section: string
  key: string
  field?: string
  value?: string
}

export interface Person {
  first_name: string
  last_name: string
  name: string
  role: string
  avatar: string
  email: string
  location: string
  languages?: string[]
}

export interface Social {
  name: string
  icon: string
  link: string
}

export interface Newsletter {
  display: boolean
  title: string
  description: string
}

interface FeaturedHome {
  display: boolean
  title: string
  href: string
}

export interface HomeContent {
  path: string
  image: string
  label: string
  title: string
  description: string
  headline: string
  subline: string
  featured: FeaturedHome
}

interface AboutProject {
  display: boolean
  title: string
  experiences: {
    company: string
    initial?: string
    timeframe?: string
    role?: string
    techstack?: string[]
    achievement_md?: string[]
    impact_md?: string
    image?: string[]
  }[]
}

interface AboutStudy {
  display: boolean
  title: string
  institutions: {
    name: string
    department: string
    timeframe: string
    experience_md: string[]
  }[]
}

interface AboutTechnical {
  display: boolean
  title: string
  subtitle: string
  skills: { title: string; description: string; icon: string[] }[]
}

export interface About {
  path: string
  label: string
  title: string
  description: string
  tableOfContent: { display: boolean; subItems: boolean }
  avatar: { display: boolean }
  calendar: { display: boolean; link: string }
  intro: { display: boolean; title: string; description: string }
  project: AboutProject
  studies: AboutStudy
  technical: AboutTechnical
}

interface DisplayBasicCommon {
  path: string
  label: string
  title: string
  description: string
}

export interface ImageGallery {
  src: string
  alt: string
  orientation: "horizontal" | "vertical"
}

export interface InformationDetail {
  person: Person
  newsletter: Newsletter
  social: Social[]
  home: HomeContent
  about: About
  blog: DisplayBasicCommon
  project: DisplayBasicCommon
  gallery: DisplayBasicCommon & {
    images: ImageGallery[]
  }
}

export interface ApiResp<T> {
  data: T
}

// ===== Helpers =====
const bool = (s?: string) =>
  String(s ?? "")
    .trim()
    .toLowerCase() === "true"
const splitTildes = (s?: string) =>
  s
    ? s
        .split("~")
        .map((x) => x.trim())
        .filter(Boolean)
    : []

const bySection = (rows: CsvInformationRow[], section: string) =>
  rows.filter((r) => r.section === section)

const get = (rows: CsvInformationRow[], section: string, key: string) =>
  rows.find(
    (r) =>
      r.section === section && r.key === key && (!r.field || r.field === "")
  )?.value ?? ""

const getField = (
  rows: CsvInformationRow[],
  section: string,
  key: string,
  field: string
) =>
  rows.find((r) => r.section === section && r.key === key && r.field === field)
    ?.value ?? ""

function zipArrayObjects<T extends Record<string, any>>(
  rows: CsvInformationRow[],
  section: string,
  key: string,
  fields: Array<{ name: keyof T; innerArrayDelimiter?: "tilde" | "none" }>
): T[] {
  const group = rows.filter((r) => r.section === section && r.key === key)
  if (group.length === 0) return []

  const colMap: Record<string, string[]> = {}
  for (const f of fields) {
    const raw = group.find((r) => r.field === String(f.name))?.value ?? ""
    colMap[String(f.name)] = splitPipes(raw)
  }

  const length = Math.max(
    ...Object.values(colMap).map((arr) => arr.length || 0),
    0
  )
  const result: T[] = []
  for (let i = 0; i < length; i++) {
    const item: any = {}
    for (const f of fields) {
      const cell = colMap[String(f.name)]?.[i] ?? ""
      item[f.name as string] =
        f.innerArrayDelimiter === "tilde" ? splitTildes(cell) : cell
    }
    result.push(item as T)
  }
  return result
}

export async function loadInformations(): Promise<InformationDetail> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const gid = process.env.SHEET_GID_INFORMATIONS
  if (!sheetId || !gid) {
    throw new Error("GOOGLE_SHEET_ID or SHEET_GID_INFORMATIONS undefined")
  }

  const url = sheetCsvUrl(sheetId, gid)
  const rows = await fetchCsvRows<CsvInformationRow>(url)

  // -------- person ----------
  const person: Omit<Person, "name"> = {
    first_name: get(rows, "person", "first_name"),
    last_name: get(rows, "person", "last_name"),
    role: get(rows, "person", "role"),
    avatar: get(rows, "person", "avatar"),
    email: get(rows, "person", "email"),
    location: get(rows, "person", "location"),
    languages: splitPipes(get(rows, "person", "languages")),
  }
  const name = `${person.first_name ?? ""} ${person.last_name ?? ""}`.trim()

  // ==== template helper ====
  const ctx = { ...person, name }
  const tpl = (t = "") =>
    t.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (ctx as any)[k] ?? "")

  // -------- newsletter --------
  const newsletter = {
    display: bool(get(rows, "newsletter", "display")),
    title: tpl(get(rows, "newsletter", "title")),
    description: get(rows, "newsletter", "description"),
  }

  // -------- social -----------
  const social = zipArrayObjects<Social>(rows, "social", "items", [
    { name: "name" },
    { name: "icon" },
    { name: "link" },
  ])

  // -------- home -------------
  const home: HomeContent = {
    path: get(rows, "home", "path"),
    image: get(rows, "home", "image"),
    label: get(rows, "home", "label"),
    title: tpl(get(rows, "home", "title")),
    description: tpl(get(rows, "home", "description")),
    headline: get(rows, "home", "headline"),
    subline: tpl(get(rows, "home", "subline_md")),
    featured: {
      display: bool(getField(rows, "home", "featured", "display")),
      title: getField(rows, "home", "featured", "title"),
      href: getField(rows, "home", "featured", "href"),
    },
  }

  // -------- about (meta) -----
  const aboutMeta = {
    path: get(rows, "about", "path"),
    label: get(rows, "about", "label"),
    title: tpl(get(rows, "about", "title")),
    description: tpl(get(rows, "about", "description")),
    tableOfContent: {
      display: bool(getField(rows, "about", "table_of_content", "display")),
      subItems: bool(getField(rows, "about", "table_of_content", "sub_items")),
    },
    avatar: { display: bool(getField(rows, "about", "avatar", "display")) },
    calendar: {
      display: bool(getField(rows, "about", "calendar", "display")),
      link: getField(rows, "about", "calendar", "link"),
    },
    intro: {
      display: bool(getField(rows, "about", "intro", "display")),
      title: getField(rows, "about", "intro", "title"),
      description: getField(rows, "about", "intro", "description"),
    },
  }

  // -------- about.project.experiences ----------
  const experiences = zipArrayObjects<{
    company: string
    initial?: string
    timeframe?: string
    role?: string
    techstack?: string[]
    achievement_md?: string[]
    impact_md?: string
    image?: string[]
  }>(rows, "about_project", "experiences", [
    { name: "company" },
    { name: "initial" },
    { name: "timeframe" },
    { name: "role" },
    { name: "techstack", innerArrayDelimiter: "tilde" },
    { name: "achievement_md", innerArrayDelimiter: "tilde" },
    { name: "impact_md" },
    { name: "image", innerArrayDelimiter: "tilde" },
  ])

  // ===== studies (array of objects) =====
  const institutions = zipArrayObjects<{
    name: string
    department: string
    timeframe: string
    experience_md: string[]
  }>(rows, "about_study", "institutions", [
    { name: "name" },
    { name: "department" },
    { name: "timeframe" },
    { name: "experience_md", innerArrayDelimiter: "tilde" },
  ])

  // ===== technical.skills (array of objects) =====
  const techSkills = zipArrayObjects<{
    title: string
    description: string
    icon: string[]
  }>(rows, "about_technical", "skills", [
    { name: "title" },
    { name: "description" },
    { name: "icon", innerArrayDelimiter: "tilde" },
  ])

  const about: About = {
    ...aboutMeta,
    project: {
      display: bool(get(rows, "about_project", "display") || "false"),
      title: get(rows, "about_project", "title") || "Project Experiences",
      experiences,
    },
    studies: {
      display: bool(get(rows, "about_study", "display") || "false"),
      title: get(rows, "about_study", "title") || "Studies",
      institutions,
    },
    technical: {
      display: bool(get(rows, "about_technical", "display") || "false"),
      title: get(rows, "about_technical", "title") || "Technical skills",
      subtitle: get(rows, "about_technical", "subtitle") || "",
      skills: techSkills,
    },
  }

  // ===== basic common =====
  const blog: DisplayBasicCommon = {
    path: get(rows, "blog", "path"),
    label: get(rows, "blog", "label"),
    title: get(rows, "blog", "title"),
    description: tpl(get(rows, "blog", "description")),
  }

  const project: DisplayBasicCommon = {
    path: get(rows, "project", "path"),
    label: get(rows, "project", "label"),
    title: tpl(get(rows, "project", "title")),
    description: tpl(get(rows, "project", "description")),
  }

  const gallery: DisplayBasicCommon & { images: ImageGallery[] } = {
    path: get(rows, "gallery", "path"),
    label: get(rows, "gallery", "label"),
    title: tpl(get(rows, "gallery", "title")),
    description: tpl(get(rows, "gallery", "description")),
    images: zipArrayObjects<ImageGallery>(rows, "gallery", "images", [
      { name: "src" },
      { name: "alt" },
      { name: "orientation" },
    ]),
  }

  return {
    person: { ...person, name },
    newsletter,
    social,
    home,
    about,
    blog,
    project,
    gallery,
  }
}

export async function GET() {
  try {
    const data = await loadInformations()
    return okRead(data)
  } catch (e: any) {
    console.error("[informations:GET]", e)
    return fail(500, "Internal server error", { detail: e?.message })
  }
}
