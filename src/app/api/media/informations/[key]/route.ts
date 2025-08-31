import { NextResponse } from "next/server"
import { listMediaInFolder, resolveFolderPathIds } from "@/lib/drive"
import { fail } from "@/lib/api"

export const revalidate = 3600
const ALLOWED = new Set(["avatar", "logo"])

export async function GET(
  req: Request,
  { params }: { params: { key: string } }
) {
  try {
    const key = params.key
    if (!ALLOWED.has(key)) {
      return fail(400, "Not allowed")
    }

    const { searchParams } = new URL(req.url)
    const debug = searchParams.get("debug") === "1"

    const { folderId, trace } = await resolveFolderPathIds(
      ["informations", key],
      revalidate,
      debug
    )

    const files = await listMediaInFolder(folderId, revalidate)

    return NextResponse.json({
      files,
      meta: {
        path: `informations/${key}`,
        ...(debug && trace ? { trace } : {}),
      },
    })
  } catch (e: any) {
    return fail(404, e?.message || "Not found")
  }
}
