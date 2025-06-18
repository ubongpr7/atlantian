"use client"

import { Crown, Twitter, Github, TextIcon as Telegram, DiscIcon as Discord } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Trading", href: "/trading" },
        { name: "Staking", href: "/staking" },
        { name: "NFT Marketplace", href: "/nft" },
        { name: "DeFi", href: "/defi" },
        { name: "Analytics", href: "/analytics" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/learn" },
        { name: "Security", href: "/security" },
        { name: "API Docs", href: "/api" },
        { name: "Contact", href: "/contact" },
        { name: "Status", href: "/status" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Press", href: "/press" },
        { name: "Legal", href: "/legal" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Discord", href: "https://discord.gg/atlanteas" },
        { name: "Telegram", href: "https://t.me/atlanteas" },
        { name: "Twitter", href: "https://twitter.com/atlanteas" },
        { name: "GitHub", href: "https://github.com/atlanteas" },
        { name: "Forum", href: "/community" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/atlanteas", label: "Twitter" },
    { icon: Github, href: "https://github.com/atlanteas", label: "GitHub" },
    { icon: Telegram, href: "https://t.me/atlanteas", label: "Telegram" },
    { icon: Discord, href: "https://discord.gg/atlanteas", label: "Discord" },
  ]

  return (
    <footer className="bg-gradient-to-b from-background to-primary/5 border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <Crown className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Atlanteas Crown
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              The future of cryptocurrency trading, built on Polkadot. Experience institutional-grade security with
              lightning-fast performance.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">&copy; 2024 Atlanteas Crown. All rights reserved.</div>

            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
