"use client"

import { Column, Flex } from "@once-ui-system/core"
import DecorBackground from "./DecorBackground"
import { Header, Footer, RouteGuard, InstallPrompt } from "@/components"

export const AppShell = ({
  person,
  social,
  children,
}: {
  person: { name: string; location: string }
  social: any
  children: React.ReactNode
}) => {
  return (
    <Column
      as="body"
      background="page"
      fillWidth
      style={{ minHeight: "100vh" }}
      margin="0"
      padding="0"
      horizontal="center"
    >
      <InstallPrompt />
      <DecorBackground />
      <Flex fillWidth minHeight="16" hide="s" />
      <Header location={person.location} />
      <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
        <Flex horizontal="center" fillWidth minHeight="0">
          <RouteGuard>{children}</RouteGuard>
        </Flex>
      </Flex>
      <Footer name={person.name} social={social} />
    </Column>
  )
}
