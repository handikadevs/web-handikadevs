import mdx from "@next/mdx"
import nextPWA from "next-pwa"

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
})

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  fallbacks: { document: "/offline.html" },
  runtimeCaching: [
    {
      // cache navigations
      urlPattern: ({ request }) => request.mode === "navigate",
      handler: "NetworkOnly",
      options: {
        cacheName: "navigations",
      },
    },
    {
      urlPattern: ({ request }) =>
        ["style", "script", "worker"].includes(request.destination),
      handler: "StaleWhileRevalidate",
      options: { cacheName: "assets", expiration: { maxEntries: 200 } },
    },
    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 7 },
      },
    },
  ],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  eslint: { ignoreDuringBuilds: true },
}

export default withPWA(withMDX(nextConfig))
