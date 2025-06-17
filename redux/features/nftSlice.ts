import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface NFT {
  id: string
  name: string
  description: string
  image: string
  price: number
  currency: string
  creator: string
  owner: string
  collection: string
  rarity: "common" | "rare" | "epic" | "legendary"
  isListed: boolean
}

interface NFTState {
  nfts: NFT[]
  userNFTs: NFT[]
  collections: string[]
  isLoading: boolean
}

const initialState: NFTState = {
  nfts: [
    {
      id: "1",
      name: "Atlanteas Crown #001",
      description: "First edition crown from the royal collection",
      image: "/placeholder.svg?height=300&width=300",
      price: 5.5,
      currency: "ATC",
      creator: "0x1234...5678",
      owner: "0x5678...9abc",
      collection: "Royal Crowns",
      rarity: "legendary",
      isListed: true,
    },
    {
      id: "2",
      name: "Ocean Depths #042",
      description: "Deep sea creature from the Atlanteas collection",
      image: "/placeholder.svg?height=300&width=300",
      price: 2.3,
      currency: "ATC",
      creator: "0x9abc...def0",
      owner: "0xdef0...1234",
      collection: "Ocean Depths",
      rarity: "rare",
      isListed: true,
    },
  ],
  userNFTs: [],
  collections: ["Royal Crowns", "Ocean Depths", "Atlantean Warriors", "Mystic Artifacts"],
  isLoading: false,
}

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    updateNFTs: (state, action: PayloadAction<NFT[]>) => {
      state.nfts = action.payload
    },
    updateUserNFTs: (state, action: PayloadAction<NFT[]>) => {
      state.userNFTs = action.payload
    },
    buyNFT: (state, action: PayloadAction<string>) => {
      const nft = state.nfts.find((n) => n.id === action.payload)
      if (nft) {
        nft.isListed = false
        state.userNFTs.push(nft)
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { updateNFTs, updateUserNFTs, buyNFT, setLoading } = nftSlice.actions
export default nftSlice.reducer
