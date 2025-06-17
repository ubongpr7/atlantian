import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface TradingPair {
  symbol: string
  baseAsset: string
  quoteAsset: string
  price: number
  change24h: number
  volume24h: number
  high24h: number
  low24h: number
}

interface Order {
  id: string
  type: "buy" | "sell"
  pair: string
  amount: number
  price: number
  total: number
  status: "pending" | "filled" | "cancelled"
  timestamp: string
}

interface TradingState {
  pairs: TradingPair[]
  selectedPair: TradingPair | null
  orders: Order[]
  orderBook: {
    bids: Array<{ price: number; amount: number }>
    asks: Array<{ price: number; amount: number }>
  }
  isLoading: boolean
}

const initialState: TradingState = {
  pairs: [
    {
      symbol: "ATC/USDT",
      baseAsset: "ATC",
      quoteAsset: "USDT",
      price: 2.45,
      change24h: 5.2,
      volume24h: 1250000,
      high24h: 2.58,
      low24h: 2.31,
    },
    {
      symbol: "BTC/USDT",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      price: 45000,
      change24h: -2.1,
      volume24h: 850000000,
      high24h: 46200,
      low24h: 44500,
    },
    {
      symbol: "ETH/USDT",
      baseAsset: "ETH",
      quoteAsset: "USDT",
      price: 2300,
      change24h: 3.8,
      volume24h: 420000000,
      high24h: 2380,
      low24h: 2210,
    },
    {
      symbol: "DOT/USDT",
      baseAsset: "DOT",
      quoteAsset: "USDT",
      price: 6.0,
      change24h: 1.5,
      volume24h: 15000000,
      high24h: 6.15,
      low24h: 5.85,
    },
  ],
  selectedPair: null,
  orders: [],
  orderBook: {
    bids: [
      { price: 2.44, amount: 1500 },
      { price: 2.43, amount: 2200 },
      { price: 2.42, amount: 1800 },
    ],
    asks: [
      { price: 2.46, amount: 1200 },
      { price: 2.47, amount: 1900 },
      { price: 2.48, amount: 1600 },
    ],
  },
  isLoading: false,
}

const tradingSlice = createSlice({
  name: "trading",
  initialState,
  reducers: {
    setSelectedPair: (state, action: PayloadAction<TradingPair>) => {
      state.selectedPair = action.payload
    },
    updatePairs: (state, action: PayloadAction<TradingPair[]>) => {
      state.pairs = action.payload
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload)
    },
    updateOrderBook: (state, action: PayloadAction<typeof initialState.orderBook>) => {
      state.orderBook = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setSelectedPair, updatePairs, addOrder, updateOrderBook, setLoading } = tradingSlice.actions
export default tradingSlice.reducer
