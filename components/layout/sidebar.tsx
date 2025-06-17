"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { setIsSidebarCollapsed } from "@/redux/state"
import {
  Home,
  TrendingUp,
  Wallet,
  Coins,
  ImageIcon,
  Users,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Crown,
  BarChart3,
  Gift,
  Bell,
  Shield,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Trading", href: "/trading", icon: TrendingUp },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Staking", href: "/staking", icon: Coins },
  { name: "NFT Marketplace", href: "/nft", icon: ImageIcon },
  { name: "DeFi", href: "/defi", icon: BarChart3 },
  { name: "Airdrops", href: "/airdrops", icon: Gift },
  { name: "Referrals", href: "/referrals", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Security", href: "/security", icon: Shield },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { isSidebarCollapsed } = useAppSelector((state) => state.global)

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
  }

  return (
    <div
      className={cn(
        "relative flex flex-col bg-card border-r border-border transition-all duration-300",
        isSidebarCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isSidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Atlanteas Crown
            </span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-8 w-8 p-0">
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isSidebarCollapsed ? "px-2" : "px-3",
                    isActive && "bg-primary/10 text-primary border border-primary/20",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!isSidebarCollapsed && <span className="ml-3">{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
