import { Column, Heading, Meta, Schema } from "@once-ui-system/core"
import { getInformationsSSR } from "../api/server-loader"
import { baseURL } from "@/resources"
import { Projectpage } from "@/features"
import { BreadcrumbJsonLd } from "@/components"

const info = await getInformationsSSR()
const { project, person, about } = info

export async function generateMetadata() {
  return Meta.generate({
    title: project.title,
    description: project.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(project.title)}`,
    path: project.path,
  })
}

export default function Project() {
  return (
    <>
      <BreadcrumbJsonLd name="Project" path="project" />
      <Column maxWidth="m">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={project.path}
          title={project.title}
          description={project.description}
          image={`/api/og/generate?title=${encodeURIComponent(project.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
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
