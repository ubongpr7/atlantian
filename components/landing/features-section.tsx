"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FloatingCards } from "@/components/3d/floating-card"
import {
  Wallet,
  TrendingUp,
  Coins,
  Users,
  Gift,
  Shield,
  BarChart3,
  ImageIcon,
  Zap,
  Globe,
  Lock,
  Smartphone,
} from "lucide-react"

const features = [
  {
    icon: Wallet,
    title: "Multi-Chain Wallet",
    description: "Secure wallet supporting 200+ cryptocurrencies with hardware wallet integration",
    color: "from-blue-500 to-cyan-500",
    stats: "200+ Assets",
    delay: 0,
  },
  {
    icon: TrendingUp,
    title: "Advanced Trading",
    description: "Professional trading tools with real-time charts, advanced orders, and low fees",
    color: "from-green-500 to-emerald-500",
    stats: "0.1% Fees",
    delay: 100,
  },
  {
    icon: Coins,
    title: "Staking Rewards",
    description: "Earn up to 15% APY by staking your tokens in our secure staking pools",
    color: "from-purple-500 to-pink-500",
    stats: "Up to 15% APY",
    delay: 200,
  },
  {
    icon: Shield,
    title: "Smart Contracts",
    description: "Deploy and interact with smart contracts on multiple blockchain networks",
    color: "from-orange-500 to-red-500",
    stats: "Multi-Chain",
    delay: 300,
  },
  {
    icon: Users,
    title: "Referral Program",
    description: "Earn rewards by inviting friends with our multi-tier referral system",
    color: "from-indigo-500 to-purple-500",
    stats: "15% Commission",
    delay: 400,
  },
  {
    icon: Gift,
    title: "Airdrops",
    description: "Get free tokens through our exclusive airdrop campaigns and events",
    color: "from-pink-500 to-rose-500",
    stats: "Weekly Drops",
    delay: 500,
  },
  {
    icon: BarChart3,
    title: "DeFi Protocols",
    description: "Access lending, borrowing, and yield farming across DeFi protocols",
    color: "from-teal-500 to-green-500",
    stats: "50+ Protocols",
    delay: 600,
  },
  {
    icon: ImageIcon,
    title: "NFT Marketplace",
    description: "Trade, create, and collect NFTs in our integrated marketplace",
    color: "from-violet-500 to-purple-500",
    stats: "Zero Gas Fees",
    delay: 700,
  },
]

const additionalFeatures = [
  { icon: Zap, title: "Lightning Fast", description: "Sub-second transaction processing" },
  { icon: Globe, title: "Global Access", description: "Available in 150+ countries" },
  { icon: Lock, title: "Bank-Grade Security", description: "Multi-layer security protection" },
  { icon: Smartphone, title: "Mobile First", description: "Native iOS and Android apps" },
]

export function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Platform Features</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Everything You Need for
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent block">
              Crypto Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From beginner-friendly tools to advanced trading features, our platform provides everything you need to
            succeed in the crypto space.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:from-card/70 hover:to-card/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer`}
                style={{
                  animationDelay: `${feature.delay}ms`,
                }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-6 relative z-10">
                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{feature.description}</p>

                  {/* Stats Badge */}
                  <Badge
                    variant="secondary"
                    className={`bg-gradient-to-r ${feature.color} text-white border-0 transform group-hover:scale-105 transition-transform duration-300`}
                  >
                    {feature.stats}
                  </Badge>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </CardContent>

                {/* Animated Border */}
                <div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ padding: "1px" }}
                >
                  <div className="w-full h-full rounded-lg bg-card" />
                </div>
              </Card>
            )
          })}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {additionalFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-500/20 transition-all duration-300 transform group-hover:scale-110">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* 3D Floating Cards */}
        <div className="relative h-64 mb-16">
          <FloatingCards />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Interactive Experience</h3>
              <p className="text-muted-foreground">Powered by cutting-edge 3D technology</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
