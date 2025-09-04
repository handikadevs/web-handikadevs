"use client"
import { useEffect, useState } from "react"

export const InstallPrompt = () => {
  const [deferred, setDeferred] = useState<any>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onBIP = (e: any) => {
      e.preventDefault()
      setDeferred(e)
      setVisible(true)
    }
    window.addEventListener("beforeinstallprompt", onBIP as any)
    return () => window.removeEventListener("beforeinstallprompt", onBIP as any)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={async () => {
        await deferred.prompt()
        const { outcome } = await deferred.userChoice
        setDeferred(null)
        setVisible(false)
      }}
      className="fixed bottom-4 right-4 rounded-xl px-4 py-2 shadow-md"
    >
      Install App
    </button>
  )
}
