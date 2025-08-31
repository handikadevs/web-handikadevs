import { NextResponse } from "next/server"

const META = {
  version: "0.0.1",
  author: "handikadevs",
}

type PageInfo = {
  total: number
  size: number
  current: number
  last: number
}

export function okList<T>(
  items: T[],
  opts: { page: number; limit: number; total: number }
) {
  const { page, limit, total } = opts
  const last = Math.max(1, Math.ceil(total / limit))
  const from = total === 0 ? 0 : (page - 1) * limit + 1
  const to = total === 0 ? 0 : Math.min(page * limit, total)

  const pageInfo: PageInfo = { total: last, size: limit, current: page, last }

  return NextResponse.json(
    {
      meta: META,
      page: pageInfo,
      from,
      to,
      data: items,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
      status: 200,
    }
  )
}

export function okRead<T>(data: T) {
  return NextResponse.json(
    {
      meta: META,
      data,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
      status: 200,
    }
  )
}

export function fail(
  code: number,
  message: string,
  error: unknown = {},
  data: unknown = null
) {
  return NextResponse.json(
    {
      meta: META,
      code,
      message,
      data,
      error,
    },
    { status: code }
  )
}

export function success(code: number, message: string) {
  return NextResponse.json(
    {
      meta: META,
      code,
      message,
    },
    { status: code }
  )
}
