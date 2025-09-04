"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Carousel, Media } from "@once-ui-system/core"

interface MediaCarouselProps {
  images: string[]
  title: string
  sizes?: string
  aspectRatio?: string
  className?: string
  carouselControls: boolean
  carouselIndicators: "line" | "thumbnail"
}

export const MediaCarousel = ({
  images,
  title,
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
      items={urls.map((src, i) => ({
        slide: (
          <Slide
            key={i}
            src={src}
            alt={title}
            sizes="(max-width: 960px) 100vw, 960px"
            aspectRatio="16 / 9"
            className="position-fixed object-cover w-full h-full"
            priority={i < 1}
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
        aspectRatio={aspectRatio}
        className={className}
        sizes={sizes}
        priority={priority}
        loading={false}
        radius="m"
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
      />
    </div>
  )
}

/* --- detect Safari/iOS robust --- */
// function useIsSafari() {
//   const [isSafari, setIsSafari] = useState(false)
//   useEffect(() => {
//     if (typeof navigator === "undefined") return
//     const ua = navigator.userAgent || ""
//     const vendor = navigator.vendor || ""
//     const isIOS = /iP(hone|ad|od)/i.test(ua)
//     const isChromeLike =
//       /(Chrome|Chromium|CriOS|CrMo|Edg|EdgiOS|OPR|Brave)/i.test(ua)
//     const isFirefoxiOS = /FxiOS/i.test(ua)
//     const isMacSafari =
//       /Safari/i.test(ua) && !isChromeLike && /Apple/i.test(vendor)
//     const isIOSSafari = isIOS && !isChromeLike && !isFirefoxiOS
//     setIsSafari(isMacSafari || isIOSSafari)
//   }, [])
//   return isSafari
// }

// const parseRatio = (ar: string) => {
//   // "16 / 9" -> {w:16,h:9}
//   const [w, h] = ar.split("/").map((n) => Number(n.trim()))
//   return { w: w || 16, h: h || 9 }
// }

// const Slide = ({
//   src,
//   alt,
//   sizes,
//   aspectRatio,
//   className,
//   priority,
// }: {
//   src: string
//   alt: string
//   sizes: string
//   aspectRatio: string
//   className?: string
//   priority: boolean
// }) => {
//   const isSafari = useIsSafari()
//   const [ready, setReady] = useState(false)
//   const [supportsAspect, setSupportsAspect] = useState(true)

//   // reset & precheck khusus Safari (tanpa menambah hook lain)
//   useEffect(() => {
//     setReady(false)
//     // cek dukungan aspect-ratio di runtime
//     const ok =
//       typeof window !== "undefined" &&
//       typeof (window as any).CSS !== "undefined" &&
//       (window as any).CSS.supports?.("aspect-ratio: 1 / 1")
//     setSupportsAspect(!!ok)

//     if (!isSafari) return
//     const img = new Image()
//     img.src = src
//     const done = () => setReady(true)
//     img.onload = done
//     img.onerror = done
//     // kalau sudah cached
//     if ((img as any).complete && (img as any).naturalWidth > 0) setReady(true)
//   }, [src, isSafari])

//   const { w, h } = parseRatio(aspectRatio)
//   const paddingTopPct = (h / w) * 100

//   return (
//     <div
//       className="relative w-full"
//       style={supportsAspect ? { aspectRatio } : undefined}
//       key={src}
//     >
//       {/* Fallback tinggi kalau aspect-ratio TIDAK didukung */}
//       {!supportsAspect && <div style={{ paddingTop: `${paddingTopPct}%` }} />}

//       <div className="absolute inset-0">
//         {/* skeleton */}
//         {!ready &&
//           (isSafari ? (
//             <>
//               <div
//                 aria-hidden
//                 className="absolute inset-0"
//                 style={{
//                   borderRadius: 12,
//                   background:
//                     "linear-gradient(90deg, rgba(255,255,255,.06), rgba(255,255,255,.10), rgba(255,255,255,.06))",
//                   backgroundSize: "200% 100%",
//                   animation: "shimmer 1.2s ease-in-out infinite",
//                 }}
//               />
//               <style
//                 dangerouslySetInnerHTML={{
//                   __html: `
//                 @keyframes shimmer {
//                   0% { background-position: 200% 0; }
//                   100% { background-position: -200% 0; }
//                   }`,
//                 }}
//               />
//             </>
//           ) : (
//             <Media src="" loading />
//           ))}

//         {/* konten */}
//         {isSafari ? (
//           <img
//             src={src}
//             alt={alt}
//             decoding="async"
//             loading={priority ? "eager" : "lazy"}
//             className={className}
//             style={{
//               inset: 0,
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: 12,
//               opacity: ready ? 1 : 0,
//               transition: "opacity .2s ease",
//             }}
//             onLoad={() => setReady(true)}
//             onError={() => setReady(true)}
//           />
//         ) : (
//           <Media
//             src={src}
//             alt={alt}
//             className={className}
//             sizes={sizes}
//             priority={priority}
//             loading={false}
//             onLoad={() => setReady(true)}
//             onError={() => setReady(true)}
//           />
//         )}
//       </div>
//     </div>
//   )
// }
