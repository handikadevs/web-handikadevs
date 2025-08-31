import { NextRequest } from "next/server"
import * as cookie from "cookie"
import { fail, success } from "@/lib/api"

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || ""
  const cookies = cookie.parse(cookieHeader)

  if (cookies.authToken === "authenticated") {
    return success(200, "User is authenticated")
  } else {
    return fail(401, "Unauthorized")
  }
}
