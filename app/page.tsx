"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Crown, TrendingUp, Shield, Zap, Users, Globe, ArrowRight, Play } from "lucide-react"
import { useState, useEffect } from "react"

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Atlantian Crown</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              Platform
            </Link>
            <Link href="/trading" className="text-muted-foreground hover:text-primary transition-colors">
              Trading
            </Link>
            <Link href="/staking" className="text-muted-foreground hover:text-primary transition-colors">
              Staking
            </Link>
            <Link href="/learn" className="text-muted-foreground hover:text-primary transition-colors">
              Learn
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function LandingPage() {
  const [marketData, setMarketData] = useState({
    price: 2.45,
    change: 5.2,
  })

  const features = [
    {
      icon: TrendingUp,
      title: "Advanced Trading",
      description: "Professional trading tools with real-time charts and advanced order types",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Multi-layer security with 2FA, cold storage, and insurance protection",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Ultra-low latency trading engine with instant order execution",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a thriving community of traders and crypto enthusiasts",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Trade from anywhere in the world with 24/7 customer support",
    },
    {
      icon: Crown,
      title: "Premium Features",
      description: "Access exclusive features, airdrops, and staking rewards",
    },
  ]

  const stats = [
    { label: "Total Volume", value: "$2.5B+" },
    { label: "Active Users", value: "500K+" },
    { label: "Countries", value: "150+" },
    { label: "Cryptocurrencies", value: "200+" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🚀 Now Live - Atlantian Crown ATC
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Atlantian Crown
              </span>
              <br />
              The Future of Cryptocurrency Trading
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the most advanced cryptocurrency platform. Trade, stake, and manage your digital assets with
              institutional-grade security and lightning-fast performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Trading
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Market Data */}
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">ATC:</span>
                <span className="font-bold text-primary">${marketData.price.toFixed(2)}</span>
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />+{marketData.change.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Atlantian Crown?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the future of finance with cutting-edge technology and user-centric design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Crypto Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of traders who trust Atlantian Crown for their cryptocurrency needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/trading">
                <Button size="lg" variant="outline">
                  Explore Trading
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Atlantian Crown</span>
              </div>
              <p className="text-muted-foreground">The future of cryptocurrency trading.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/trading">Trading</Link>
                </li>
                <li>
                  <Link href="/staking">Staking</Link>
                </li>
                <li>
                  <Link href="/nft">NFT Marketplace</Link>
                </li>
                <li>
                  <Link href="/defi">DeFi</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/learn">Help Center</Link>
                </li>
                <li>
                  <Link href="/security">Security</Link>
                </li>
                <li>
                  <Link href="/api">API Docs</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/legal">Legal</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Atlantian Crown. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
