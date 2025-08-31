"use client"
import { useEffect, useState } from "react"
import type { MediaItem } from "@/lib/drive"

const ttl = 30 * 60 * 1000 // 30 menit

export function useBlogMedia(slug: string) {
  const key = `media-cache:v1:blogs:${slug}`
  const [files, setFiles] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const now = Date.now()

    // 1) hydrate from sessionStorage
    const raw = sessionStorage.getItem(key)
    if (raw) {
      try {
        const { files: cached, ts } = JSON.parse(raw)
        if (cached?.length) setFiles(cached)
        if (now - ts < ttl) {
          setLoading(false)
          return // cache valid → skip fetch
        }
      } catch {}
    }

    // 2) soft refresh
    ;(async () => {
      try {
        const res = await fetch(
          `/api/media/blogs/${encodeURIComponent(slug)}`,
          { cache: "no-store" }
        )
        const json = await res.json()
        if (!mounted) return
        setFiles(json.files ?? [])
        sessionStorage.setItem(
          key,
          JSON.stringify({ files: json.files ?? [], ts: now })
        )
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [key, slug])

  return { files, loading }
}
