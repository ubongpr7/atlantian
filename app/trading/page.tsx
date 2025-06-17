"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { setSelectedPair, addOrder } from "@/redux/features/tradingSlice"
import Select from "react-select"
import { toast } from "react-toastify"
import { ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react"

export default function TradingPage() {
  const dispatch = useAppDispatch()
  const { pairs, selectedPair, orders, orderBook } = useAppSelector((state) => state.trading)
  const { balances } = useAppSelector((state) => state.wallet)

  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")

  const handlePairSelect = (pair: any) => {
    const selectedTradingPair = pairs.find((p) => p.symbol === pair.value)
    if (selectedTradingPair) {
      dispatch(setSelectedPair(selectedTradingPair))
      setPrice(selectedTradingPair.price.toString())
    }
  }

  const handlePlaceOrder = () => {
    if (!selectedPair || !amount || !price) {
      toast.error("Please fill in all fields")
      return
    }

    const order = {
      id: Date.now().toString(),
      type: orderType,
      pair: selectedPair.symbol,
      amount: Number.parseFloat(amount),
      price: Number.parseFloat(price),
      total: Number.parseFloat(amount) * Number.parseFloat(price),
      status: "pending" as const,
      timestamp: new Date().toISOString(),
    }

    dispatch(addOrder(order))
    toast.success(`${orderType.toUpperCase()} order placed successfully`)
    setAmount("")
  }

  const pairOptions = pairs.map((pair) => ({
    value: pair.symbol,
    label: pair.symbol,
  }))

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Trading</h1>
          <Badge className="bg-green-500/10 text-green-500">Market Open</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Market Overview */}
          <div className="lg:col-span-3 space-y-6">
            {/* Pair Selector */}
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Select Trading Pair</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  options={pairOptions}
                  onChange={handlePairSelect}
                  placeholder="Select a trading pair..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#667eea",
                      primary25: "#667eea25",
                      neutral0: "hsl(var(--card))",
                      neutral80: "hsl(var(--foreground))",
                    },
                  })}
                />
              </CardContent>
            </Card>

            {/* Price Chart Placeholder */}
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>{selectedPair?.symbol || "Select a pair"} Price Chart</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {selectedPair ? "Chart will be displayed here" : "Select a trading pair to view chart"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Data */}
            {selectedPair && (
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Market Data - {selectedPair.symbol}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Current Price</Label>
                      <div className="text-2xl font-bold">${selectedPair.price.toLocaleString()}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">24h Change</Label>
                      <div
                        className={`text-xl font-semibold flex items-center ${
                          selectedPair.change24h >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {selectedPair.change24h >= 0 ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(selectedPair.change24h)}%
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">24h High</Label>
                      <div className="text-xl font-semibold">${selectedPair.high24h.toLocaleString()}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">24h Low</Label>
                      <div className="text-xl font-semibold">${selectedPair.low24h.toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            {/* Order Form */}
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Place Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={orderType} onValueChange={(value) => setOrderType(value as "buy" | "sell")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy" className="text-green-500">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="text-red-500">
                      Sell
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="buy" className="space-y-4">
                    <div>
                      <Label>Amount ({selectedPair?.baseAsset || "Token"})</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Price ({selectedPair?.quoteAsset || "USDT"})</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Total ({selectedPair?.quoteAsset || "USDT"})</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount && price ? (Number.parseFloat(amount) * Number.parseFloat(price)).toFixed(2) : ""}
                        readOnly
                      />
                    </div>
                    <Button
                      onClick={handlePlaceOrder}
                      className="w-full bg-green-500 hover:bg-green-600"
                      disabled={!selectedPair}
                    >
                      Place Buy Order
                    </Button>
                  </TabsContent>

                  <TabsContent value="sell" className="space-y-4">
                    <div>
                      <Label>Amount ({selectedPair?.baseAsset || "Token"})</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Price ({selectedPair?.quoteAsset || "USDT"})</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Total ({selectedPair?.quoteAsset || "USDT"})</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount && price ? (Number.parseFloat(amount) * Number.parseFloat(price)).toFixed(2) : ""}
                        readOnly
                      />
                    </div>
                    <Button
                      onClick={handlePlaceOrder}
                      className="w-full bg-red-500 hover:bg-red-600"
                      disabled={!selectedPair}
                    >
                      Place Sell Order
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Order Book */}
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Order Book</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-red-500">Asks (Sell Orders)</Label>
                  <div className="space-y-1 mt-2">
                    {orderBook.asks.map((ask, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-red-500">${ask.price}</span>
                        <span>{ask.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Label className="text-green-500">Bids (Buy Orders)</Label>
                  <div className="space-y-1 mt-2">
                    {orderBook.bids.map((bid, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-green-500">${bid.price}</span>
                        <span>{bid.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Balance */}
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Available Balance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {balances.slice(0, 4).map((balance, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{balance.symbol}</span>
                    <span>{balance.balance.toFixed(4)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Orders */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 10).map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Badge variant={order.type === "buy" ? "default" : "destructive"}>
                        {order.type.toUpperCase()}
                      </Badge>
                      <div>
                        <div className="font-medium">{order.pair}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.amount} @ ${order.price}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${order.total.toFixed(2)}</div>
                      <Badge
                        variant={
                          order.status === "filled"
                            ? "default"
                            : order.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No orders yet. Place your first order above.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
