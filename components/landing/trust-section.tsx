"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Shield, Award, Users, TrendingUp, Lock } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "DeFi Trader",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Atlanteas Crown has revolutionized my trading experience. The platform is incredibly intuitive and the security features give me complete peace of mind.",
    rating: 5,
    verified: true,
  },
  {
    name: "Marcus Rodriguez",
    role: "Crypto Investor",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The staking rewards are amazing! I've been earning consistent returns while the platform handles all the technical complexity.",
    rating: 5,
    verified: true,
  },
  {
    name: "Emily Johnson",
    role: "NFT Collector",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The NFT marketplace is seamless. I've discovered incredible collections and the zero gas fees make trading so much more profitable.",
    rating: 5,
    verified: true,
  },
  {
    name: "David Kim",
    role: "Yield Farmer",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Best DeFi platform I've used. The yield farming opportunities are diverse and the APYs are consistently competitive.",
    rating: 5,
    verified: true,
  },
]

const securityBadges = [
  {
    icon: Shield,
    title: "SOC 2 Certified",
    description: "Highest security standards",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Lock,
    title: "256-bit Encryption",
    description: "Military-grade security",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "ISO 27001",
    description: "Information security certified",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Multi-Sig Wallets",
    description: "Enhanced fund protection",
    color: "from-orange-500 to-red-500",
  },
]

const partners = [
  { name: "Polkadot", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Chainlink", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Uniswap", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Compound", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Aave", logo: "/placeholder.svg?height=60&width=120" },
  { name: "1inch", logo: "/placeholder.svg?height=60&width=120" },
]

const trustStats = [
  { label: "Total Value Locked", value: "$2.5B+", icon: TrendingUp },
  { label: "Active Users", value: "500K+", icon: Users },
  { label: "Countries Supported", value: "150+", icon: Shield },
  { label: "Uptime", value: "99.9%", icon: Award },
]

export function TrustSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [stats, setStats] = useState(trustStats)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: stat.label === "Total Value Locked" ? `$${(2.5 + Math.random() * 0.1).toFixed(1)}B+` : stat.value,
        })),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl transform -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-500/10 text-green-500 border-green-500/20">
            <Shield className="h-3 w-3 mr-1" />
            Trusted & Secure
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent block">
              500,000+ Users
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of thousands of users who trust Atlanteas Crown with their digital assets and financial
            future.
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={index}
                className="crypto-card text-center group hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-500/20 transition-all duration-300">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Security Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Security & Compliance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityBadges.map((badge, index) => {
              const IconComponent = badge.icon
              return (
                <Card key={index} className="crypto-card group hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">{badge.title}</h4>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`crypto-card transition-all duration-500 transform ${
                  index === currentTestimonial ? "scale-105 ring-2 ring-primary/20" : "hover:scale-102"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="h-2 w-2 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Logos */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-8 text-muted-foreground">Trusted Partners & Integrations</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
