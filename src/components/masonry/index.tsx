"use client"

import { useRef, useState, useEffect } from "react"
import Masonry from "react-masonry-css"
import { Media } from "@once-ui-system/core"
import styles from "./Gallery.module.scss"
import type { ImageGallery } from "@/lib/informations"

interface MasonryGridProps {
  images: ImageGallery[]
}

const MasonryItem = ({
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
  const readyRef = useRef(false)

  useEffect(() => {
    readyRef.current = false
    setReady(false)
    const holder = holderRef.current
    if (!holder) return

    const onImgEvent = (e: Event) => {
      const t = e.target as HTMLImageElement | null
      if (t?.tagName === "IMG" && t.complete && t.naturalWidth > 0) {
        if (!readyRef.current) {
          readyRef.current = true
          setReady(true)
        }
      }
    }

    holder.addEventListener("load", onImgEvent, true)
    holder.addEventListener("error", onImgEvent, true)

    const img = holder.querySelector("img") as HTMLImageElement | null
    if (img && img.complete && img.naturalWidth > 0) {
      readyRef.current = true
      setReady(true)
    }

    let raf = requestAnimationFrame(function tick() {
      if (!holder || readyRef.current) return
      const i = holder.querySelector("img") as HTMLImageElement | null
      if (i && i.complete && i.naturalWidth > 0) {
        readyRef.current = true
        setReady(true)
        return
      }
      raf = requestAnimationFrame(tick)
    })

    return () => {
      holder.removeEventListener("load", onImgEvent, true)
      holder.removeEventListener("error", onImgEvent, true)
      cancelAnimationFrame(raf)
    }
  }, [src])

  return (
    <div ref={holderRef}>
      {!ready && (
        <Media src="" loading aspectRatio={aspectRatio} className={className} />
      )}
      <Media
        src={src}
        alt={alt}
        className={className}
        sizes={sizes}
        priority={priority}
        aspectRatio={aspectRatio}
        loading={false}
        radius="m"
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
      />
    </div>
  )
}

export const MasonryGrid = ({ images }: MasonryGridProps) => {
  const breakpointColumnsObj = { default: 2, 720: 1 }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {images.map((image, index) => (
        <MasonryItem
          key={index}
          src={image.src}
          alt={image.alt}
          sizes="(max-width: 560px) 100vw, 50vw"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          priority={index < 10}
          className={styles.gridItem}
        />
      ))}
    </Masonry>
  )
}

//  <Masonry
//       breakpointCols={breakpointColumnsObj}
//       className={styles.masonryGrid}
//       columnClassName={styles.masonryGridColumn}
//     >
//       {images.map((image, index) => (
//         <Media
//           priority={index < 10}
//           sizes="(max-width: 560px) 100vw, 50vw"
//           key={index}
//           radius="m"
//           aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
//           src={image.src}
//           alt={image.alt}
//           className={styles.gridItem}
//         />
//       ))}
//     </Masonry>
