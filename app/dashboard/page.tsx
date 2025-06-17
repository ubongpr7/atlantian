"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppSelector } from "@/redux/hooks"
import { TrendingUp, Wallet, Coins, Gift, Users, ArrowUpRight, ArrowDownRight, Crown, Star } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { balances, totalUsdValue, transactions } = useAppSelector((state) => state.wallet)
  const { pools, totalRewards } = useAppSelector((state) => state.staking)

  const portfolioChange = 5.2 // Mock 24h change
  const recentTransactions = transactions.slice(0, 5)

  const quickActions = [
    { name: "Buy Crypto", href: "/trading", icon: TrendingUp, color: "text-green-500" },
    { name: "Stake Tokens", href: "/staking", icon: Coins, color: "text-blue-500" },
    { name: "Claim Airdrops", href: "/airdrops", icon: Gift, color: "text-purple-500" },
    { name: "Refer Friends", href: "/referrals", icon: Users, color: "text-orange-500" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Here's what's happening with your portfolio today.</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Crown className="h-3 w-3 mr-1" />
            Premium Member
          </Badge>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalUsdValue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />+{portfolioChange}% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staking Rewards</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRewards.toFixed(2)} ATC</div>
              <div className="text-xs text-muted-foreground">Available to claim</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Stakes</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pools.length}</div>
              <div className="text-xs text-muted-foreground">Earning rewards</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referral Bonus</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125.50 ATC</div>
              <div className="text-xs text-muted-foreground">From 12 referrals</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-primary/5"
                  >
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                    <span className="text-sm">{action.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Breakdown */}
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle>Portfolio Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {balances.map((balance, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{balance.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-medium">{balance.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {balance.balance} {balance.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${balance.usdValue.toLocaleString()}</div>
                    <div
                      className={`text-sm flex items-center ${
                        balance.change24h >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {balance.change24h >= 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(balance.change24h)}%
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link href="/wallet">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === "receive" ? "bg-green-500/10" : "bg-red-500/10"
                      }`}
                    >
                      {transaction.type === "receive" ? (
                        <ArrowDownRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium capitalize">{transaction.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-medium ${transaction.type === "receive" ? "text-green-500" : "text-red-500"}`}
                    >
                      {transaction.type === "receive" ? "+" : "-"}
                      {transaction.amount} {transaction.symbol}
                    </div>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : transaction.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Staking Overview */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Staking Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pools.slice(0, 2).map((pool, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{pool.name}</div>
                    <Badge className="bg-green-500/10 text-green-500">{pool.apy}% APY</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        Staked: {pool.userStaked} {pool.symbol}
                      </span>
                      <span>
                        Rewards: {pool.rewards.toFixed(2)} {pool.symbol}
                      </span>
                    </div>
                    <Progress value={(pool.userStaked / pool.minStake) * 10} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/staking">
                <Button className="w-full">View All Staking Pools</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
