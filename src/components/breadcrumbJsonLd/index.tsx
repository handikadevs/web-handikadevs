"use client"
import Script from "next/script"
import { jsonLd } from "@/helpers/jsonLd"

type Props = { name: string; path: string; title?: string; id?: string }

export const BreadcrumbJsonLd = ({ id, ...args }: Props) => {
  const json = jsonLd(args)
  return (
    <Script
      id={id ?? `ld-breadcrumb-${args.path}${args.title ? "-detail" : ""}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
