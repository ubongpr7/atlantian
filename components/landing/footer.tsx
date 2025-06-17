"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Crown, Twitter, Github, MessageCircle, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  platform: [
    { name: "Trading", href: "/trading" },
    { name: "Staking", href: "/staking" },
    { name: "DeFi", href: "/defi" },
    { name: "NFT Marketplace", href: "/nft" },
    { name: "Airdrops", href: "/airdrops" },
    { name: "Referrals", href: "/referrals" },
  ],
  resources: [
    { name: "Help Center", href: "/help" },
    { name: "API Documentation", href: "/api" },
    { name: "Security", href: "/security" },
    { name: "Learn", href: "/learn" },
    { name: "Blog", href: "/blog" },
    { name: "Status", href: "/status" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press Kit", href: "/press" },
    { name: "Contact", href: "/contact" },
    { name: "Partners", href: "/partners" },
    { name: "Investors", href: "/investors" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Compliance", href: "/compliance" },
    { name: "Licenses", href: "/licenses" },
    { name: "Disclosures", href: "/disclosures" },
  ],
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/atlanteascrown", color: "hover:text-blue-400" },
  { name: "Discord", icon: MessageCircle, href: "https://discord.gg/atlanteascrown", color: "hover:text-purple-400" },
  { name: "GitHub", icon: Github, href: "https://github.com/atlanteascrown", color: "hover:text-gray-400" },
  { name: "Telegram", icon: Mail, href: "https://t.me/atlanteascrown", color: "hover:text-blue-500" },
]

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-border/50">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Stay Updated</Badge>
            <h3 className="text-3xl font-bold mb-4">Get the Latest Crypto News & Updates</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for market insights, platform updates, exclusive airdrops, and trading tips
              delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
              />
              <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Join 50,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Crown className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Atlanteas Crown
                </span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                The most advanced cryptocurrency platform built on Polkadot. Trade, stake, and manage your digital
                assets with institutional-grade security.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.color}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="h-5 w-5" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-muted-foreground text-sm">© 2024 Atlanteas Crown. All rights reserved.</p>
              <div className="flex items-center space-x-4 text-sm">
                <Badge variant="outline" className="border-green-500/20 text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  All Systems Operational
                </Badge>
                <span className="text-muted-foreground">Built with ❤️ for the crypto community</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Powered by Polkadot</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>Secured by Chainlink</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
