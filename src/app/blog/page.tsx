import { Column, Heading, Meta, Schema } from "@once-ui-system/core"
import { BreadcrumbJsonLd, Mailchimp } from "@/components"
import { baseURL } from "@/resources"
import { getInformationsSSR } from "../api/server-loader"
import { Blogpage } from "@/features"

const info = await getInformationsSSR()
const { blog, person, newsletter } = info

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  })
}

export default function Blog() {
  return (
    <>
      <BreadcrumbJsonLd name="Blog" path="blog" />
      <Column maxWidth="s">
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          title={blog.title}
          description={blog.description}
          path={blog.path}
          image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}/blog`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Heading
          variant="heading-strong-m"
          onBackground="brand-medium"
          marginBottom="l"
        >
          {blog.title}
        </Heading>
        <Column fillWidth flex={1}>
          <Blogpage range={[1, 1]} thumbnail direction="column" />
          <Blogpage range={[2, 3]} thumbnail />
          <Blogpage range={[4]} columns="2" hidden />
        </Column>
        {newsletter.display && <Mailchimp newsletter={newsletter} />}
      </Column>
    </>
  )
}
