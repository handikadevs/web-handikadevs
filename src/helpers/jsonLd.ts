import { baseURL } from "@/resources"

type Crumb = { name: string; url?: string }

const makeBreadcrumb = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    ...(c.url ? { item: c.url } : {}),
  })),
})

type JsonLdArgs = {
  name: string
  path: string
  title?: string
}

export const jsonLd = ({ name, path, title }: JsonLdArgs) => {
  const cleanBase = baseURL.replace(/\/$/, "")
  const cleanPath = path.replace(/^\//, "")
  const sectionUrl = `${cleanBase}/${cleanPath}`

  if (!title) {
    return makeBreadcrumb([{ name: "Home", url: cleanBase }, { name }])
  }

  return makeBreadcrumb([
    { name: "Home", url: cleanBase },
    { name, url: sectionUrl },
    { name: title },
  ])
}
