"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { connectWallet, addTransaction } from "@/redux/features/walletSlice"
import { toast } from "react-toastify"
import {
  Wallet,
  Send,
  Download,
  Copy,
  QrCode,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  RefreshCw,
  Plus,
} from "lucide-react"

export default function WalletPage() {
  const dispatch = useAppDispatch()
  const { isConnected, address, balances, transactions, totalUsdValue } = useAppSelector((state) => state.wallet)

  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [selectedToken, setSelectedToken] = useState("ATC")

  const handleSendTransaction = () => {
    if (!sendAmount || !sendAddress) {
      toast.error("Please fill in all fields")
      return
    }

    const transaction = {
      id: Date.now().toString(),
      type: "send" as const,
      amount: Number.parseFloat(sendAmount),
      symbol: selectedToken,
      timestamp: new Date().toISOString(),
      status: "pending" as const,
      to: sendAddress,
      hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
    }

    dispatch(addTransaction(transaction))
    toast.success("Transaction sent successfully")
    setSendAmount("")
    setSendAddress("")
  }

  const handleConnectWallet = () => {
    const mockAddress = `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`
    dispatch(connectWallet(mockAddress))
    toast.success("Wallet connected successfully")
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success("Address copied to clipboard")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Wallet</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            {!isConnected && (
              <Button onClick={handleConnectWallet}>
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>

        {isConnected ? (
          <>
            {/* Wallet Overview */}
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Wallet Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">${totalUsdValue.toLocaleString()}</div>
                    <div className="text-muted-foreground">Total Portfolio Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold mb-2">{address}</div>
                    <div className="flex items-center justify-center space-x-2">
                      <Button variant="outline" size="sm" onClick={copyAddress}>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <QrCode className="h-3 w-3 mr-1" />
                        QR Code
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-green-500 mb-2">+5.2%</div>
                    <div className="text-muted-foreground">24h Change</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="crypto-card cursor-pointer hover:glow-effect transition-all">
                    <CardContent className="flex items-center justify-center p-6">
                      <Send className="h-8 w-8 text-primary mr-3" />
                      <span className="text-lg font-semibold">Send</span>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Cryptocurrency</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Token</Label>
                      <select
                        className="w-full p-2 border border-border rounded-md bg-background"
                        value={selectedToken}
                        onChange={(e) => setSelectedToken(e.target.value)}
                      >
                        {balances.map((balance) => (
                          <option key={balance.symbol} value={balance.symbol}>
                            {balance.name} ({balance.symbol})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Recipient Address</Label>
                      <Input placeholder="0x..." value={sendAddress} onChange={(e) => setSendAddress(e.target.value)} />
                    </div>
                    <div>
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleSendTransaction} className="w-full">
                      Send Transaction
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Card className="crypto-card cursor-pointer hover:glow-effect transition-all">
                <CardContent className="flex items-center justify-center p-6">
                  <Download className="h-8 w-8 text-primary mr-3" />
                  <span className="text-lg font-semibold">Receive</span>
                </CardContent>
              </Card>

              <Card className="crypto-card cursor-pointer hover:glow-effect transition-all">
                <CardContent className="flex items-center justify-center p-6">
                  <Plus className="h-8 w-8 text-primary mr-3" />
                  <span className="text-lg font-semibold">Buy Crypto</span>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Token Balances */}
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Token Balances</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {balances.map((balance, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">{balance.symbol.slice(0, 2)}</span>
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

              {/* Transaction History */}
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "receive" ? "bg-green-500/10" : "bg-red-500/10"
                          }`}
                        >
                          {transaction.type === "receive" ? (
                            <ArrowDownRight className="h-5 w-5 text-green-500" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 text-red-500" />
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
                          className={`font-medium ${
                            transaction.type === "receive" ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {transaction.type === "receive" ? "+" : "-"}
                          {transaction.amount} {transaction.symbol}
                        </div>
                        <div className="flex items-center space-x-2">
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
                          {transaction.hash && (
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <Card className="crypto-card">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Wallet className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                Connect your wallet to view your balances, send transactions, and manage your cryptocurrency portfolio.
              </p>
              <Button onClick={handleConnectWallet} size="lg">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
