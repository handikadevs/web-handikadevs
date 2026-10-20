// ============================================
// AdBanner — Google AdSense responsive ad unit
// ============================================

"use client"

import { useEffect } from "react"
import classNames from "classnames"

const ADSENSE_CLIENT = "ca-pub-6530666305712669"

interface AdBannerProps {
  /** Ad unit slot ID from the AdSense dashboard (data-ad-slot). */
  slot: string
  className?: string
  format?: "auto" | "horizontal" | "rectangle" | "vertical"
}

export default function AdBanner({
  slot,
  className,
  format = "auto",
}: AdBannerProps) {
  useEffect(() => {
    try {
      // Tell AdSense to render the unit after hydration.
      ;(window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || []
      ;(window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({})
    } catch {
      // Ad blocker or script not loaded — fail silently.
    }
  }, [])

  return (
    <div className={classNames("w-full overflow-hidden", className)}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
