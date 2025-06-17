"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "react-toastify"
import { Users, Copy, Share, Gift, TrendingUp, Crown, Star, Award } from "lucide-react"

export default function ReferralsPage() {
  const [referralCode] = useState("ATLANTEAS-CROWN-2024")
  const [customMessage, setCustomMessage] = useState("")

  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 125.5,
    thisMonthEarnings: 45.25,
    tier: "Gold",
    nextTierProgress: 75,
  }

  const referralHistory = [
    { id: "1", username: "user123", joinDate: "2024-01-15", status: "active", earnings: 25.0, level: 2 },
    { id: "2", username: "crypto_fan", joinDate: "2024-01-12", status: "active", earnings: 30.5, level: 3 },
    { id: "3", username: "trader_pro", joinDate: "2024-01-10", status: "active", earnings: 15.75, level: 1 },
    { id: "4", username: "hodler2024", joinDate: "2024-01-08", status: "inactive", earnings: 20.25, level: 2 },
    { id: "5", username: "defi_lover", joinDate: "2024-01-05", status: "active", earnings: 34.0, level: 4 },
  ]

  const tierBenefits = [
    { tier: "Bronze", referrals: "1-5", commission: "5%", bonus: "10 ATC" },
    { tier: "Silver", referrals: "6-15", commission: "7%", bonus: "25 ATC" },
    { tier: "Gold", referrals: "16-30", commission: "10%", bonus: "50 ATC" },
    { tier: "Platinum", referrals: "31-50", commission: "12%", bonus: "100 ATC" },
    { tier: "Diamond", referrals: "50+", commission: "15%", bonus: "250 ATC" },
  ]

  const copyReferralLink = () => {
    const referralLink = `https://atlanteascrown.com/signup?ref=${referralCode}`
    navigator.clipboard.writeText(referralLink)
    toast.success("Referral link copied to clipboard!")
  }

  const shareReferralLink = () => {
    const referralLink = `https://atlanteascrown.com/signup?ref=${referralCode}`
    const message = customMessage || "Join me on Atlanteas Crown, the most advanced cryptocurrency platform!"

    if (navigator.share) {
      navigator.share({
        title: "Join Atlanteas Crown",
        text: message,
        url: referralLink,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `${message}\n\n${referralLink}`
      navigator.clipboard.writeText(shareText)
      toast.success("Share text copied to clipboard!")
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return Star
      case "Silver":
        return Award
      case "Gold":
        return Crown
      case "Platinum":
        return Crown
      case "Diamond":
        return Crown
      default:
        return Star
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "text-orange-600"
      case "Silver":
        return "text-gray-500"
      case "Gold":
        return "text-yellow-500"
      case "Platinum":
        return "text-purple-500"
      case "Diamond":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Referral Program</h1>
          <Badge className={`${getTierColor(referralStats.tier)} border-current`}>
            <Crown className="h-3 w-3 mr-1" />
            {referralStats.tier} Tier
          </Badge>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
              <div className="text-xs text-green-500">+3 this month</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.activeReferrals}</div>
              <div className="text-xs text-muted-foreground">
                {((referralStats.activeReferrals / referralStats.totalReferrals) * 100).toFixed(0)}% active rate
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.totalEarnings} ATC</div>
              <div className="text-xs text-green-500">+{referralStats.thisMonthEarnings} ATC this month</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Tier Progress</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.nextTierProgress}%</div>
              <Progress value={referralStats.nextTierProgress} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Referral Link */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input value={`https://atlanteascrown.com/signup?ref=${referralCode}`} readOnly className="flex-1" />
              <Button onClick={copyReferralLink} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Message (Optional)</label>
              <Input
                placeholder="Add a personal message to your referral..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={shareReferralLink} className="flex-1">
                <Share className="h-4 w-4 mr-2" />
                Share Link
              </Button>
              <Button variant="outline" className="flex-1">
                Generate QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Referral History */}
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {referralHistory.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        referral.status === "active" ? "bg-green-500/10" : "bg-gray-500/10"
                      }`}
                    >
                      <Users
                        className={`h-5 w-5 ${referral.status === "active" ? "text-green-500" : "text-gray-500"}`}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{referral.username}</div>
                      <div className="text-sm text-muted-foreground">
                        Joined {new Date(referral.joinDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs">
                        <Badge variant={referral.status === "active" ? "default" : "secondary"}>
                          Level {referral.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-500">+{referral.earnings} ATC</div>
                    <div className={`text-xs ${referral.status === "active" ? "text-green-500" : "text-gray-500"}`}>
                      {referral.status}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tier Benefits */}
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle>Tier Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tierBenefits.map((tier, index) => {
                const TierIcon = getTierIcon(tier.tier)
                const isCurrentTier = tier.tier === referralStats.tier

                return (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${
                      isCurrentTier ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <TierIcon className={`h-5 w-5 ${getTierColor(tier.tier)}`} />
                        <span className="font-semibold">{tier.tier}</span>
                        {isCurrentTier && <Badge className="bg-primary/10 text-primary">Current</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">{tier.referrals} referrals</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Commission: </span>
                        <span className="font-medium text-green-500">{tier.commission}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bonus: </span>
                        <span className="font-medium text-primary">{tier.bonus}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>How the Referral Program Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Share className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Share Your Link</h3>
                <p className="text-sm text-muted-foreground">Share your unique referral link with friends and family</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Friends Join</h3>
                <p className="text-sm text-muted-foreground">
                  When someone signs up using your link, they become your referral
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Earn Rewards</h3>
                <p className="text-sm text-muted-foreground">Earn commission on their trading fees and bonus rewards</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
