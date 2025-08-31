import { NextRequest } from "next/server"
import { getOrSet } from "@/lib/cache"
import { okList, fail } from "@/lib/api"
import { loadAllBlogs, type Blog } from "@/lib/blogs"

const TTL = Number(process.env.POSTS_CACHE_TTL ?? 120)
export const revalidate = 60

export async function GET(req: NextRequest) {
  try {
    const u = new URL(req.url)
    const page = Math.max(1, Number(u.searchParams.get("page") ?? 1))
    const limit = Math.min(
      50,
      Math.max(1, Number(u.searchParams.get("limit") ?? 10))
    )
    const withContent =
      (u.searchParams.get("withContent") ?? "false") === "true"

    const all = await getOrSet<Blog[]>("blogs/all", TTL, loadAllBlogs)

    const total = all.length
    const start = (page - 1) * limit
    const end = start + limit
    const pageItems = all.slice(start, end).map((it) => {
      if (withContent) return it
      const { content_md, ...rest } = it
      return rest
    })

    return okList(pageItems, { page, limit, total })
  } catch (e: any) {
    console.error("[blogs:list]", e)
    return fail(500, "Internal server error", { detail: e?.message })
  }
}
