"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Play, Clock, Star, Search, TrendingUp, Shield, Coins } from "lucide-react"

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const courses = [
    {
      id: "1",
      title: "Cryptocurrency Fundamentals",
      description: "Learn the basics of blockchain technology and cryptocurrencies",
      duration: "2 hours",
      difficulty: "Beginner",
      progress: 75,
      lessons: 8,
      category: "Basics",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "DeFi Deep Dive",
      description: "Understanding decentralized finance protocols and yield farming",
      duration: "3 hours",
      difficulty: "Intermediate",
      progress: 30,
      lessons: 12,
      category: "DeFi",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "NFT Trading Strategies",
      description: "Master the art of NFT trading and collection building",
      duration: "1.5 hours",
      difficulty: "Intermediate",
      progress: 0,
      lessons: 6,
      category: "NFTs",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "Advanced Trading Techniques",
      description: "Professional trading strategies and risk management",
      duration: "4 hours",
      difficulty: "Advanced",
      progress: 0,
      lessons: 15,
      category: "Trading",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const articles = [
    {
      id: "1",
      title: "Understanding Polkadot Parachains",
      excerpt: "A comprehensive guide to Polkadot's parachain technology and its benefits",
      readTime: "5 min read",
      category: "Technology",
      date: "2024-01-15",
      featured: true,
    },
    {
      id: "2",
      title: "Staking Rewards Optimization",
      excerpt: "How to maximize your staking rewards across different protocols",
      readTime: "8 min read",
      category: "Staking",
      date: "2024-01-12",
      featured: false,
    },
    {
      id: "3",
      title: "Security Best Practices",
      excerpt: "Essential security measures every crypto user should know",
      readTime: "6 min read",
      category: "Security",
      date: "2024-01-10",
      featured: true,
    },
    {
      id: "4",
      title: "Market Analysis: Q1 2024",
      excerpt: "Comprehensive analysis of cryptocurrency market trends",
      readTime: "12 min read",
      category: "Analysis",
      date: "2024-01-08",
      featured: false,
    },
  ]

  const tutorials = [
    {
      id: "1",
      title: "How to Connect Your Wallet",
      description: "Step-by-step guide to connecting your crypto wallet",
      duration: "3 min",
      type: "video",
    },
    {
      id: "2",
      title: "Making Your First Trade",
      description: "Complete walkthrough of placing your first trade",
      duration: "5 min",
      type: "video",
    },
    {
      id: "3",
      title: "Setting Up Staking",
      description: "How to start earning rewards through staking",
      duration: "4 min",
      type: "video",
    },
    {
      id: "4",
      title: "Understanding DeFi Protocols",
      description: "Introduction to lending and borrowing in DeFi",
      duration: "7 min",
      type: "video",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-500"
      case "Intermediate":
        return "text-yellow-500"
      case "Advanced":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Learn</h1>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <BookOpen className="h-3 w-3 mr-1" />
            Educational Hub
          </Badge>
        </div>

        {/* Search */}
        <Card className="crypto-card">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, articles, and tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="glossary">Glossary</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="crypto-card hover:glow-effect transition-all">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-black/50 text-white">{course.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.description}</p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span>{course.lessons} lessons</span>
                        <span>{course.progress}% complete</span>
                      </div>

                      {course.progress > 0 && <Progress value={course.progress} className="h-2" />}

                      <Button className="w-full">{course.progress > 0 ? "Continue Learning" : "Start Course"}</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {articles.map((article) => (
                  <Card key={article.id} className="crypto-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{article.category}</Badge>
                            {article.featured && (
                              <Badge className="bg-primary/10 text-primary">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                          <p className="text-muted-foreground mb-3">{article.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{article.readTime}</span>
                            <span>{new Date(article.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">Read Article</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Popular Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["Technology", "Trading", "DeFi", "Security", "Analysis"].map((category) => (
                      <Button key={category} variant="ghost" className="w-full justify-start">
                        {category}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Latest News</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Polkadot Upgrade Announced</h4>
                      <p className="text-sm text-muted-foreground">New features coming to the network</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">DeFi TVL Reaches New High</h4>
                      <p className="text-sm text-muted-foreground">Total value locked surpasses $100B</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">NFT Market Update</h4>
                      <p className="text-sm text-muted-foreground">Trading volumes show strong growth</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="crypto-card hover:glow-effect transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Play className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{tutorial.title}</h3>
                        <p className="text-muted-foreground mb-3">{tutorial.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{tutorial.duration}</span>
                          </div>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Watch
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="glossary" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Cryptocurrency Glossary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold flex items-center">
                        <Coins className="h-4 w-4 mr-2" />
                        Staking
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        The process of holding cryptocurrency in a wallet to support network operations and earn
                        rewards.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        DeFi
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Decentralized Finance - financial services built on blockchain technology without traditional
                        intermediaries.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Smart Contract
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Self-executing contracts with terms directly written into code on the blockchain.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Parachain</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Independent blockchains that run in parallel within the Polkadot ecosystem.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Yield Farming</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        The practice of lending or staking cryptocurrency to earn rewards or interest.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Liquidity Pool</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        A collection of funds locked in a smart contract to facilitate decentralized trading.
                      </p>
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
