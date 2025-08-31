"use client"

import { Column, Row, Skeleton } from "@once-ui-system/core"

type Variant =
  | "project-card"
  | "project"
  | "blog-column"
  | "blog-row"
  | "article"
type SizeToken = "xs" | "s" | "m" | "l" | "xl"

interface SkeletonProps {
  variant?: Variant
  size?: SizeToken
  count?: number
  withSegment?: boolean
}

export const UniversalSkeleton = ({
  variant = "project-card",
  withSegment,
  size = "s",
  count = 1,
}: SkeletonProps) => {
  const list = Array.from({ length: count })

  switch (variant) {
    case "project-card":
      return (
        <>
          <Column gap="l" role="status" aria-busy="true" maxWidth="m">
            {withSegment && (
              <Column horizontal="end">
                <Skeleton
                  shape="line"
                  delay="1"
                  width="s"
                  height={size}
                  paddingY="12"
                />
              </Column>
            )}
            {list.map((_, i) => (
              <Column gap="s" key={`project-card-${i}`}>
                <Skeleton shape="block" delay="1" width="l" minHeight="160" />
                <Row gap="s">
                  <Skeleton shape="line" delay="2" width="m" height={size} />
                  <Skeleton shape="line" delay="2" width="l" height={size} />
                </Row>
                <Row gap="s">
                  <Skeleton shape="line" delay="3" width="m" height={size} />
                  <Skeleton shape="line" delay="3" width="l" height={size} />
                </Row>
              </Column>
            ))}
          </Column>
        </>
      )

    case "project":
      return (
        <>
          {list.map((_, i) => (
            <Column
              key={`project-${i}`}
              gap="m"
              role="status"
              aria-busy="true"
              maxWidth="l"
            >
              <Skeleton shape="block" delay="1" width="l" height="xl" />
              <Column gap="s">
                <Skeleton shape="line" delay="1" width="l" height={size} />
                <Skeleton shape="line" delay="1" width="m" height={size} />
              </Column>
              {withSegment && (
                <Row gap="s">
                  <Skeleton shape="block" delay="1" width="s" height="s" />
                  <Skeleton shape="block" delay="1" width="s" height="s" />
                  <Skeleton shape="block" delay="1" width="s" height="s" />
                </Row>
              )}
            </Column>
          ))}
        </>
      )

    case "blog-row":
      return (
        <Row
          gap="s"
          role="status"
          aria-busy="true"
          maxWidth="l"
          paddingBottom="m"
        >
          {list.map((_, i) => (
            <Column key={`blog-row-${i}`} gap="s" maxWidth="xs">
              <Skeleton shape="block" delay="1" width="xs" minHeight="80" />
              <Skeleton shape="line" delay="2" width="xs" height={size} />
              <Skeleton shape="line" delay="3" width="s" height={size} />
            </Column>
          ))}
        </Row>
      )

    case "blog-column":
      return (
        <Column
          gap="l"
          role="status"
          aria-busy="true"
          maxWidth="m"
          paddingBottom="m"
        >
          {list.map((_, i) => (
            <Column gap="s" key={`blog-column-${i}`} horizontal="end">
              <Skeleton shape="block" delay="1" width="l" minHeight="80" />
              <Skeleton shape="line" delay="3" width="m" height={size} />
              <Skeleton shape="line" delay="3" width="l" height={size} />
            </Column>
          ))}
        </Column>
      )

    case "article":
      return (
        <>
          {list.map((_, i) => (
            <Column
              key={`article-${i}`}
              gap="m"
              role="status"
              aria-busy="true"
              maxWidth="l"
            >
              <Skeleton shape="line" delay="1" width="l" height="xl" />
              <Skeleton shape="line" delay="1" width="m" height={size} />
              <Skeleton shape="line" delay="1" width="l" height={size} />
              <Skeleton shape="line" delay="1" width="l" height={size} />
              {withSegment && (
                <Skeleton shape="block" delay="1" width="l" height="l" />
              )}
            </Column>
          ))}
        </>
      )

    default:
      return (
        <Column gap="s" role="status" aria-busy="true">
          {list.map((_, i) => (
            <Skeleton
              key={`default-${i}`}
              shape="line"
              delay="1"
              width="l"
              height={size}
            />
          ))}
        </Column>
      )
  }
}
