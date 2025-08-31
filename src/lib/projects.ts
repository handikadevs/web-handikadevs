import { fetchCsvRows, sheetCsvUrl, splitPipes } from "@/lib/sheets"
import clampSameLength from "@/helpers/clampSameLength"
import zipToObjects from "@/helpers/zipToObjects"

interface CsvProjectRow {
  slug: string
  title: string
  summary?: string
  images?: string
  tags?: string
  team_names?: string
  team_roles?: string
  team_avatars?: string
  team_linkedins?: string
  link_names?: string
  link_urls?: string
  created_at: string
  updated_at?: string
  content_md?: string
}

interface TeamMember {
  name: string
  role: string
  avatar: string
  linkedIn: string
}
interface LinkItem {
  name: string
  url: string
}

export interface Project {
  slug: string
  metadata: {
    title: string
    summary: string
    images: string[]
    team: TeamMember[]
    link: LinkItem[]
    tags: string[]
    created_at: string
    updated_at: string | null
  }
  content_md: string
  hasContent?: boolean
}

const normalizeDate = (s?: string) => (s ?? "").replace(/\//g, "-")

export async function loadAllProjects(): Promise<Project[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID!
  const gid = process.env.SHEET_GID_PROJECTS!
  const url = sheetCsvUrl(sheetId, gid)

  const rows = await fetchCsvRows<CsvProjectRow>(url)

  return rows
    .map((r) => {
      const images = splitPipes(r.images)
      const tags = splitPipes(r.tags)
      const teamCols = clampSameLength({
        name: splitPipes(r.team_names),
        role: splitPipes(r.team_roles),
        avatar: splitPipes(r.team_avatars),
        linkedIn: splitPipes(r.team_linkedins),
      })
      const team = zipToObjects(teamCols) as TeamMember[]
      const link = zipToObjects({
        name: splitPipes(r.link_names),
        url: splitPipes(r.link_urls),
      }) as LinkItem[]
      return {
        slug: r.slug,
        metadata: {
          title: r.title,
          summary: r.summary ?? "",
          images,
          team,
          link,
          tags,
          created_at: normalizeDate(r.created_at),
          updated_at: normalizeDate(r.updated_at) || null,
        },
        content_md: r.content_md ?? "",
      }
    })
    .sort((a, b) => {
      const aa = (a.metadata.updated_at ||
        a.metadata.created_at ||
        "") as string
      const bb = (b.metadata.updated_at ||
        b.metadata.created_at ||
        "") as string
      return bb.localeCompare(aa)
    })
}
