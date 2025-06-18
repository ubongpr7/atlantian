"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FloatingCard } from "@/components/3d/floating-card"
import { TrendingUp, Shield, Zap, Users, Globe, Crown, Wallet, Coins } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Advanced Trading",
      description: "Professional trading tools with real-time charts and advanced order types",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Bank-Grade Security",
      description: "Multi-layer security with 2FA, cold storage, and insurance protection",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Ultra-low latency trading engine with instant order execution",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description: "Join a thriving community of traders and crypto enthusiasts",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Access",
      description: "Trade from anywhere in the world with 24/7 customer support",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: "Premium Features",
      description: "Access exclusive features, airdrops, and staking rewards",
      gradient: "from-primary to-purple-600",
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Multi-Wallet Support",
      description: "Connect with MetaMask, WalletConnect, and other popular wallets",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: "DeFi Integration",
      description: "Access yield farming, liquidity pools, and decentralized lending",
      gradient: "from-rose-500 to-pink-500",
    },
  ]

  const floatingStats = [
    { title: "Total Volume", value: "$2.5B+", icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Active Users", value: "500K+", icon: <Users className="h-6 w-6" /> },
    { title: "Countries", value: "150+", icon: <Globe className="h-6 w-6" /> },
    { title: "Cryptocurrencies", value: "200+", icon: <Coins className="h-6 w-6" /> },
  ]

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Why Choose Atlanteas Crown?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for the future of finance with cutting-edge technology and user-centric design
          </p>
        </div>

        {/* Floating Stats Cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {floatingStats.map((stat, index) => (
            <FloatingCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} delay={index * 0.2} />
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group crypto-card hover:glow-effect transition-all duration-500 card-3d animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
