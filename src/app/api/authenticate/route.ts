import { NextRequest } from "next/server"
import * as cookie from "cookie"
import { fail, success } from "@/lib/api"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { password } = body
  const correctPassword = process.env.PAGE_ACCESS_PASSWORD

  if (!correctPassword) {
    console.error("PAGE_ACCESS_PASSWORD environment variable is not set")
    return fail(500, "Internal server error", {
      detail: "Undefined Access Password",
    })
  }

  if (password === correctPassword) {
    const response = success(200, "Authenticated")

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("authToken", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    )

    return response
  } else {
    return fail(401, "Unauthorized", {
      detail: "Incorrect Password",
    })
  }
}
