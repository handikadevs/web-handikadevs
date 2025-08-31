"use client"

import { Column, Row, SegmentedControl, Text } from "@once-ui-system/core"
import { UniversalSkeleton, Project, LoadingBoundary } from "@/components"
import { useMemo, useState } from "react"
import { useProjects } from "@/hooks/projects/useProjects"

interface ProjectpageProps {
  range?: [number, number?]
  filter?: boolean
}

export const Projectpage = ({ range, filter = true }: ProjectpageProps) => {
  const [role, setRole] = useState("all")
  const { projects, loading, isRefreshing } = useProjects()

  const filteredProjects = useMemo(() => {
    const list = projects || []
    return list.filter((p) =>
      role === "all"
        ? true
        : p.metadata.team?.some((member) => member.role === role)
    )
  }, [projects, role])

  const displayedProjects = range
    ? filteredProjects.slice(range[0] - 1, range[1] ?? filteredProjects.length)
    : filteredProjects

  if (loading || isRefreshing) {
    return (
      <LoadingBoundary
        loading={!loading}
        fallback={
          <UniversalSkeleton
            variant="project-card"
            withSegment={filter}
            count={displayedProjects.length}
            size="m"
          />
        }
      />
    )
  }

  if (displayedProjects.length === 0) {
    return (
      <Text
        align="center"
        variant="heading-strong-l"
        onBackground="neutral-weak"
      >
        No results available
      </Text>
    )
  }

  return (
    <Column fillWidth gap="xl" marginBottom="20" paddingX="l">
      {filter && (
        <Row horizontal="end" vertical="center">
          <SegmentedControl
            fillWidth={false}
            buttons={[
              { value: "all", label: "All" },
              { value: "developer", label: "Developer" },
              { value: "designer", label: "Designer" },
              { value: "trainer", label: "Trainer" },
            ]}
            selected={role}
            onToggle={(val: string) => setRole(val)}
          />
        </Row>
      )}
      {displayedProjects?.map((project, index) => (
        <Project
          key={project.slug}
          href={`project/${project.slug}`}
          images={project.metadata.images}
          title={project.metadata.title}
          description={project.metadata.summary}
          hasContent={project.hasContent}
          avatars={
            project.metadata.team?.map((member) => ({
              src: member.avatar,
            })) || []
          }
          link={project.metadata.link || []}
        />
      ))}
    </Column>
  )
}
