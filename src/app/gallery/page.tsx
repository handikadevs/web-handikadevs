import { Flex, Meta, Schema } from "@once-ui-system/core"
import { BreadcrumbJsonLd, MasonryGrid } from "@/components"
import { baseURL } from "@/resources"
import { getInformationsSSR } from "../api/server-loader"

const info = await getInformationsSSR()
const { gallery, person } = info

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  })
}

export default function Gallery() {
  return (
    <>
      <BreadcrumbJsonLd name="Gallery" path="gallery" />
      <Flex maxWidth="l">
        <Schema
          as="webPage"
          baseURL={baseURL}
          title={gallery.title}
          description={gallery.description}
          path={gallery.path}
          image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${gallery.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <MasonryGrid images={gallery.images} />
      </Flex>
    </>
  )
}
