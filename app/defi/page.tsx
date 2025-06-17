"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "react-toastify"
import { TrendingUp, DollarSign, Percent, ArrowRightLeft, Coins, PiggyBank, AlertTriangle } from "lucide-react"

export default function DeFiPage() {
  const [lendAmount, setLendAmount] = useState("")
  const [borrowAmount, setBorrowAmount] = useState("")
  const [selectedLendToken, setSelectedLendToken] = useState("ATC")
  const [selectedBorrowToken, setSelectedBorrowToken] = useState("USDT")

  const lendingPools = [
    { symbol: "ATC", name: "Atlanteas Crown", apy: 8.5, totalSupplied: 1250000, available: 850000, userSupplied: 500 },
    { symbol: "USDT", name: "Tether USD", apy: 6.2, totalSupplied: 2500000, available: 1800000, userSupplied: 1200 },
    { symbol: "DOT", name: "Polkadot", apy: 7.8, totalSupplied: 450000, available: 320000, userSupplied: 150 },
    { symbol: "BTC", name: "Bitcoin", apy: 4.5, totalSupplied: 125, available: 85, userSupplied: 0.025 },
  ]

  const borrowingPools = [
    {
      symbol: "ATC",
      name: "Atlanteas Crown",
      apy: 12.5,
      totalBorrowed: 850000,
      available: 400000,
      userBorrowed: 200,
      collateralRatio: 150,
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      apy: 9.8,
      totalBorrowed: 1800000,
      available: 700000,
      userBorrowed: 800,
      collateralRatio: 120,
    },
    {
      symbol: "DOT",
      name: "Polkadot",
      apy: 11.2,
      totalBorrowed: 320000,
      available: 130000,
      userBorrowed: 50,
      collateralRatio: 140,
    },
  ]

  const yieldFarms = [
    { pair: "ATC/USDT", apy: 45.2, tvl: 2500000, userStaked: 1500, rewards: 25.8 },
    { pair: "DOT/ATC", apy: 38.7, tvl: 1200000, userStaked: 800, rewards: 12.4 },
    { pair: "BTC/USDT", apy: 28.5, tvl: 5500000, userStaked: 0, rewards: 0 },
  ]

  const handleLend = () => {
    if (!lendAmount) {
      toast.error("Please enter an amount to lend")
      return
    }
    toast.success(`Successfully lent ${lendAmount} ${selectedLendToken}`)
    setLendAmount("")
  }

  const handleBorrow = () => {
    if (!borrowAmount) {
      toast.error("Please enter an amount to borrow")
      return
    }
    toast.success(`Successfully borrowed ${borrowAmount} ${selectedBorrowToken}`)
    setBorrowAmount("")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">DeFi</h1>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <TrendingUp className="h-3 w-3 mr-1" />
            Decentralized Finance
          </Badge>
        </div>

        {/* DeFi Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Supplied</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,425</div>
              <div className="text-xs text-green-500">+12.5% this month</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,100</div>
              <div className="text-xs text-muted-foreground">61% of limit</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net APY</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+5.8%</div>
              <div className="text-xs text-muted-foreground">Earning - Borrowing</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Factor</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">2.45</div>
              <div className="text-xs text-green-500">Safe</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="lending">Lending</TabsTrigger>
            <TabsTrigger value="borrowing">Borrowing</TabsTrigger>
            <TabsTrigger value="yield-farming">Yield Farming</TabsTrigger>
            <TabsTrigger value="swap">Swap</TabsTrigger>
          </TabsList>

          <TabsContent value="lending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lending Form */}
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Supply Assets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Asset</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={selectedLendToken}
                      onChange={(e) => setSelectedLendToken(e.target.value)}
                    >
                      {lendingPools.map((pool) => (
                        <option key={pool.symbol} value={pool.symbol}>
                          {pool.name} ({pool.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={lendAmount}
                      onChange={(e) => setLendAmount(e.target.value)}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current APY: {lendingPools.find((p) => p.symbol === selectedLendToken)?.apy}%
                  </div>
                  <Button onClick={handleLend} className="w-full">
                    Supply {selectedLendToken}
                  </Button>
                </CardContent>
              </Card>

              {/* Lending Pools */}
              <div className="lg:col-span-2">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Lending Markets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {lendingPools.map((pool, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-bold text-primary">{pool.symbol.slice(0, 2)}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{pool.name}</h3>
                              <div className="text-sm text-muted-foreground">
                                Supply APY: <span className="text-green-500">{pool.apy}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {pool.userSupplied} {pool.symbol}
                            </div>
                            <div className="text-sm text-muted-foreground">Supplied</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Total Supplied</div>
                            <div className="font-medium">
                              {pool.totalSupplied.toLocaleString()} {pool.symbol}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Available</div>
                            <div className="font-medium">
                              {pool.available.toLocaleString()} {pool.symbol}
                            </div>
                          </div>
                        </div>
                        <Progress value={(pool.userSupplied / pool.totalSupplied) * 100} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="borrowing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Borrowing Form */}
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Borrow Assets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Asset</Label>
                    <select
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={selectedBorrowToken}
                      onChange={(e) => setSelectedBorrowToken(e.target.value)}
                    >
                      {borrowingPools.map((pool) => (
                        <option key={pool.symbol} value={pool.symbol}>
                          {pool.name} ({pool.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={borrowAmount}
                      onChange={(e) => setBorrowAmount(e.target.value)}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Borrow APY: {borrowingPools.find((p) => p.symbol === selectedBorrowToken)?.apy}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Collateral Ratio: {borrowingPools.find((p) => p.symbol === selectedBorrowToken)?.collateralRatio}%
                  </div>
                  <Button onClick={handleBorrow} className="w-full">
                    Borrow {selectedBorrowToken}
                  </Button>
                </CardContent>
              </Card>

              {/* Borrowing Pools */}
              <div className="lg:col-span-2">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Borrowing Markets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {borrowingPools.map((pool, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-bold text-primary">{pool.symbol.slice(0, 2)}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{pool.name}</h3>
                              <div className="text-sm text-muted-foreground">
                                Borrow APY: <span className="text-red-500">{pool.apy}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {pool.userBorrowed} {pool.symbol}
                            </div>
                            <div className="text-sm text-muted-foreground">Borrowed</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Total Borrowed</div>
                            <div className="font-medium">
                              {pool.totalBorrowed.toLocaleString()} {pool.symbol}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Available</div>
                            <div className="font-medium">
                              {pool.available.toLocaleString()} {pool.symbol}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Collateral Ratio</div>
                            <div className="font-medium">{pool.collateralRatio}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="yield-farming" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Yield Farming Pools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {yieldFarms.map((farm, index) => (
                  <div key={index} className="border border-border rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Coins className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{farm.pair}</h3>
                          <div className="text-sm text-muted-foreground">Liquidity Pool</div>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 text-lg px-3 py-1">{farm.apy}% APY</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-muted-foreground">TVL</Label>
                        <div className="text-lg font-semibold">${farm.tvl.toLocaleString()}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Your Stake</Label>
                        <div className="text-lg font-semibold">${farm.userStaked.toLocaleString()}</div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Pending Rewards</Label>
                        <div className="text-lg font-semibold text-green-500">{farm.rewards.toFixed(2)} ATC</div>
                      </div>
                      <div className="flex items-end space-x-2">
                        <Button variant="outline" className="flex-1">
                          Add Liquidity
                        </Button>
                        {farm.rewards > 0 && <Button className="flex-1">Harvest</Button>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="swap" className="space-y-6">
            <div className="max-w-md mx-auto">
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ArrowRightLeft className="h-5 w-5 mr-2" />
                    Swap Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>From</Label>
                    <div className="flex space-x-2">
                      <Input type="number" placeholder="0.00" className="flex-1" />
                      <select className="w-24 p-2 border border-border rounded-md bg-background">
                        <option value="ATC">ATC</option>
                        <option value="USDT">USDT</option>
                        <option value="DOT">DOT</option>
                        <option value="BTC">BTC</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <ArrowRightLeft className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <Label>To</Label>
                    <div className="flex space-x-2">
                      <Input type="number" placeholder="0.00" className="flex-1" readOnly />
                      <select className="w-24 p-2 border border-border rounded-md bg-background">
                        <option value="USDT">USDT</option>
                        <option value="ATC">ATC</option>
                        <option value="DOT">DOT</option>
                        <option value="BTC">BTC</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Exchange Rate</span>
                      <span>1 ATC = 2.45 USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price Impact</span>
                      <span className="text-green-500">{"<"}0.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee</span>
                      <span>0.3%</span>
                    </div>
                  </div>

                  <Button className="w-full">Swap Tokens</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
