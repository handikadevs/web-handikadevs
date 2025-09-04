import { Column, Heading, Meta, Schema } from "@once-ui-system/core"
import { getInformationsSSR } from "../api/server-loader"
import { baseURL } from "@/resources"
import { Projectpage } from "@/features"
import { BreadcrumbJsonLd } from "@/components"

const info = await getInformationsSSR()
const { project, person, about } = info

export async function generateMetadata() {
  return Meta.generate({
    title: project.title ?? "Project - Handika Kristofan",
    description: project.description ?? "View Handika Kristofan's Projects",
    baseURL: baseURL ?? "https://handikadevs.vercel.app",
    image: `/api/og/generate?title=${encodeURIComponent(
      project.title ?? "Project - Handika Kristofan"
    )}`,
    path: project.path ?? "/project",
  })
}

export default function Project() {
  return (
    <>
      <BreadcrumbJsonLd name="Project" path="project" />
      <Column maxWidth="m">
        <Schema
          as="webPage"
          baseURL={baseURL ?? "https://handikadevs.vercel.app"}
          path={project.path ?? "/project"}
          title={project.title ?? "Project - Handika Kristofan"}
          description={
            project.description ?? "View Handika Kristofan's Projects"
          }
          image={`/api/og/generate?title=${encodeURIComponent(
            project.title ?? "Project - Handika Kristofan"
          )}`}
          author={{
            name: person.name ?? "Handika Kristofan",
            url:
              `${baseURL}${about.path}` ||
              "https://handikadevs.vercel.app/project",
            image:
              `${baseURL}${person.avatar}` ||
              "https://handikadevs.vercel.app/images/avatar.png",
          }}
        />
        <Heading
          variant="heading-strong-m"
          onBackground="brand-medium"
          marginBottom="l"
          align="center"
        >
          {project.title}
        </Heading>
        <Projectpage />
      </Column>
    </>
  )
}
