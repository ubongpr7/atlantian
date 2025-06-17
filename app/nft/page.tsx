"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { buyNFT } from "@/redux/features/nftSlice"
import Select from "react-select"
import { toast } from "react-toastify"
import { ImageIcon, Heart, Share, Eye, Filter, Grid, List, Star, Crown, Zap } from "lucide-react"

export default function NFTPage() {
  const dispatch = useAppDispatch()
  const { nfts, userNFTs, collections } = useAppSelector((state) => state.nft)

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [sortBy, setSortBy] = useState("price_low")

  const handleBuyNFT = (nftId: string) => {
    dispatch(buyNFT(nftId))
    toast.success("NFT purchased successfully!")
  }

  const filteredNFTs = nfts.filter((nft) => {
    if (selectedCollection && nft.collection !== selectedCollection) return false
    if (nft.price < priceRange[0] || nft.price > priceRange[1]) return false
    return true
  })

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.price - b.price
      case "price_high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const collectionOptions = collections.map((collection) => ({
    value: collection,
    label: collection,
  }))

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-500"
      case "rare":
        return "text-blue-500"
      case "epic":
        return "text-purple-500"
      case "legendary":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return Crown
      case "epic":
        return Star
      case "rare":
        return Zap
      default:
        return Star
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">NFT Marketplace</h1>
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Collection</label>
                <Select
                  options={[{ value: "", label: "All Collections" }, ...collectionOptions]}
                  onChange={(option) => setSelectedCollection(option?.value || null)}
                  placeholder="Select collection..."
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
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  className="w-full p-2 border border-border rounded-md bg-background"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Min Price (ATC)</label>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseFloat(e.target.value) || 0, priceRange[1]])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Price (ATC)</label>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseFloat(e.target.value) || 100])}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="my-nfts">My NFTs ({userNFTs.length})</TabsTrigger>
            <TabsTrigger value="create">Create NFT</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedNFTs.map((nft) => {
                  const RarityIcon = getRarityIcon(nft.rarity)
                  return (
                    <Card key={nft.id} className="crypto-card hover:glow-effect transition-all group">
                      <div className="relative">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
                            <Heart className="h-4 w-4 text-white" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
                            <Share className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                        <Badge className={`absolute top-2 left-2 ${getRarityColor(nft.rarity)}`}>
                          <RarityIcon className="h-3 w-3 mr-1" />
                          {nft.rarity}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{nft.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{nft.description}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xs text-muted-foreground">Collection</div>
                              <div className="text-sm font-medium">{nft.collection}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-muted-foreground">Price</div>
                              <div className="text-lg font-bold text-primary">
                                {nft.price} {nft.currency}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              Creator: {nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {Math.floor(Math.random() * 1000)}
                            </span>
                          </div>
                          {nft.isListed && (
                            <Button onClick={() => handleBuyNFT(nft.id)} className="w-full mt-3">
                              Buy Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedNFTs.map((nft) => {
                  const RarityIcon = getRarityIcon(nft.rarity)
                  return (
                    <Card key={nft.id} className="crypto-card">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{nft.name}</h3>
                              <Badge className={getRarityColor(nft.rarity)}>
                                <RarityIcon className="h-3 w-3 mr-1" />
                                {nft.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{nft.description}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span>Collection: {nft.collection}</span>
                              <span>
                                Creator: {nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary mb-2">
                              {nft.price} {nft.currency}
                            </div>
                            {nft.isListed && <Button onClick={() => handleBuyNFT(nft.id)}>Buy Now</Button>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-nfts" className="space-y-6">
            {userNFTs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userNFTs.map((nft) => {
                  const RarityIcon = getRarityIcon(nft.rarity)
                  return (
                    <Card key={nft.id} className="crypto-card">
                      <div className="relative">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className={`absolute top-2 left-2 ${getRarityColor(nft.rarity)}`}>
                          <RarityIcon className="h-3 w-3 mr-1" />
                          {nft.rarity}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{nft.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{nft.description}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1">
                            List for Sale
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Transfer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="crypto-card">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Image className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No NFTs Yet</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    You don't own any NFTs yet. Browse the marketplace to find amazing digital collectibles.
                  </p>
                  <Button>Browse Marketplace</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle>Create New NFT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Drag and drop your image here, or click to browse</p>
                    <Button variant="outline" className="mt-4">
                      Choose File
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input placeholder="Enter NFT name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Collection</label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      {collections.map((collection) => (
                        <option key={collection} value={collection}>
                          {collection}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full p-2 border border-border rounded-md bg-background h-24"
                    placeholder="Describe your NFT..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (ATC)</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Royalty (%)</label>
                    <Input type="number" placeholder="10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rarity</label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option value="common">Common</option>
                      <option value="rare">Rare</option>
                      <option value="epic">Epic</option>
                      <option value="legendary">Legendary</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full">Create NFT</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
