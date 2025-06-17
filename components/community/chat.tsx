"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Users, Hash } from "lucide-react"

interface Message {
  id: string
  user: string
  avatar?: string
  message: string
  timestamp: string
  type: "message" | "system"
}

interface ChatProps {
  channel?: string
}

export function Chat({ channel = "general" }: ChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "CryptoTrader",
      message: "ATC looking bullish today! 🚀",
      timestamp: "10:30 AM",
      type: "message",
    },
    {
      id: "2",
      user: "DeFiExplorer",
      message: "Just staked 1000 ATC in the new pool. APY is amazing!",
      timestamp: "10:32 AM",
      type: "message",
    },
    {
      id: "3",
      user: "System",
      message: "Welcome to #general! Please follow community guidelines.",
      timestamp: "10:35 AM",
      type: "system",
    },
    {
      id: "4",
      user: "NFTCollector",
      message: "Anyone seen the new Atlanteas Crown NFT drop? 👑",
      timestamp: "10:38 AM",
      type: "message",
    },
  ])

  const [onlineUsers] = useState([
    { username: "CryptoTrader", status: "online" },
    { username: "DeFiExplorer", status: "online" },
    { username: "NFTCollector", status: "online" },
    { username: "StakingPro", status: "away" },
    { username: "YieldFarmer", status: "online" },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      user: "You",
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "message",
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-96">
      {/* Chat Messages */}
      <div className="lg:col-span-3">
        <Card className="crypto-card h-full flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Hash className="h-4 w-4 mr-2" />
              {channel}
              <Badge variant="secondary" className="ml-2">
                {onlineUsers.filter((u) => u.status === "online").length} online
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 ${msg.type === "system" ? "justify-center" : ""}`}
                  >
                    {msg.type === "message" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">{msg.user.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`flex-1 ${msg.type === "system" ? "text-center" : ""}`}>
                      {msg.type === "message" && (
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        </div>
                      )}
                      <p className={`text-sm ${msg.type === "system" ? "text-muted-foreground italic" : ""}`}>
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  placeholder={`Message #${channel}`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Online Users */}
      <div className="lg:col-span-1">
        <Card className="crypto-card h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2" />
              Online ({onlineUsers.filter((u) => u.status === "online").length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-64">
              <div className="px-4 space-y-2">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-yellow-500"}`}
                    />
                    <span className="text-sm">{user.username}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
