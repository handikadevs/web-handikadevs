"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Carousel, Media } from "@once-ui-system/core"

interface MediaCarouselProps {
  images: string[]
  title: string
  sizes?: string
  aspectRatio?: string
  imageClassName?: string
  carouselControls: boolean
  carouselIndicators: "line" | "thumbnail"
}

export const MediaCarousel = ({
  images,
  title,
  sizes = "(max-width: 960px) 100vw, 960px",
  aspectRatio = "16 / 9",
  imageClassName = "object-cover w-full h-full",
  carouselControls,
  carouselIndicators,
}: MediaCarouselProps) => {
  const urls = useMemo(
    () => images.map((s) => s.trim()).filter(Boolean),
    [images]
  )

  return (
    <Carousel
      indicator={carouselIndicators}
      controls={carouselControls}
      thumbnail={{
        scaling: 1.2,
        height: 5,
      }}
      sizes={sizes}
      items={urls.map((src, i) => ({
        slide: (
          <Slide
            key={src}
            src={src}
            alt={title}
            sizes={sizes}
            aspectRatio={aspectRatio}
            className={imageClassName}
            priority={i === 0}
          />
        ),
        alt: title,
      }))}
    />
  )
}

const Slide = ({
  src,
  alt,
  sizes,
  aspectRatio,
  className,
  priority,
}: {
  src: string
  alt: string
  sizes: string
  aspectRatio: string
  className?: string
  priority: boolean
}) => {
  const holderRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)
    const holder = holderRef.current
    if (!holder) return

    const onImgEvent = (e: Event) => {
      const t = e.target as HTMLImageElement | null
      if (t?.tagName === "IMG") {
        if (t.complete && t.naturalWidth > 0) setReady(true)
      }
    }
    holder.addEventListener("load", onImgEvent, true)
    holder.addEventListener("error", onImgEvent, true)

    const img = holder.querySelector("img") as HTMLImageElement | null
    if (img && img.complete && img.naturalWidth > 0) setReady(true)

    let raf = 0
    let tries = 0
    const tick = () => {
      if (!holder || ready) return
      const i = holder.querySelector("img") as HTMLImageElement | null
      if (i && i.complete && i.naturalWidth > 0) {
        setReady(true)
        return
      }
      if (++tries < 60) raf = requestAnimationFrame(tick) // ~1s
    }
    raf = requestAnimationFrame(tick)

    return () => {
      holder.removeEventListener("load", onImgEvent, true)
      holder.removeEventListener("error", onImgEvent, true)
      cancelAnimationFrame(raf)
    }
  }, [src])

  return (
    <div ref={holderRef} className="relative w-full" style={{ aspectRatio }}>
      {!ready && <Media src="" loading />}

      <Media
        src={src}
        alt={alt}
        className={className}
        sizes={sizes}
        priority={priority}
        loading={false}
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
      />
    </div>
  )
}
