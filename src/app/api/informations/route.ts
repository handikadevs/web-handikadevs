import { okRead, fail } from "@/lib/api"
import { loadInformations } from "@/lib/informations"

export const revalidate = 60

export async function GET() {
  try {
    const data = await loadInformations()
    return okRead(data)
  } catch (e: any) {
    console.error("[informations:GET]", e)
    return fail(500, "Internal server error", { detail: e?.message })
  }
}
