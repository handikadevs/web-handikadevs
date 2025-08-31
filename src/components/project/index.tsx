"use client"

import { Column, Flex, Heading, SmartLink, Text } from "@once-ui-system/core"
import { MediaCarousel } from "../mediaCarousel"

type LinkItem = { name: string; url: string }

interface ProjectProps {
  href: string
  images: string[]
  title: string
  description: string
  avatars: { src: string }[]
  link: LinkItem[]
  hasContent?: boolean
}

export const Project: React.FC<ProjectProps> = ({
  href,
  images = [],
  title,
  description,
  avatars,
  link,
  hasContent = false,
}) => {
  return (
    <Column fillWidth gap="m">
      <MediaCarousel
        images={images.slice(0, 2)}
        title={title}
        carouselControls={false}
        carouselIndicators="line"
      />
      <Flex
        mobileDirection="column"
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}

        {(avatars?.length > 0 || description?.trim() || hasContent) && (
          <Column flex={7} gap="16">
            {description?.trim() && (
              <Text
                align="justify"
                variant="body-default-s"
                onBackground="neutral-weak"
              >
                {description}
              </Text>
            )}

            <Flex gap="24" wrap>
              {hasContent && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: 0, width: "fit-content" }}
                  href={href.startsWith("/") ? href : `/${href}`}
                >
                  <Text variant="body-default-s">Read more</Text>
                </SmartLink>
              )}
              {Array.isArray(link) &&
                link.length > 0 &&
                link.map((linkItem) => (
                  <SmartLink
                    suffixIcon="arrowUpRightFromSquare"
                    style={{ margin: 0, width: "fit-content" }}
                    href={linkItem.url}
                    key={`${linkItem.name}-${linkItem.url}`}
                  >
                    <Text variant="body-default-s">{linkItem.name}</Text>
                  </SmartLink>
                ))}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  )
}
