"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { BlockchainVisualization } from "@/components/3d/blockchain-visualization"
import { ArrowRight, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  const stats = [
    { label: "Total Value Locked", value: "$2.5B+", change: "+12.5%" },
    { label: "Daily Transactions", value: "1.2M+", change: "+8.3%" },
    { label: "Active Wallets", value: "500K+", change: "+15.7%" },
  ]

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Ready to Start Your{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Crypto Journey?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of traders who trust Atlanteas Crown for their cryptocurrency needs. Start trading,
                staking, and earning today.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <Card key={stat.label} className="crypto-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-green-500">{stat.change}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter Signup */}
            <Card className="crypto-card p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Stay Updated</h3>
                </div>
                <p className="text-muted-foreground">
                  Get the latest updates on new features, market insights, and exclusive offers.
                </p>

                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button type="submit" className="bg-gradient-to-r from-primary to-purple-600">
                      Subscribe
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2 text-green-500">
                    <CheckCircle className="h-5 w-5" />
                    <span>Successfully subscribed!</span>
                  </div>
                )}
              </div>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button
                  size="lg"
                  className="w-full group bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link href="/trading" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                >
                  Explore Trading
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - 3D Visualization */}
          <div className="relative">
            <BlockchainVisualization />

            {/* Overlay Stats */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border/50">
              <div className="text-sm font-medium text-primary">Live Network</div>
              <div className="text-xs text-muted-foreground">12,543 TPS</div>
            </div>

            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border/50">
              <div className="text-sm font-medium text-green-500">Network Health</div>
              <div className="text-xs text-muted-foreground">99.9% Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
