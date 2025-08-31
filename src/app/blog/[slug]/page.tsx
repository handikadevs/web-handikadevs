import { notFound } from "next/navigation"
import { BreadcrumbJsonLd, CustomMDX, ScrollToHash } from "@/components"
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Heading,
  HeadingNav,
  Icon,
  Row,
  Text,
} from "@once-ui-system/core"
import { baseURL } from "@/resources"
import { formatDate } from "@/utils/formatDate"
import { Metadata } from "next"
import { getBlogsSSR, getInformationsSSR } from "@/app/api/server-loader"

const info = await getInformationsSSR()
const blogs = await getBlogsSSR()

const { blog: metaBlog, about } = info

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>
}): Promise<Metadata> {
  const routeParams = await params
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || ""

  let blog = blogs.find((blog) => blog.slug === slugPath)

  if (!blog) return {}

  return Meta.generate({
    title: blog.metadata.title,
    description: blog.metadata.summary,
    baseURL: baseURL,
    image:
      blog.metadata.images[0] ||
      `/api/og/generate?title=${blog.metadata.title}`,
    path: `${metaBlog.path}/${blog.slug}`,
  })
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string | string[] }>
}) {
  const routeParams = await params
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || ""

  let blog = blogs.find((blog) => blog.slug === slugPath)

  if (!blog) {
    notFound()
  }

  const avatars = blog.metadata.author?.avatar
    ? [{ src: blog.metadata.author.avatar }]
    : []

  return (
    <>
      <BreadcrumbJsonLd name="Blog" path="blog" title={blog.metadata.title} />
      <Row fillWidth>
        <Row maxWidth={12} hide="m" />
        <Row fillWidth horizontal="center">
          <Column as="section" maxWidth="xs" gap="l">
            <Schema
              as="blogPosting"
              baseURL={baseURL}
              path={`${metaBlog.path}/${blog.slug}`}
              title={blog.metadata.title}
              description={blog.metadata.summary}
              datePublished={blog.metadata.created_at}
              dateModified={blog.metadata.updated_at ?? ""}
              image={
                blog.metadata.images[0] ||
                `/api/og/generate?title=${encodeURIComponent(
                  blog.metadata.title
                )}`
              }
              author={{
                name: blog.metadata.author.name,
                url: `${baseURL}${about.path}`,
                image: `${baseURL}${blog.metadata.author.avatar}`,
              }}
            />
            <Button
              data-border="rounded"
              href="/blog"
              weight="default"
              variant="tertiary"
              size="s"
              prefixIcon="chevronLeft"
            >
              Back
            </Button>
            <Heading variant="display-strong-s">{blog.metadata.title}</Heading>
            <Row gap="12" vertical="center">
              {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
              <Text variant="body-default-s" onBackground="neutral-weak">
                {blog.metadata.updated_at
                  ? formatDate(blog.metadata.updated_at)
                  : formatDate(blog.metadata.created_at)}
              </Text>
            </Row>
            <Column as="article" fillWidth>
              <CustomMDX source={blog.content_md} />
            </Column>
            <ScrollToHash />
          </Column>
        </Row>
        <Column
          maxWidth={12}
          paddingLeft="40"
          fitHeight
          position="sticky"
          top="80"
          gap="16"
          hide="m"
        >
          <Row
            gap="12"
            paddingLeft="2"
            vertical="center"
            onBackground="neutral-medium"
            textVariant="label-default-s"
          >
            <Icon name="document" size="xs" />
            On this page
          </Row>
          <HeadingNav fitHeight />
        </Column>
      </Row>
    </>
  )
}
