/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"
import { baseURL } from "@/resources"
import { getInformationsSSR } from "../../server-loader"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const info = await getInformationsSSR()
  const { person } = info

  const urlObj = new URL(request.url)
  const title =
    urlObj.searchParams.get("title") || "Handika Kristofan - Portfolio"

  // safer join untuk avatar (hindari double slash)
  const avatarUrl = person.avatar?.startsWith("http")
    ? person.avatar
    : `${baseURL.replace(/\/$/, "")}${
        person.avatar?.startsWith("/") ? "" : "/"
      }${person.avatar ?? ""}`

  async function loadGoogleFont(font: string) {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      font
    )}`
    const css = await (await fetch(cssUrl)).text()
    // ambil woff2/ttf/otf pertama yang ketemu
    const match = css.match(
      /src:\s*url\(([^)]+)\)\s*format\(['"]?(?:woff2|opentype|truetype|woff)['"]?\)/i
    )
    if (!match) throw new Error("failed to parse font CSS")

    const fontRes = await fetch(match[1])
    if (!fontRes.ok) throw new Error(`failed to load font: ${fontRes.status}`)
    return await fontRes.arrayBuffer()
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "6rem",
          background: "#151515",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4rem",
            fontStyle: "normal",
            color: "white",
          }}
        >
          <span
            style={{
              padding: "1rem",
              fontSize: "6rem",
              lineHeight: "8rem",
              letterSpacing: "-0.05em",
              whiteSpace: "wrap",
              textWrap: "balance",
              overflow: "hidden",
            }}
          >
            {title}
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5rem",
            }}
          >
            <img
              src={avatarUrl}
              alt={person.name || "Profile"}
              style={{
                width: "12rem",
                height: "12rem",
                objectFit: "cover",
                borderRadius: "100%",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "4.5rem",
                  lineHeight: "4.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                }}
              >
                {person.name}
              </span>
              <span
                style={{
                  fontSize: "2.5rem",
                  lineHeight: "2.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                  opacity: "0.6",
                }}
              >
                {person.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist:wght@400"),
          style: "normal",
        },
      ],
    }
  )
}
