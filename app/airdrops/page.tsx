"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "react-toastify"
import { Gift, Calendar, Users, CheckCircle, Clock, Star, Trophy } from "lucide-react"

export default function AirdropsPage() {
  const [claimedAirdrops, setClaimedAirdrops] = useState<string[]>([])

  const activeAirdrops = [
    {
      id: "1",
      name: "Atlanteas Crown Genesis Airdrop",
      description: "Celebrate the launch of Atlanteas Crown with exclusive tokens for early adopters",
      reward: "500 ATC",
      requirements: ["Hold 100+ ATC", "Complete KYC", "Join Telegram"],
      endDate: "2024-02-15",
      participants: 12500,
      maxParticipants: 50000,
      status: "active",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Polkadot Ecosystem Bonus",
      description: "Reward for being part of the Polkadot ecosystem",
      reward: "250 ATC + 10 DOT",
      requirements: ["Stake DOT", "Use Polkadot wallet", "Complete tasks"],
      endDate: "2024-02-28",
      participants: 8750,
      maxParticipants: 25000,
      status: "active",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "NFT Holders Exclusive",
      description: "Special airdrop for Atlanteas Crown NFT holders",
      reward: "1000 ATC",
      requirements: ["Own Atlanteas Crown NFT", "Hold for 30+ days"],
      endDate: "2024-03-10",
      participants: 2100,
      maxParticipants: 5000,
      status: "active",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const completedAirdrops = [
    {
      id: "4",
      name: "Early Adopter Bonus",
      description: "Thank you for being an early supporter",
      reward: "200 ATC",
      claimedDate: "2024-01-15",
      status: "claimed",
    },
    {
      id: "5",
      name: "Community Milestone",
      description: "Celebrating 10,000 community members",
      reward: "150 ATC",
      claimedDate: "2024-01-08",
      status: "claimed",
    },
  ]

  const handleClaimAirdrop = (airdropId: string, reward: string) => {
    setClaimedAirdrops([...claimedAirdrops, airdropId])
    toast.success(`Successfully claimed ${reward}!`)
  }

  const checkEligibility = (requirements: string[]) => {
    // Mock eligibility check - in real app, this would check actual conditions
    return Math.random() > 0.3 // 70% chance of being eligible
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Airdrops</h1>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Gift className="h-3 w-3 mr-1" />
            Free Tokens
          </Badge>
        </div>

        {/* Airdrop Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claimed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">850 ATC</div>
              <div className="text-xs text-green-500">+350 ATC this month</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Airdrops</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAirdrops.length}</div>
              <div className="text-xs text-muted-foreground">Available to claim</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eligibility Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">85%</div>
              <div className="text-xs text-muted-foreground">Above average</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">#247</div>
              <div className="text-xs text-muted-foreground">Out of 50,000</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Airdrops */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Active Airdrops</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {activeAirdrops.map((airdrop) => {
              const isEligible = checkEligibility(airdrop.requirements)
              const isClaimed = claimedAirdrops.includes(airdrop.id)
              const progressPercentage = (airdrop.participants / airdrop.maxParticipants) * 100

              return (
                <div key={airdrop.id} className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={airdrop.image || "/placeholder.svg"}
                        alt={airdrop.name}
                        className="w-16 h-16 rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{airdrop.name}</h3>
                        <p className="text-muted-foreground mb-3">{airdrop.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Ends: {new Date(airdrop.endDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {airdrop.participants.toLocaleString()} participants
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500/10 text-green-500 text-lg px-3 py-1 mb-2">{airdrop.reward}</Badge>
                      <div className="text-sm text-muted-foreground">Reward</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {airdrop.participants.toLocaleString()} / {airdrop.maxParticipants.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Requirements:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {airdrop.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle
                            className={`h-4 w-4 ${isEligible ? "text-green-500" : "text-muted-foreground"}`}
                          />
                          <span className="text-sm">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {isEligible ? (
                        <Badge className="bg-green-500/10 text-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Eligible
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          Requirements not met
                        </Badge>
                      )}
                    </div>
                    <Button
                      onClick={() => handleClaimAirdrop(airdrop.id, airdrop.reward)}
                      disabled={!isEligible || isClaimed}
                      className={isClaimed ? "bg-green-500" : ""}
                    >
                      {isClaimed ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Claimed
                        </>
                      ) : isEligible ? (
                        <>
                          <Gift className="h-4 w-4 mr-2" />
                          Claim Airdrop
                        </>
                      ) : (
                        "Not Eligible"
                      )}
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Completed Airdrops */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Claimed Airdrops</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedAirdrops.map((airdrop) => (
              <div key={airdrop.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{airdrop.name}</h3>
                    <p className="text-sm text-muted-foreground">{airdrop.description}</p>
                    <div className="text-xs text-muted-foreground">
                      Claimed on {new Date(airdrop.claimedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500/10 text-green-500">{airdrop.reward}</Badge>
                  <div className="text-xs text-green-500 mt-1">Claimed</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Airdrop Tips */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>How to Maximize Your Airdrop Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Increase Eligibility</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Hold minimum required tokens</li>
                  <li>• Complete KYC verification</li>
                  <li>• Join official social channels</li>
                  <li>• Participate in community activities</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Stay Updated</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Follow official announcements</li>
                  <li>• Enable push notifications</li>
                  <li>• Check airdrop page regularly</li>
                  <li>• Join Telegram for instant updates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
