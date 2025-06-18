"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CryptoToken } from "@/components/3d/crypto-token"
import { ArrowRight, Play, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [marketData, setMarketData] = useState({
    price: 2.45,
    change: 5.2,
    volume: "2.5M",
    marketCap: "125M",
  })

  const [typedText, setTypedText] = useState("")
  const fullText = "The Future of Cryptocurrency Trading"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Mock real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 0.1,
        change: prev.change + (Math.random() - 0.5) * 0.5,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(102,126,234,0.1),transparent_50%)]" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Live Market Badge */}
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 animate-pulse">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping" />
                Live Market
              </Badge>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">ATC:</span>
                <span className="font-bold text-primary">${marketData.price.toFixed(2)}</span>
                <span className={`flex items-center ${marketData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {marketData.change.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {typedText}
                </span>
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Experience the most advanced cryptocurrency platform built on Polkadot. Trade, stake, and manage your
                digital assets with institutional-grade security.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Bank-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Lightning Fast</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    Start Trading Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="group border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{marketData.volume}</div>
                <div className="text-sm text-muted-foreground">24h Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">${marketData.marketCap}</div>
                <div className="text-sm text-muted-foreground">Market Cap</div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Animation */}
          <div className="relative">
            <div className="relative z-10">
              <CryptoToken />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 animate-bounce delay-1000">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>

            <div className="absolute bottom-10 left-10 animate-bounce delay-500">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
