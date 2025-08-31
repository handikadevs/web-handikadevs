"use client"

import { useEffect, useRef } from "react"

interface Props {
  url: string
  label?: string
  color?: string
  className?: string
}

export const ScheduleButton = ({
  url,
  label = "⮞",
  color = "#0B8184",
  className,
}: Props) => {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || typeof window === "undefined") return
    if (!document.querySelector("link[data-gcal-css]")) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href =
        "https://calendar.google.com/calendar/scheduling-button-script.css"
      link.setAttribute("data-gcal-css", "1")
      document.head.appendChild(link)
    }

    const removeOldButtons = () => {
      if (!host) return
      host
        .querySelectorAll(".calendar-scheduling-button")
        .forEach((n) => n.remove())
      host
        .querySelectorAll("script[data-gcal-sentinel]")
        .forEach((n) => n.remove())
    }
    removeOldButtons()

    const sentinel = document.createElement("script")
    sentinel.setAttribute("type", "text/plain")
    sentinel.setAttribute("data-gcal-sentinel", "1")
    host.appendChild(sentinel)

    const loadBtn = () => {
      // @ts-ignore
      window.calendar?.schedulingButton?.load({
        url,
        color,
        label,
        target: sentinel,
      })

      const tick = () => {
        if (!host) return
        const btn = host.querySelector<HTMLAnchorElement>(
          ".calendar-scheduling-button"
        )
        if (btn) {
          if (btn.target) btn.target = ""
          if (btn.parentElement !== host) host.appendChild(btn)
        }
      }
      setTimeout(tick, 0)
      setTimeout(tick, 50)
      setTimeout(tick, 150)
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      "script[data-gcal-script]"
    )
    if (!(window as any).calendar?.schedulingButton) {
      if (!existingScript) {
        const s = document.createElement("script")
        s.src =
          "https://calendar.google.com/calendar/scheduling-button-script.js"
        s.async = true
        s.setAttribute("data-gcal-script", "1")
        s.onload = loadBtn
        document.body.appendChild(s)
      } else {
        existingScript.addEventListener("load", loadBtn, { once: true })
      }
    } else {
      loadBtn()
    }

    return () => {
      removeOldButtons()
    }
  }, [url, label, color])

  return <div ref={hostRef} className={className} />
}
