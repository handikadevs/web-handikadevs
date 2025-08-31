import { MetadataRoute } from "next"
import { baseURL, routes as routesConfig } from "@/resources"
import { getBlogsSSR, getProjectsSSR } from "./api/server-loader"

const normBase = baseURL.replace(/\/+$/, "")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogsRaw, projectsRaw] = await Promise.all([
    getBlogsSSR().catch(() => [] as any[]),
    getProjectsSSR().catch(() => [] as any[]),
  ])

  const blogEntries: MetadataRoute.Sitemap = (blogsRaw ?? [])
    .filter((b) => b?.slug)
    .map((b) => ({
      url: `${normBase}/blog/${b.slug}`,
      lastModified: new Date(
        b.metadata?.updated_at || b.metadata?.created_at || Date.now()
      ),
    }))

  const projectEntries: MetadataRoute.Sitemap = (projectsRaw ?? [])
    .filter((p) => p?.slug)
    .map((p) => ({
      url: `${normBase}/project/${p.slug}`,
      lastModified: new Date(
        p.metadata?.updated_at || p.metadata?.created_at || Date.now()
      ),
    }))

  const activeRoutes = Object.keys(routesConfig).filter(
    (r) => routesConfig[r as keyof typeof routesConfig]
  )

  const staticEntries: MetadataRoute.Sitemap = activeRoutes
    .filter(Boolean)
    .map((r) => ({
      url: r === "/" ? normBase : `${normBase}${r}`,
      lastModified: new Date(),
    }))

  const all = [...staticEntries, ...projectEntries, ...blogEntries]
  const seen = new Set<string>()
  const deduped = all.filter((item) => {
    if (!item?.url) return false
    const key = item.url
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return deduped
}
