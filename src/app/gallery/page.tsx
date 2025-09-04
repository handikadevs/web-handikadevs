import { Flex, Meta, Schema } from "@once-ui-system/core"
import { BreadcrumbJsonLd, MasonryGrid } from "@/components"
import { baseURL } from "@/resources"
import { getInformationsSSR } from "../api/server-loader"

const info = await getInformationsSSR()
const { gallery, person } = info

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title ?? "Gallery - Handika Kristofan",
    description: gallery.description ?? "View Handika Kristofan's Galleries",
    baseURL: baseURL ?? "https://handikadevs.vercel.app",
    image: `/api/og/generate?title=${encodeURIComponent(
      gallery.title ?? "Gallery - Handika Kristofan"
    )}`,
    path: gallery.path ?? "/gallery",
  })
}

export default function Gallery() {
  return (
    <>
      <BreadcrumbJsonLd name="Gallery" path="gallery" />
      <Flex maxWidth="l">
        <Schema
          as="webPage"
          baseURL={baseURL ?? "https://handikadevs.vercel.app"}
          title={gallery.title ?? "Gallery - Handika Kristofan"}
          description={
            gallery.description ?? "View Handika Kristofan's Galleries"
          }
          path={gallery.path ?? "/gallery"}
          image={`/api/og/generate?title=${encodeURIComponent(
            gallery.title ?? "Gallery - Handika Kristofan"
          )}`}
          author={{
            name: person.name ?? "Handika Kristofan",
            url:
              `${baseURL}${gallery.path}` ||
              "https://handikadevs.vercel.app/gallery",
            image:
              `${baseURL}${person.avatar}` ||
              "https://handikadevs.vercel.app/images/avatar.png",
          }}
        />
        <MasonryGrid images={gallery.images} />
      </Flex>
    </>
  )
}
