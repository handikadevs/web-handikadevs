import { NextResponse } from "next/server"
import { listMediaInFolder, resolveFolderPathIds } from "@/lib/drive"
import { fail } from "@/lib/api"

export const revalidate = 3600

export async function GET(
  req: Request,
  { params }: { params: { type: string; slug: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const debug = searchParams.get("debug") === "1"

    const { folderId, trace } = await resolveFolderPathIds(
      ["projects", params.type, params.slug],
      revalidate,
      debug
    )

    const files = await listMediaInFolder(folderId, revalidate)

    return NextResponse.json({
      files,
      meta: {
        path: `projects/${params.type}/${params.slug}`,
        ...(debug && trace ? { trace } : {}),
      },
    })
  } catch (e: any) {
    return fail(400, e?.message || "Bad request")
  }
}
