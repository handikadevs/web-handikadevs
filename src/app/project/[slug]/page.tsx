import { notFound } from "next/navigation"
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Text,
  Carousel,
  SmartLink,
  Media,
} from "@once-ui-system/core"
import { baseURL } from "@/resources"
import { formatDate } from "@/utils/formatDate"
import {
  ScrollToHash,
  CustomMDX,
  MediaCarousel,
  BreadcrumbJsonLd,
} from "@/components"
import { Metadata } from "next"
import { getInformationsSSR, getProjectsSSR } from "@/app/api/server-loader"

const info = await getInformationsSSR()
const { project: metaProject, person, about } = info

const allProjects = await getProjectsSSR()

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allProjects.map((project) => ({
    slug: project.slug,
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

  let project = allProjects.find((project) => project.slug === slugPath)

  if (!project) return {}

  return Meta.generate({
    title: project.metadata.title,
    description: project.metadata.summary,
    baseURL: baseURL,
    image:
      project.metadata.images[0] ||
      `/api/og/generate?title=${project.metadata.title}`,
    path: `${metaProject.path}/${project.slug}`,
  })
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>
}) {
  const routeParams = await params
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || ""

  let project = allProjects.find((project) => project.slug === slugPath)

  if (!project) {
    notFound()
  }

  const avatars =
    project.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || []

  return (
    <>
      <BreadcrumbJsonLd
        name="Project"
        path="project"
        title={project.metadata.title}
      />
      <Column as="section" maxWidth="m" horizontal="center" gap="l">
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          path={`${metaProject.path}/${project.slug}`}
          title={project.metadata.title}
          description={project.metadata.summary}
          datePublished={project.metadata.created_at}
          dateModified={project.metadata.updated_at ?? ""}
          image={
            project.metadata.images[0] ||
            `/api/og/generate?title=${encodeURIComponent(
              project.metadata.title
            )}`
          }
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Column maxWidth="s" gap="24" align="center">
          <Button
            data-border="rounded"
            href="/project"
            variant="tertiary"
            weight="default"
            size="s"
            prefixIcon="chevronLeft"
          >
            Back
          </Button>
          <Flex gap="12" vertical="center" horizontal="space-between">
            {project.metadata.team && (
              <Flex gap="12">
                <AvatarGroup reverse avatars={avatars} size="m" />
                <SmartLink href="https://linkedin.com/in/handikadevs" unstyled>
                  <Text variant="body-strong-s" onBackground="brand-weak">
                    {project.metadata.team.map((x) => x.name).join(", ")}
                  </Text>
                </SmartLink>
              </Flex>
            )}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {project.metadata.updated_at
                ? formatDate(project.metadata.updated_at)
                : formatDate(project.metadata.created_at)}
            </Text>
          </Flex>
          <Heading variant="display-strong-s">{project.metadata.title}</Heading>
        </Column>
        <MediaCarousel
          images={project.metadata.images}
          title={project.metadata.title}
          carouselControls={false}
          carouselIndicators="thumbnail"
        />
        <Column style={{ margin: "auto" }} as="article" maxWidth="s">
          <CustomMDX source={project.content_md} />
        </Column>
        <ScrollToHash />
      </Column>
    </>
  )
}
