"use client"
import { useEffect, useState } from "react"
import type { MediaItem } from "@/lib/drive"

export function useInformationMedia(keyName: "avatar" | "logo") {
  const key = `media-cache:v1:informations:${keyName}`
  const [files, setFiles] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const now = Date.now()
    const raw = sessionStorage.getItem(key)
    if (raw) {
      try {
        const { files: cached, ts } = JSON.parse(raw)
        if (cached?.length) setFiles(cached)
        if (now - ts < 30 * 60 * 1000) {
          setLoading(false)
          return
        }
      } catch {}
    }

    ;(async () => {
      try {
        const res = await fetch(`/api/media/informations/${keyName}`, {
          cache: "no-store",
        })
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
  }, [keyName, key])

  return { files, loading }
}
