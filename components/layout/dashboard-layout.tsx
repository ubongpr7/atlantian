"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { useAppSelector } from "@/redux/hooks"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isSidebarCollapsed } = useAppSelector((state) => state.global)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
