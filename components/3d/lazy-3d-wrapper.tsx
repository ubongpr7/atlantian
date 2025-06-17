"use client"

import type React from "react"

import { Suspense } from "react"

const LoadingFallback = () => (
  <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg">
    <div className="text-center">
      <div className="loading-dots mb-4">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="text-muted-foreground">Loading 3D Experience...</p>
    </div>
  </div>
)

interface Lazy3DWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function Lazy3DWrapper({ children, fallback = <LoadingFallback /> }: Lazy3DWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
