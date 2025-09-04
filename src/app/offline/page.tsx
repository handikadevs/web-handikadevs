import { Column, Heading, Text } from "@once-ui-system/core"

export const dynamic = "error"
export const revalidate = false

export default function Offline() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        Whoops!
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        No Internet Connection
      </Heading>
      <Text onBackground="neutral-weak">
        Check your connection or try again.
      </Text>
    </Column>
  )
}
