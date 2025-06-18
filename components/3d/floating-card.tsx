"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { ClientOnly } from "./client-only-wrapper"

interface FloatingCardProps {
  title: string
  value: string
  icon: React.ReactNode
  delay?: number
}

function FloatingCardFallback() {
  return (
    <Card className="w-48 h-32 crypto-card">
      <CardContent className="p-4 flex flex-col justify-center items-center">
        <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse mb-2" />
        <div className="w-20 h-4 bg-primary/20 rounded animate-pulse mb-1" />
        <div className="w-16 h-3 bg-muted/50 rounded animate-pulse" />
      </CardContent>
    </Card>
  )
}

export function FloatingCard({ title, value, icon, delay = 0 }: FloatingCardProps) {
  return (
    <ClientOnly fallback={<FloatingCardFallback />}>
      <Card
        className="w-48 h-32 crypto-card hover:glow-effect transition-all duration-300 animate-float card-3d"
        style={{ animationDelay: `${delay}s` }}
      >
        <CardContent className="p-4 flex flex-col justify-center items-center text-center">
          <div className="text-primary mb-2">{icon}</div>
          <div className="text-lg font-bold text-primary">{value}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </CardContent>
      </Card>
    </ClientOnly>
  )
}
