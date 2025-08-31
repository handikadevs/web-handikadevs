import { About, HomeContent, Newsletter } from "@/app/api/informations/route"
import { Mailchimp } from "@/components"
import { RouteMap } from "@/resources/config"
import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
} from "@once-ui-system/core"
import { Blogpage } from "../blog/Blogs"
import { Projectpage } from "../project/Projects"

interface HomepageProps {
  home: HomeContent
  about: About
  routes: RouteMap
  newsletter: Newsletter
  srcAvatar: string
}

export const Homepage = ({
  home,
  about,
  routes,
  newsletter,
  srcAvatar,
}: HomepageProps) => {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="start"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="8"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="brand-weak"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">
                  <strong className="mr-4">{home.featured.title}</strong> | ⭐
                  Project
                </Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="start"
            paddingBottom="16"
          >
            <Heading wrap="balance" variant="display-strong-m">
              <>{home.headline}</>
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="start"
            paddingBottom="32"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
              dangerouslySetInnerHTML={{ __html: home.subline }}
            />
          </RevealFx>
          <RevealFx
            paddingTop="12"
            delay={0.4}
            horizontal="start"
            paddingLeft="12"
          >
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Flex gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={srcAvatar}
                    size="m"
                    loading={!srcAvatar}
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6} horizontal="center">
        <Projectpage range={[1, 1]} filter={false} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20" vertical="center" horizontal="center">
            <Blogpage range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
      <Projectpage range={[2, 2]} filter={false} />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  )
}
