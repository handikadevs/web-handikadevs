"use client"
import { ReactNode } from "react"

export const LoadingBoundary = ({
  loading,
  fallback,
  children,
}: {
  loading: boolean
  fallback: ReactNode
  children?: ReactNode
}) => {
  if (loading) return <>{fallback}</>
  return <>{children ?? null}</>
}
