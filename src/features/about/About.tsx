import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
} from "@once-ui-system/core"
import styles from "@/components/tableOfContent/about.module.scss"
import parse from "html-react-parser"
import { splitFragments, splitToList } from "@/helpers/splitFragments"
import { About, Person, Social } from "@/app/api/informations/route"
import React from "react"
import { ScheduleButton, TableOfContents } from "@/components"

interface AboutpageProps {
  person: Person
  about: About
  social: Social[]
}
export const Aboutpage = ({ person, about, social }: AboutpageProps) => {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.project.title,
      display: about.project.display,
      items: about.project.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ]

  return (
    <Column maxWidth="m">
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages && person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="4"
                marginBottom="m"
                vertical="center"
              >
                <Icon
                  paddingLeft="12"
                  name="calendar"
                  onBackground="brand-weak"
                />
                <Flex paddingX="8">Let’s meet online</Flex>
                <ScheduleButton
                  className="calendar-button"
                  url="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ghiQY9VYrihV8LqHpkg1UhfQoi6_ZAPBaCZybm3shuov6l-qagJpfKpg9_Ma6P35N3cPkGKeE?gv=true"
                />
              </Flex>
            )}
            <Heading className={styles.textAlign} variant="display-strong-l">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Button
                          className="s-flex-hide"
                          key={item.name}
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="s"
                          weight="default"
                          variant="secondary"
                        />
                        <IconButton
                          className="s-flex-show"
                          size="l"
                          key={`${item.name}-icon`}
                          href={item.link}
                          icon={item.icon}
                          variant="secondary"
                        />
                      </React.Fragment>
                    )
                )}
              </Flex>
            )}
          </Column>

          {about.intro.display && (
            <Column
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="xl"
              align="justify"
            >
              {about.intro.description}
            </Column>
          )}

          {about.project.display && (
            <>
              <Heading
                as="h2"
                id={about.project.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.project.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.project.experiences.map((experience, index) => (
                  <Column
                    key={`${experience.company}-${experience.role}-${index}`}
                    fillWidth
                  >
                    <Flex
                      fillWidth
                      horizontal="space-between"
                      marginBottom="4"
                      vertical="end"
                    >
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak"
                      >
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="m"
                    >
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="4">
                      {experience.achievement_md?.flatMap((achievement, idx) =>
                        splitToList(achievement).map((frag, i) => (
                          <li key={`${experience.company}-${idx}-${i}`}>
                            {parse(frag)}
                          </li>
                        ))
                      )}
                    </Column>
                    {experience.impact_md && (
                      <Text
                        variant="body-default-m"
                        key={`${experience.company}-impact`}
                        dangerouslySetInnerHTML={{
                          __html: `💡 Impact : ${experience.impact_md}`,
                        }}
                      />
                    )}
                    {experience.techstack &&
                      experience.techstack.length > 0 && (
                        <Flex fillWidth paddingTop="m" gap="8" wrap>
                          <Text
                            variant="body-default-m"
                            key={`${experience.company}-impact`}
                          >
                            Core Stack :
                          </Text>
                          {experience.techstack.map((techstack, index) => (
                            <Tag key={`${techstack}-${index}`} size="l">
                              {techstack}
                            </Tag>
                          ))}
                        </Flex>
                      )}
                    {experience.image && experience.image.length > 0 && (
                      <Flex
                        fillWidth
                        paddingTop="m"
                        paddingLeft="40"
                        gap="12"
                        wrap
                      >
                        {experience.image.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              //@ts-ignore
                              sizes={image.width.toString()}
                              //@ts-ignore
                              alt={image.alt}
                              //@ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading
                as="h2"
                id={about.studies.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column
                    key={`${institution.name}-${index}`}
                    fillWidth
                    gap="4"
                  >
                    <Flex
                      fillWidth
                      horizontal="space-between"
                      marginBottom="4"
                      vertical="center"
                    >
                      <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak"
                      >
                        {institution.timeframe}
                      </Text>
                    </Flex>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="m"
                    >
                      {institution.department}
                    </Text>
                    <Column as="ul" gap="4">
                      {institution.experience_md?.flatMap((experience, idx) =>
                        splitToList(experience).map((frag, i) => (
                          <li key={`${institution.name}-${idx}-${i}`}>
                            {parse(frag)}
                          </li>
                        ))
                      )}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
              >
                {about.technical.title}
              </Heading>
              <Text
                variant="body-default-m"
                onBackground="neutral-weak"
                marginBottom="20"
              >
                {about.technical.subtitle}
              </Text>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    {
                      <div key={`skill-${index}`}>
                        {splitFragments(skill.description).length ? (
                          <ul>
                            {splitFragments(skill.description).map((p, j) => (
                              <li key={`skill-${index}-item-${j}`}>
                                <Text
                                  variant="body-default-m"
                                  onBackground="neutral-weak"
                                >
                                  {p}
                                </Text>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <Text
                            variant="body-default-m"
                            onBackground="neutral-weak"
                          >
                            {skill.description}
                          </Text>
                        )}
                      </div>
                    }
                    {skill.icon && (
                      <Flex fillWidth paddingTop="m" gap="12" wrap>
                        {skill.icon.map((icon, index) => (
                          <Icon key={index} name={icon} />
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  )
}
