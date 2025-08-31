import { baseURL } from "@/resources"
import { NextResponse } from "next/server"
import { getBlogsSSR, getInformationsSSR } from "../server-loader"

export async function GET() {
  const info = await getInformationsSSR()
  const blogs = await getBlogsSSR()
  const { blog, person } = info

  // Sort posts by date (newest first)
  const sortedPosts = blogs.sort((a, b) => {
    return (
      new Date(b.metadata.updated_at || b.metadata.created_at).getTime() -
      new Date(a.metadata.updated_at || a.metadata.created_at).getTime()
    )
  })

  // Generate RSS XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${blog.title}</title>
    <link>${baseURL}/blog</link>
    <description>${blog.description}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseURL}/api/rss" rel="self" type="application/rss+xml" />
    <managingEditor>${person.email || "noreply@example.com"} (${
    person.name
  })</managingEditor>
    <webMaster>${person.email || "noreply@example.com"} (${
    person.name
  })</webMaster>
    <image>
      <url>${baseURL}${person.avatar || "/images/avatar.jpg"}</url>
      <title>${blog.title}</title>
      <link>${baseURL}/blog</link>
    </image>
    ${sortedPosts
      .map(
        (post) => `
    <item>
      <title>${post.metadata.title}</title>
      <link>${baseURL}/blog/${post.slug}</link>
      <guid>${baseURL}/blog/${post.slug}</guid>
      <pubDate>${new Date(
        post.metadata.updated_at
          ? post.metadata.updated_at
          : post.metadata.created_at
      ).toUTCString()}</pubDate>
      <description><![CDATA[${post.metadata.summary}]]></description>
      ${
        post.metadata.images
          ? `<enclosure url="${baseURL}${post.metadata.images}" type="image/jpeg" />`
          : ""
      }
      ${post.metadata.tags ? `<category>${post.metadata.tags}</category>` : ""}
      <author>${person.email || "noreply@example.com"} (${person.name})</author>
    </item>`
      )
      .join("")}
  </channel>
</rss>`

  // Return the RSS XML with the appropriate content type
  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
