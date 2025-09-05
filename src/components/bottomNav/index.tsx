"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Flex, Line, ToggleButton } from "@once-ui-system/core"
import { routes, display } from "@/resources"
import { ThemeToggle } from "@/components/themeToggle"
import styles from "./BottomNav.module.scss"

type IconName = "home" | "grid" | "person" | "book" | "gallery"

type Item = {
  href: string
  icon: IconName
  label: string
  match: (pathname: string) => boolean
}

export const BottomNav = () => {
  const pathname = usePathname() ?? "/"

  useEffect(() => {
    document.body.classList.add("has-bottom-nav")
    return () => document.body.classList.remove("has-bottom-nav")
  }, [])

  const defs: Item[] = [
    { href: "/", icon: "home", label: "Home", match: (p) => p === "/" },
    {
      href: "/about",
      icon: "person",
      label: "About",
      match: (p) => p === "/about",
    },
    {
      href: "/project",
      icon: "grid",
      label: "Project",
      match: (p) => p.startsWith("/project"),
    },
    {
      href: "/blog",
      icon: "book",
      label: "Blog",
      match: (p) => p.startsWith("/blog"),
    },
    {
      href: "/gallery",
      icon: "gallery",
      label: "Gallery",
      match: (p) => p.startsWith("/gallery"),
    },
  ]

  const items = defs.filter((def) => routes[def.href])

  return (
    <Flex
      as="nav"
      role="navigation"
      aria-label="Primary"
      className={`${styles.bar} s-flex-show`}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex={10}
    >
      <div className={styles.inner}>
        {items.map((it) => {
          const active = it.match(pathname)
          return (
            <div
              key={it.href}
              className={`${styles.btn} ${active ? styles.active : ""}`}
            >
              <span className={styles.bubble}>
                <ToggleButton
                  prefixIcon={it.icon}
                  href={it.href}
                  selected={active}
                />
              </span>
              <span className={styles.label}>{it.label}</span>
            </div>
          )
        })}

        {display.themeSwitcher && (
          <>
            <div className={styles.btn}>
              <span className={styles.bubble}>
                <ThemeToggle />
              </span>
            </div>
          </>
        )}
      </div>
    </Flex>
  )
}
