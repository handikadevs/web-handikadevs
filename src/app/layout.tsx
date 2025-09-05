import "@once-ui-system/core/css/styles.css"
import "@once-ui-system/core/css/tokens.css"
import "@/resources/custom.css"
import "@/styles/bottom-nav.tokens.css"

import classNames from "classnames"
import { Flex, Meta } from "@once-ui-system/core"
import { Provider, ThemeInit, AppShell } from "@/components"
import { baseURL, fonts, style, dataStyle } from "@/resources"
import { getInformationsSSR } from "./api/server-loader"
import Script from "next/script"
import { orgJsonLd } from "@/lib/seo"

const SITE_URL = baseURL ?? "https://handikadevs.vercel.app"
const SITE_NAME = "Handika Kristofan - Developer Portfolio"

const info = await getInformationsSSR()
const { person, home, social } = info

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL,
    path: home.path,
    image: home.image,
  })
}

const htmlDataAttrs = {
  "data-brand": style.brand,
  "data-accent": style.accent,
  "data-neutral": style.neutral,
  "data-solid": style.solid,
  "data-solid-style": style.solidStyle,
  "data-border": style.border,
  "data-surface": style.surface,
  "data-transition": style.transition,
  "data-scaling": style.scaling,
  "data-viz-style": dataStyle.variant,
  "data-theme": "dark",
} as Record<string, string>

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const org = orgJsonLd({
    siteUrl: SITE_URL,
    siteName: person ? person.name + " - " + person.role : SITE_NAME,
    logoUrl: person.avatar,
    sameAs: [
      "https://www.linkedin.com/in/handikadevs",
      "https://www.instagram.com/handikabriliann",
      "https://github.com/handikadevs",
      "https://x.com/handikadevs",
    ],
  })

  return (
    <Flex
      as="html"
      lang="en"
      fillWidth
      suppressHydrationWarning
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable
      )}
      {...htmlDataAttrs}
    >
      <head>
        <ThemeInit
          config={{
            brand: style.brand,
            accent: style.accent,
            neutral: style.neutral,
            solid: style.solid,
            "solid-style": style.solidStyle,
            border: style.border,
            surface: style.surface,
            transition: style.transition,
            scaling: style.scaling,
            "viz-style": dataStyle.variant,
          }}
          fallbackTheme="dark"
        />
        <meta
          name="google-site-verification"
          content="NiW7wwHBHlLIW-KdFpoEgiGj-bT1zhQMx4K3YIX0oa4"
        />
        {/* iOS full-screen */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* icon iOS */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        {/* theme color (Android status bar) */}
        <meta name="theme-color" content="#0B0B0C" />
      </head>

      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <Provider>
        <AppShell person={person} social={social}>
          {children}
        </AppShell>
      </Provider>
    </Flex>
  )
}
