import { NextResponse } from "next/server"
import { listMediaInFolder, resolveFolderPathIds } from "@/lib/drive"
import { fail } from "@/lib/api"

export const revalidate = 3600

export async function GET(req: Request, context: any) {
  try {
    const { searchParams } = new URL(req.url)
    const debug = searchParams.get("debug") === "1"

    const { folderId, trace } = await resolveFolderPathIds(
      ["projects", context.params.type, context.params.slug],
      revalidate,
      debug
    )

    const files = await listMediaInFolder(folderId, revalidate)

    return NextResponse.json({
      files,
      meta: {
        path: `projects/${context.params.type}/${context.params.slug}`,
        ...(debug && trace ? { trace } : {}),
      },
    })
  } catch (e: any) {
    return fail(400, e?.message || "Bad request")
  }
}
