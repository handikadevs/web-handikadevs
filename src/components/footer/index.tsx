import { Flex, IconButton, SmartLink, Text } from "@once-ui-system/core"
import styles from "./Footer.module.scss"
import { Social } from "@/lib/informations"

interface FooterProps {
  name: string
  social: Social[]
}

export const Footer = ({ name, social }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <Flex
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      mobileDirection="column"
    >
      <Flex
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="space-between"
        vertical="center"
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">Copyright © {currentYear}</Text>
          <Text paddingX="4" onBackground="neutral-weak">
            <SmartLink href="https://linkedin.com/in/handikadevs">
              {name}
            </SmartLink>
          </Text>
        </Text>
        <Flex gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              )
          )}
        </Flex>
      </Flex>
      <Flex height="80" show="s"></Flex>
    </Flex>
  )
}
