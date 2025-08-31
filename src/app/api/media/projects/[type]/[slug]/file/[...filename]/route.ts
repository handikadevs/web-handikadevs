import { NextResponse } from "next/server"
import { resolveFolderPathIds } from "@/lib/drive"
import { fail } from "@/lib/api"

export const dynamic = "force-dynamic"
export const revalidate = 0

const esc = (s: string) => s.replace(/'/g, "\\'")
const need = (k: string) => {
  const v = process.env[k]
  if (!v) throw new Error(`Missing env: ${k}`)
  return v
}

type Params = { type: string; slug: string; filename: string[] }

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  try {
    const { type, slug, filename } = await ctx.params
    const key = need("GOOGLE_API_KEY")

    const { folderId } = await resolveFolderPathIds(
      ["projects", type, slug],
      revalidate,
      false
    )

    const rawName = decodeURIComponent(filename.join("/"))

    const q = encodeURIComponent(
      `name='${esc(rawName)}' and '${folderId}' in parents and trashed=false`
    )

    const lookup = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${encodeURIComponent(
        "files(id,name,mimeType)"
      )}&pageSize=1&key=${key}`,
      { cache: "no-store" }
    )
    if (!lookup.ok) {
      return fail(
        lookup.status,
        (await lookup.text()) || "Failed to lookup file"
      )
    }

    const data = await lookup.json()
    const file = data?.files?.[0]
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const media = await fetch(
      `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${key}`,
      { cache: "no-store" }
    )
    if (!media.ok || !media.body) {
      return fail(media.status, (await media.text()) || "Failed to fetch file")
    }

    const contentType =
      media.headers.get("content-type") ??
      file.mimeType ??
      "application/octet-stream"
    const contentLength = media.headers.get("content-length") ?? undefined

    const lastSegment = rawName.split("/").pop() || "file"
    const headers: Record<string, string> = {
      "Content-Type": contentType,

      "Cache-Control": "no-store",
      "Content-Disposition": `inline; filename="${lastSegment}"`,
    }
    if (contentLength) headers["Content-Length"] = contentLength

    return new NextResponse(media.body, {
      status: 200,
      headers,
    })
  } catch (e: any) {
    return fail(400, e?.message || "Bad request")
  }
}
