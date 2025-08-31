import { NextResponse } from "next/server"
import { resolveFolderPathIds } from "@/lib/drive"
import { fail } from "@/lib/api"

export const revalidate = 3600
const ALLOWED = new Set(["avatar", "logo"])

const esc = (s: string) => s.replace(/'/g, "\\'")
const need = (k: string) => {
  const v = process.env[k]
  if (!v) throw new Error(`Missing env: ${k}`)
  return v
}

export async function GET(
  _req: Request,
  { params }: { params: { key: string; filename: string[] } }
) {
  try {
    if (!ALLOWED.has(params.key)) {
      return NextResponse.json({ error: "Not allowed" }, { status: 400 })
    }

    const keyApi = need("GOOGLE_API_KEY")
    const { folderId } = await resolveFolderPathIds(
      ["informations", params.key],
      revalidate,
      false
    )
    const rawName = decodeURIComponent(params.filename.join("/"))

    const q = encodeURIComponent(
      `name='${esc(rawName)}' and '${folderId}' in parents and trashed=false`
    )
    const lookup = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${encodeURIComponent(
        "files(id,name,mimeType)"
      )}&pageSize=1&key=${keyApi}`,
      { next: { revalidate } }
    )
    if (!lookup.ok) {
      return fail(
        lookup.status,
        (await lookup.text()) || "Failed to lookup file"
      )
    }
    const data = await lookup.json()
    const file = data?.files?.[0]
    if (!file) return fail(404, "File not found")

    const media = await fetch(
      `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${keyApi}`,
      { next: { revalidate } }
    )
    if (!media.ok) {
      return fail(media.status, (await media.text()) || "Failed to fetch file")
    }

    const contentType =
      media.headers.get("content-type") ||
      file.mimeType ||
      "application/octet-stream"

    return new NextResponse(media.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          "public, s-maxage=3600, max-age=3600, stale-while-revalidate=86400",
      },
    })
  } catch (e: any) {
    return fail(400, e?.message || "Bad request")
  }
}
