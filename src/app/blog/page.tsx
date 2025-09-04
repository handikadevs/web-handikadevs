import { Column, Heading, Meta, Schema } from "@once-ui-system/core"
import { BreadcrumbJsonLd, Mailchimp } from "@/components"
import { baseURL } from "@/resources"
import { getInformationsSSR } from "../api/server-loader"
import { Blogpage } from "@/features"

const info = await getInformationsSSR()
const { blog, person, newsletter } = info

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title ?? "Blog - Handika Kristofan",
    description: blog.description ?? "View Handika Kristofan's Latest Posts",
    baseURL: baseURL ?? "https://handikadevs.vercel.app",
    image: `/api/og/generate?title=${encodeURIComponent(
      blog.title ?? "Blog - Handika Kristofan"
    )}`,
    path: blog.path ?? "/blog",
  })
}

export default function Blog() {
  return (
    <>
      <BreadcrumbJsonLd name="Blog" path="blog" />
      <Column maxWidth="s">
        <Schema
          as="blogPosting"
          baseURL={baseURL ?? "https://handikadevs.vercel.app"}
          title={blog.title ?? "Blog - Handika Kristofan"}
          description={
            blog.description ?? "View Handika Kristofan's Latest Posts"
          }
          path={blog.path ?? "/blog"}
          image={`/api/og/generate?title=${encodeURIComponent(
            blog.title ?? "Blog - Handika Kristofan"
          )}`}
          author={{
            name: person.name ?? "Handika Kristofan",
            url:
              `${baseURL}${blog.path}` || "https://handikadevs.vercel.app/blog",
            image:
              `${baseURL}${person.avatar}` ||
              "https://handikadevs.vercel.app/images/avatar.png",
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
