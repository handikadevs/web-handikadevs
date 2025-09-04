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
    title: about.title ?? "About - Handika Kristofan",
    description:
      about.description ??
      "Meet Handika Kristofan, Frontend Developer and Designer from Asia/Jakarta",
    baseURL: baseURL ?? "https://handikadevs.vercel.app",
    image: `/api/og/generate?title=${encodeURIComponent(
      about.title ?? "About - Handika Kristofan"
    )}`,
    path: about.path ?? "/about",
  })
}

export default function About() {
  return (
    <>
      <BreadcrumbJsonLd name="About" path="about" />
      <Schema
        as="webPage"
        baseURL={baseURL ?? "https://handikadevs.vercel.app"}
        title={about.title ?? "About - Handika Kristofan"}
        description={
          about.description ??
          "Meet Handika Kristofan, Frontend Developer and Designer from Asia/Jakarta"
        }
        path={about.path ?? "/about"}
        image={`/api/og/generate?title=${encodeURIComponent(
          about.title ?? "About - Handika Kristofan"
        )}`}
        author={{
          name: person.name ?? "Handika Kristofan",
          url:
            `${baseURL}${about.path}` || "https://handikadevs.vercel.app/about",
          image:
            `${baseURL}${person.avatar}` ||
            "https://handikadevs.vercel.app/images/avatar.png",
        }}
      />
      <Aboutpage person={person} about={about} social={social} />
    </>
  )
}
