"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, X, Settings, TrendingUp, Gift, Users, Shield, Coins } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "trade",
      title: "Trade Executed",
      message: "Your buy order for 100 ATC has been filled at $2.45",
      timestamp: "2024-01-15T10:30:00Z",
      read: false,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      id: "2",
      type: "airdrop",
      title: "New Airdrop Available",
      message: "Atlanteas Crown Genesis Airdrop is now live. Claim your 500 ATC tokens!",
      timestamp: "2024-01-15T09:15:00Z",
      read: false,
      icon: Gift,
      color: "text-purple-500",
    },
    {
      id: "3",
      type: "staking",
      title: "Staking Rewards",
      message: "You've earned 2.5 ATC in staking rewards from the ATC pool",
      timestamp: "2024-01-15T08:00:00Z",
      read: true,
      icon: Coins,
      color: "text-blue-500",
    },
    {
      id: "4",
      type: "referral",
      title: "New Referral",
      message: "crypto_fan joined using your referral link. You earned 5 ATC bonus!",
      timestamp: "2024-01-14T16:45:00Z",
      read: true,
      icon: Users,
      color: "text-orange-500",
    },
    {
      id: "5",
      type: "security",
      title: "Security Alert",
      message: "New login detected from Chrome on Windows. If this wasn't you, secure your account.",
      timestamp: "2024-01-14T14:20:00Z",
      read: true,
      icon: Shield,
      color: "text-red-500",
    },
  ])

  const [settings, setSettings] = useState({
    trades: true,
    airdrops: true,
    staking: true,
    referrals: true,
    security: true,
    news: false,
    email: true,
    push: true,
    sms: false,
  })

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} unread</Badge>}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                const IconComponent = notification.icon
                return (
                  <Card
                    key={notification.id}
                    className={`crypto-card ${!notification.read ? "border-primary/50" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${notification.color}`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className={`font-semibold ${!notification.read ? "text-primary" : ""}`}>
                                {notification.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mt-1">{notification.message}</p>
                              <div className="text-xs text-muted-foreground mt-2">
                                {new Date(notification.timestamp).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <Card className="crypto-card">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Bell className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
                  <p className="text-muted-foreground text-center">
                    You're all caught up! New notifications will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter((notif) => !notif.read).length > 0 ? (
              notifications
                .filter((notif) => !notif.read)
                .map((notification) => {
                  const IconComponent = notification.icon
                  return (
                    <Card key={notification.id} className="crypto-card border-primary/50">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${notification.color}`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-primary">{notification.title}</h3>
                                <p className="text-muted-foreground text-sm mt-1">{notification.message}</p>
                                <div className="text-xs text-muted-foreground mt-2">
                                  {new Date(notification.timestamp).toLocaleString()}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
            ) : (
              <Card className="crypto-card">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Check className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
                  <p className="text-muted-foreground text-center">You have no unread notifications.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Trading Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Order fills, price alerts, and trading updates
                        </div>
                      </div>
                      <Switch
                        checked={settings.trades}
                        onCheckedChange={(checked) => updateSetting("trades", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Airdrop Alerts</div>
                        <div className="text-sm text-muted-foreground">New airdrops and claim reminders</div>
                      </div>
                      <Switch
                        checked={settings.airdrops}
                        onCheckedChange={(checked) => updateSetting("airdrops", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Staking Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Reward distributions and staking opportunities
                        </div>
                      </div>
                      <Switch
                        checked={settings.staking}
                        onCheckedChange={(checked) => updateSetting("staking", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Referral Notifications</div>
                        <div className="text-sm text-muted-foreground">New referrals and bonus earnings</div>
                      </div>
                      <Switch
                        checked={settings.referrals}
                        onCheckedChange={(checked) => updateSetting("referrals", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Security Alerts</div>
                        <div className="text-sm text-muted-foreground">Login attempts and security warnings</div>
                      </div>
                      <Switch
                        checked={settings.security}
                        onCheckedChange={(checked) => updateSetting("security", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">News & Updates</div>
                        <div className="text-sm text-muted-foreground">Platform updates and market news</div>
                      </div>
                      <Switch checked={settings.news} onCheckedChange={(checked) => updateSetting("news", checked)} />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4">Delivery Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                      </div>
                      <Switch checked={settings.email} onCheckedChange={(checked) => updateSetting("email", checked)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">Browser and mobile push notifications</div>
                      </div>
                      <Switch checked={settings.push} onCheckedChange={(checked) => updateSetting("push", checked)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-muted-foreground">Critical alerts via SMS</div>
                      </div>
                      <Switch checked={settings.sms} onCheckedChange={(checked) => updateSetting("sms", checked)} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
