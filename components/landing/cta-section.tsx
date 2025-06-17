"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BlockchainVisualization } from "@/components/3d/blockchain-visualization"
import { ArrowRight, Mail, Gift, Zap, Crown } from "lucide-react"
import Link from "next/link"
import { toast } from "react-toastify"

export function CTASection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubscribed(true)
    toast.success("Successfully subscribed! Welcome bonus incoming 🎉")
    setEmail("")
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(102,126,234,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(240,147,251,0.2),transparent_50%)]" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-500 rounded-full opacity-20 blur-xl" />
      </div>
      <div className="absolute bottom-20 right-20 animate-float delay-1000">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white border-0">
                <Gift className="h-3 w-3 mr-1" />
                Limited Time Offer
              </Badge>

              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Start Your
                <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent block">
                  Crypto Journey
                </span>
                Today
              </h2>

              <p className="text-xl text-muted-foreground">
                Join over 500,000 users and get exclusive access to premium features, airdrops, and a $50 welcome bonus
                when you sign up.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                { icon: Crown, text: "Premium account features for 30 days" },
                { icon: Gift, text: "$50 welcome bonus in ATC tokens" },
                { icon: Zap, text: "Zero trading fees for your first month" },
                { icon: Mail, text: "Exclusive airdrops and early access" },
              ].map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit.text}</span>
                  </div>
                )
              })}
            </div>

            {/* Email Signup */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
                    disabled={isSubscribed}
                  />
                </div>
                <Button
                  onClick={handleSubscribe}
                  disabled={isSubscribed}
                  className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300 transform hover:scale-105"
                >
                  {isSubscribed ? (
                    <>
                      <Gift className="mr-2 h-4 w-4" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy Policy. No spam, unsubscribe anytime.
              </p>
            </div>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard" className="flex-1">
                <Button
                  size="lg"
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Launch Platform
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>

              <Link href="/learn" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - 3D Visualization */}
          <div className="relative">
            <div className="relative z-10">
              <BlockchainVisualization />
            </div>

            {/* Overlay Stats */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">500K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">$2.5B+</div>
                  <div className="text-sm text-muted-foreground">Total Volume</div>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-background">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}
