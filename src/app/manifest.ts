import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Handikadevs - Official Site of Handika Kristofan's Portfolio",
    short_name: "Handikadevs",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    background_color: "#132224",
    theme_color: "#132224",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
