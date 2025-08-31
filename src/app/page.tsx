import React from "react"
import { Meta, Schema } from "@once-ui-system/core"
import { baseURL, routes } from "@/resources"
import { getInformationsSSR } from "./api/server-loader"
import { Homepage } from "@/features"
import Script from "next/script"
import { websiteJsonLd, personJsonLd } from "@/lib/seo"

const info = await getInformationsSSR()
const { person, about, home, newsletter } = info

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(home.title)}`,
    path: home.path,
  })
}

const Home = () => {
  const website = websiteJsonLd({
    siteUrl: baseURL,
    siteName: person
      ? person.name + "-" + person.role
      : "Handika Kristofan - Developer Portfolio",
  })

  const personal = personJsonLd({
    siteUrl: baseURL,
    name: person.name ?? "Handika Kristofan",
    jobTitle: person.role ?? "Product Engineering",
    imageUrl: person.avatar,
    sameAs: [
      "https://www.linkedin.com/in/handikadevs",
      "https://github.com/handikadevs",
      "https://www.instagram.com/handikabriliann",
      "https://x.com/handikadevs",
    ],
  })

  return (
    <>
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <Script
        id="ld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personal) }}
      />
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Homepage
        home={home}
        about={about}
        routes={routes}
        newsletter={newsletter}
        srcAvatar={person.avatar}
      />
    </>
  )
}

export default Home
