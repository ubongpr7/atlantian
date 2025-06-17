"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { stakeTokens, claimRewards } from "@/redux/features/stakingSlice"
import { toast } from "react-toastify"
import { Coins, TrendingUp, Clock, Gift, Lock, Unlock, Calculator } from "lucide-react"

export default function StakingPage() {
  const dispatch = useAppDispatch()
  const { pools, totalRewards, totalStaked } = useAppSelector((state) => state.staking)
  const { balances } = useAppSelector((state) => state.wallet)

  const [stakeAmount, setStakeAmount] = useState("")
  const [selectedPool, setSelectedPool] = useState<string | null>(null)

  const handleStake = (poolId: string) => {
    if (!stakeAmount) {
      toast.error("Please enter an amount to stake")
      return
    }

    const amount = Number.parseFloat(stakeAmount)
    const pool = pools.find((p) => p.id === poolId)

    if (!pool) return

    if (amount < pool.minStake) {
      toast.error(`Minimum stake amount is ${pool.minStake} ${pool.symbol}`)
      return
    }

    dispatch(stakeTokens({ poolId, amount }))
    toast.success(`Successfully staked ${amount} ${pool.symbol}`)
    setStakeAmount("")
    setSelectedPool(null)
  }

  const handleClaimRewards = (poolId: string) => {
    const pool = pools.find((p) => p.id === poolId)
    if (!pool || pool.rewards === 0) return

    dispatch(claimRewards({ poolId, amount: pool.rewards }))
    toast.success(`Claimed ${pool.rewards.toFixed(2)} ${pool.symbol} rewards`)
  }

  const calculateRewards = (amount: number, apy: number) => {
    return ((amount * apy) / 100 / 365).toFixed(4)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Staking</h1>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Coins className="h-3 w-3 mr-1" />
            Earn Rewards
          </Badge>
        </div>

        {/* Staking Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStaked} ATC</div>
              <div className="text-xs text-muted-foreground">
                Across {pools.filter((p) => p.userStaked > 0).length} pools
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{totalRewards.toFixed(2)} ATC</div>
              <div className="text-xs text-muted-foreground">Available to claim</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average APY</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {(pools.reduce((acc, pool) => acc + pool.apy, 0) / pools.length).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Weighted average</div>
            </CardContent>
          </Card>
        </div>

        {/* Staking Pools */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Available Staking Pools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {pools.map((pool) => (
              <div key={pool.id} className="border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{pool.symbol}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{pool.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {pool.lockPeriod} days
                        </span>
                        <span className="flex items-center">
                          <Coins className="h-3 w-3 mr-1" />
                          Min: {pool.minStake} {pool.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500/10 text-green-500 text-lg px-3 py-1">{pool.apy}% APY</Badge>
                    {pool.isActive ? (
                      <div className="text-xs text-green-500 mt-1">Active</div>
                    ) : (
                      <div className="text-xs text-red-500 mt-1">Inactive</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Total Staked</Label>
                    <div className="text-lg font-semibold">
                      {pool.totalStaked.toLocaleString()} {pool.symbol}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Your Stake</Label>
                    <div className="text-lg font-semibold">
                      {pool.userStaked} {pool.symbol}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Pending Rewards</Label>
                    <div className="text-lg font-semibold text-green-500">
                      {pool.rewards.toFixed(4)} {pool.symbol}
                    </div>
                  </div>
                </div>

                {pool.userStaked > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Staking Progress</span>
                      <span>{((pool.userStaked / pool.totalStaked) * 100).toFixed(2)}%</span>
                    </div>
                    <Progress value={(pool.userStaked / pool.totalStaked) * 100} className="h-2" />
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedPool(pool.id)} disabled={!pool.isActive}>
                        <Lock className="h-4 w-4 mr-2" />
                        Stake
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Stake {pool.symbol}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <Label>APY</Label>
                            <div className="font-semibold text-green-500">{pool.apy}%</div>
                          </div>
                          <div>
                            <Label>Lock Period</Label>
                            <div className="font-semibold">{pool.lockPeriod} days</div>
                          </div>
                          <div>
                            <Label>Min Stake</Label>
                            <div className="font-semibold">
                              {pool.minStake} {pool.symbol}
                            </div>
                          </div>
                          <div>
                            <Label>Daily Rewards</Label>
                            <div className="font-semibold text-green-500">
                              {stakeAmount ? calculateRewards(Number.parseFloat(stakeAmount), pool.apy) : "0"}{" "}
                              {pool.symbol}
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label>Amount to Stake</Label>
                          <Input
                            type="number"
                            placeholder={`Min ${pool.minStake} ${pool.symbol}`}
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                          />
                        </div>
                        <Button onClick={() => handleStake(pool.id)} className="w-full" disabled={!stakeAmount}>
                          Stake {stakeAmount || "0"} {pool.symbol}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {pool.userStaked > 0 && (
                    <Button variant="outline">
                      <Unlock className="h-4 w-4 mr-2" />
                      Unstake
                    </Button>
                  )}

                  {pool.rewards > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => handleClaimRewards(pool.id)}
                      className="text-green-500 border-green-500 hover:bg-green-500/10"
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      Claim Rewards
                    </Button>
                  )}

                  <Button variant="ghost" size="sm">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculator
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Staking Calculator */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Staking Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Amount</Label>
                <Input type="number" placeholder="1000" />
              </div>
              <div>
                <Label>APY (%)</Label>
                <Input type="number" placeholder="12.5" />
              </div>
              <div>
                <Label>Period (days)</Label>
                <Input type="number" placeholder="365" />
              </div>
              <div>
                <Label>Estimated Rewards</Label>
                <div className="h-10 flex items-center text-lg font-semibold text-green-500">125.0 ATC</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
