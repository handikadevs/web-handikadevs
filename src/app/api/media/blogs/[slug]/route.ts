import { NextResponse } from "next/server"
import { listMediaInFolder, resolveFolderPathIds } from "@/lib/drive"
import { fail } from "@/lib/api"

export const revalidate = 3600

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const debug = searchParams.get("debug") === "1"

    const { folderId, trace } = await resolveFolderPathIds(
      ["blogs", params.slug],
      revalidate,
      debug
    )

    const files = await listMediaInFolder(folderId, revalidate)

    return NextResponse.json({
      files,
      meta: {
        path: `blogs/${params.slug}`,
        ...(debug && trace ? { trace } : {}),
      },
    })
  } catch (e: any) {
    return fail(404, e?.message || "Not found")
  }
}
