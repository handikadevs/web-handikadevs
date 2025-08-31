"use client"

import {
  Column,
  Flex,
  Heading,
  Media,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core"
import styles from "./Blog.module.scss"
import { formatDate } from "@/utils/formatDate"

interface BlogProps {
  slug: string
  images?: string[]
  title: string
  created_at?: string | null
  updated_at?: string | null
  tags?: string[]
  thumbnail: boolean
  direction?: "row" | "column"
}

export const Blog = ({
  slug,
  images,
  title,
  created_at,
  updated_at,
  tags,
  thumbnail,
  direction,
}: BlogProps) => {
  const publishedAt = updated_at ? updated_at : created_at ?? ""
  return (
    <SmartLink
      fillWidth
      unstyled
      style={{ borderRadius: "var(--radius-l)" }}
      key={slug}
      href={`/blog/${slug}`}
    >
      <Flex
        position="relative"
        transition="micro-medium"
        direction={direction}
        radius="l"
        className={styles.hover}
        mobileDirection="column"
        fillWidth
      >
        {images && images.length > 0 && thumbnail && (
          <Media
            priority
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="l"
            src={images[0]}
            alt={"Thumbnail of " + title}
            aspectRatio="16 / 9"
          />
        )}
        <Column
          position="relative"
          fillWidth
          gap="4"
          padding="24"
          vertical="center"
        >
          <Heading as="h2" variant="heading-strong-l" wrap="balance">
            {title}
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            {formatDate(publishedAt, false)}
          </Text>
          {tags && tags.length > 0 && (
            <Tag className="mt-12" label={tags[0]} variant="neutral" />
          )}
        </Column>
      </Flex>
    </SmartLink>
  )
}
