import { NextRequest } from "next/server"
import { getOrSet } from "@/lib/cache"
import { okList, fail } from "@/lib/api"
import { loadAllProjects, type Project } from "@/lib/projects"

const TTL = Number(process.env.CACHE_TTL ?? 120)
export const revalidate = 60

export async function GET(req: NextRequest) {
  try {
    const u = new URL(req.url)
    const page = Math.max(1, Number(u.searchParams.get("page") ?? 1))
    const limit = Math.min(
      50,
      Math.max(1, Number(u.searchParams.get("limit") ?? 10))
    )

    const all = await getOrSet<Project[]>("projects/all", TTL, loadAllProjects)
    const total = all.length
    const start = (page - 1) * limit
    const end = start + limit

    const pageItems = all.slice(start, end).map(({ content_md, ...slim }) => ({
      ...slim,
      hasContent: !!content_md?.trim(),
    }))

    return okList(pageItems, { page, limit, total })
  } catch (e: any) {
    console.error("[projects:list]", e)
    return fail(500, "Internal server error", { detail: e?.message })
  }
}
