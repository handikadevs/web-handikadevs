import { Meta, Schema } from "@once-ui-system/core"
import { baseURL } from "@/resources"
import React from "react"
import { getInformationsSSR } from "../api/server-loader"
import { Aboutpage } from "@/features"
import { BreadcrumbJsonLd } from "@/components"

const info = await getInformationsSSR()
const { person, about, social } = info

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  })
}

export default function About() {
  return (
    <>
      <BreadcrumbJsonLd name="About" path="about" />
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Aboutpage person={person} about={about} social={social} />
    </>
  )
}
