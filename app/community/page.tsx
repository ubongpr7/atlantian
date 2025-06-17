"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chat } from "@/components/community/chat"
import { Users, MessageSquare, TrendingUp, Calendar, ExternalLink } from "lucide-react"

export default function CommunityPage() {
  const forumPosts = [
    {
      id: "1",
      title: "Best staking strategies for 2024",
      author: "CryptoExpert",
      replies: 23,
      views: 156,
      lastActivity: "2 hours ago",
      category: "Staking",
      pinned: true,
    },
    {
      id: "2",
      title: "DeFi yield farming opportunities",
      author: "YieldHunter",
      replies: 15,
      views: 89,
      lastActivity: "4 hours ago",
      category: "DeFi",
      pinned: false,
    },
    {
      id: "3",
      title: "NFT market analysis and trends",
      author: "NFTAnalyst",
      replies: 31,
      views: 203,
      lastActivity: "6 hours ago",
      category: "NFTs",
      pinned: false,
    },
    {
      id: "4",
      title: "Security best practices for crypto",
      author: "SecurityPro",
      replies: 42,
      views: 287,
      lastActivity: "1 day ago",
      category: "Security",
      pinned: true,
    },
  ]

  const events = [
    {
      id: "1",
      title: "AMA with Atlanteas Crown Team",
      date: "2024-01-20",
      time: "3:00 PM UTC",
      type: "AMA",
      participants: 245,
    },
    {
      id: "2",
      title: "DeFi Workshop: Advanced Strategies",
      date: "2024-01-22",
      time: "2:00 PM UTC",
      type: "Workshop",
      participants: 89,
    },
    {
      id: "3",
      title: "Community Trading Competition",
      date: "2024-01-25",
      time: "All Day",
      type: "Competition",
      participants: 156,
    },
  ]

  const socialLinks = [
    { name: "Discord", url: "https://discord.gg/atlanteascrown", members: "12.5K" },
    { name: "Telegram", url: "https://t.me/atlanteascrown", members: "8.2K" },
    { name: "Twitter", url: "https://twitter.com/atlanteascrown", members: "25.1K" },
    { name: "Reddit", url: "https://reddit.com/r/atlanteascrown", members: "5.8K" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Community</h1>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Users className="h-3 w-3 mr-1" />
            50K+ Members
          </Badge>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50,247</div>
              <div className="text-xs text-green-500">+1,234 this week</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online Now</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,156</div>
              <div className="text-xs text-muted-foreground">4.3% of members</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,892</div>
              <div className="text-xs text-green-500">+89 today</div>
            </CardContent>
          </Card>

          <Card className="crypto-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-muted-foreground">3 upcoming</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList>
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Community Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <Chat channel="general" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forum" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Forum Discussions</CardTitle>
                <Button>New Post</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {forumPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {post.pinned && (
                            <Badge variant="secondary" className="text-xs">
                              Pinned
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>by {post.author}</span>
                          <span>{post.replies} replies</span>
                          <span>{post.views} views</span>
                          <span>Last activity: {post.lastActivity}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-primary/10 text-primary">{event.type}</Badge>
                          <span className="text-sm text-muted-foreground">{event.participants} participants</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <Button size="sm">Join Event</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Join Our Community</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {socialLinks.map((link, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{link.name}</h3>
                          <p className="text-sm text-muted-foreground">{link.members} members</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
