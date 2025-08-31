export type SocialUrl =
  | `https://linkedin.com/${string}`
  | `https://www.linkedin.com/${string}`
  | `https://github.com/${string}`
  | `https://x.com/${string}`
  | `https://twitter.com/${string}`
  | `https://www.instagram.com/${string}`
  | `https://dribbble.com/${string}`
  | `https://behance.net/${string}`
  | `https://medium.com/${string}`
  | `https://youtube.com/${string}`
  | `https://www.youtube.com/${string}`

export function orgJsonLd(opts: {
  siteUrl: string
  siteName: string
  logoUrl?: string
  sameAs?: SocialUrl[]
}) {
  const base = stripTrailingSlash(opts.siteUrl)
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: opts.siteName,
    url: base,
    ...(opts.logoUrl ? { logo: absoluteUrl(base, opts.logoUrl) } : {}),
    ...(opts.sameAs && opts.sameAs.length ? { sameAs: opts.sameAs } : {}),
  }
}

export function websiteJsonLd(opts: {
  siteUrl: string
  siteName: string
  searchPath?: string
}) {
  const base = stripTrailingSlash(opts.siteUrl)
  const data: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: base,
    name: opts.siteName,
  }
  if (opts.searchPath) {
    const target = absoluteUrl(base, opts.searchPath)
    data.potentialAction = {
      "@type": "SearchAction",
      target,
      "query-input": "required name=query",
    }
  }
  return data
}

export function personJsonLd(opts: {
  siteUrl: string
  name: string
  jobTitle?: string
  imageUrl?: string
  sameAs?: SocialUrl[]
}) {
  const base = stripTrailingSlash(opts.siteUrl)
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    ...(opts.jobTitle ? { jobTitle: opts.jobTitle } : {}),
    ...(opts.imageUrl ? { image: absoluteUrl(base, opts.imageUrl) } : {}),
    ...(opts.sameAs && opts.sameAs.length ? { sameAs: opts.sameAs } : {}),
    url: base,
  }
}

/* ---------- utils ---------- */
function stripTrailingSlash(u: string) {
  return u.replace(/\/+$/, "")
}
function absoluteUrl(base: string, maybePath: string) {
  if (/^https?:\/\//.test(maybePath)) return maybePath
  const left = stripTrailingSlash(base)
  const right = maybePath.startsWith("/") ? maybePath : `/${maybePath}`
  return `${left}${right}`
}
