"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { setIsDarkMode } from "@/redux/state"
import { logout } from "@/redux/features/authSlice"
import { disconnectWallet } from "@/redux/features/walletSlice"
import { Bell, Moon, Sun, User, Settings, LogOut, Wallet, Shield } from "lucide-react"
import { toast } from "react-toastify"

export function Header() {
  const dispatch = useAppDispatch()
  const { isDarkMode } = useAppSelector((state) => state.global)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const { isConnected, address, totalUsdValue } = useAppSelector((state) => state.wallet)

  const toggleTheme = () => {
    dispatch(setIsDarkMode(!isDarkMode))
    toast.success(`Switched to ${!isDarkMode ? "dark" : "light"} mode`)
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(disconnectWallet())
    toast.success("Logged out successfully")
  }

  const connectWallet = () => {
    // Mock wallet connection
    toast.success("Wallet connected successfully")
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {isConnected && (
          <Badge variant="secondary" className="bg-green-500/10 text-green-500">
            <Wallet className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Wallet Balance */}
        {isConnected && (
          <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-lg">
            <span className="text-sm text-muted-foreground">Portfolio:</span>
            <span className="font-semibold text-primary">${totalUsdValue.toLocaleString()}</span>
          </div>
        )}

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">3</Badge>
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Wallet Connection */}
        {!isConnected ? (
          <Button onClick={connectWallet} size="sm">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        ) : (
          <Badge variant="outline" className="px-3 py-1">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </Badge>
        )}

        {/* User Menu */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
                  <AvatarFallback>
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <span>Security</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button size="sm">Sign In</Button>
        )}
      </div>
    </header>
  )
}
