"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, DollarSign, Activity, Download } from "lucide-react"

export default function AnalyticsPage() {
  const portfolioMetrics = {
    totalValue: 10276.5,
    dayChange: 5.2,
    weekChange: 12.8,
    monthChange: 28.5,
    yearChange: 145.2,
  }

  const tradingMetrics = {
    totalTrades: 156,
    winRate: 68.5,
    avgProfit: 2.3,
    totalVolume: 45250.75,
  }

  const topPerformers = [
    { symbol: "ATC", change: 15.2, value: 2501.0 },
    { symbol: "DOT", change: 8.7, value: 900.0 },
    { symbol: "ETH", change: 3.8, value: 5750.0 },
    { symbol: "BTC", change: -2.1, value: 1125.0 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <BarChart3 className="h-3 w-3 mr-1" />
              Real-time Data
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioMetrics.totalValue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />+{portfolioMetrics.dayChange}% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tradingMetrics.totalTrades}</div>
              <div className="text-xs text-muted-foreground">{tradingMetrics.winRate}% win rate</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trading Volume</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${tradingMetrics.totalVolume.toLocaleString()}</div>
              <div className="text-xs text-green-500">+15.2% this week</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Profit/Trade</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tradingMetrics.avgProfit}%</div>
              <div className="text-xs text-green-500">Above market avg</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="defi">DeFi</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Performance */}
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>24h Change</span>
                      <span className="text-green-500 font-semibold">+{portfolioMetrics.dayChange}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>7d Change</span>
                      <span className="text-green-500 font-semibold">+{portfolioMetrics.weekChange}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>30d Change</span>
                      <span className="text-green-500 font-semibold">+{portfolioMetrics.monthChange}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>1y Change</span>
                      <span className="text-green-500 font-semibold">+{portfolioMetrics.yearChange}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Top Performers (24h)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topPerformers.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{asset.symbol.slice(0, 2)}</span>
                        </div>
                        <span className="font-medium">{asset.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${asset.value.toLocaleString()}</div>
                        <div className={`text-sm ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {asset.change >= 0 ? "+" : ""}
                          {asset.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Chart Placeholder */}
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Portfolio Value Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Portfolio chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Win Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{tradingMetrics.winRate}%</div>
                </CardContent>
              </Card>
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tradingMetrics.totalTrades}</div>
                </CardContent>
              </Card>
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Avg Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{tradingMetrics.avgProfit}%</div>
                </CardContent>
              </Card>
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${tradingMetrics.totalVolume.toLocaleString()}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Trading Performance Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Trading performance chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staking" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Staked</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">600 ATC</div>
                  <div className="text-xs text-muted-foreground">Across 2 pools</div>
                </CardContent>
              </Card>
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">18.0 ATC</div>
                  <div className="text-xs text-green-500">+2.5 this week</div>
                </CardContent>
              </Card>
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Avg APY</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">10.6%</div>
                  <div className="text-xs text-muted-foreground">Weighted average</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="defi" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Supplied</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,425</div>
                </CardContent>
              </Card>
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Borrowed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,100</div>
                </CardContent>
              </Card>
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Net APY</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">+5.8%</div>
                </CardContent>
              </Card>
              <Card className="crypto-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Health Factor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">2.45</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
