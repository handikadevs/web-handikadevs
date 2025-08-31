import { fetchCsvRows, sheetCsvUrl, splitPipes } from "@/lib/sheets"

interface BlogCsvRow {
  slug: string
  title: string
  summary: string
  author: string
  avatar_author: string
  images: string
  tags: string
  created_at: string
  updated_at?: string
  content_md?: string
}

export interface Blog {
  slug: string
  metadata: {
    title: string
    summary: string
    author: { avatar: string; name: string }
    images: string[]
    tags: string[]
    created_at: string
    updated_at: string | null
  }
  content_md: string
  hasContent?: boolean
}

const normalizeDate = (s?: string) => (s ?? "").replace(/\//g, "-")

export async function loadAllBlogs(): Promise<Blog[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID!
  const gid = process.env.SHEET_GID_BLOGS!
  const url = sheetCsvUrl(sheetId, gid)

  const rows = await fetchCsvRows<BlogCsvRow>(url)
  return rows
    .map((r) => ({
      slug: r.slug,
      metadata: {
        title: r.title,
        summary: r.summary,
        author: { name: r.author ?? "", avatar: r.avatar_author ?? "" },
        created_at: normalizeDate(r.created_at),
        updated_at: normalizeDate(r.updated_at) || null,
        images: splitPipes(r.images) ?? [],
        tags: splitPipes(r.tags) ?? [],
      },
      content_md: r.content_md ?? "",
    }))
    .sort((a, b) => {
      const aa = a.metadata.updated_at || a.metadata.created_at || ""
      const bb = b.metadata.updated_at || b.metadata.created_at || ""
      return String(bb).localeCompare(String(aa))
    })
}
