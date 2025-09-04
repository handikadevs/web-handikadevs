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
    title: home.title ?? "Home - Handika Kristofan",
    description:
      home.description ??
      "View Handika Kristofan's Frontend Developer and Designer From Asia/Jakarta",
    baseURL: baseURL ?? "https://handikadevs.vercel.app",
    image: `/api/og/generate?title=${encodeURIComponent(
      home.title ?? "Home - Handika Kristofan"
    )}`,
    path: home.path ?? "/",
  })
}

const Home = () => {
  const website = websiteJsonLd({
    siteUrl: baseURL ?? "https://handikadevs.vercel.app",
    siteName: person
      ? person.name + "-" + person.role
      : "Handika Kristofan - Frontend Developer and Designer Portfolio",
  })

  const personal = personJsonLd({
    siteUrl: baseURL ?? "https://handikadevs.vercel.app",
    name: person.name ?? "Handika Kristofan",
    jobTitle: person.role ?? "Frontend Developer and Designers",
    imageUrl:
      person.avatar ?? "https://handikadevs.vercel.app/images/avatar.png",
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
        baseURL={baseURL ?? "https://handikadevs.vercel.app"}
        path={home.path ?? "/"}
        title={home.title ?? "Home - Handika Kristofan"}
        description={
          home.description ??
          "View Handika Kristofan's Frontend Developer and Designer From Asia/Jakarta"
        }
        image={`/api/og/generate?title=${encodeURIComponent(
          home.title ?? "Home - Handika Kristofan"
        )}`}
        author={{
          name: person.name ?? "Handika Kristofan",
          url: `${baseURL}${about.path}` || "https://handikadevs.vercel.app/",
          image:
            `${baseURL}${person.avatar}` ||
            "https://handikadevs.vercel.app/images/avatar.png",
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
