import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface WalletBalance {
  symbol: string
  name: string
  balance: number
  usdValue: number
  change24h: number
}

interface Transaction {
  id: string
  type: "send" | "receive" | "trade" | "stake" | "unstake"
  amount: number
  symbol: string
  timestamp: string
  status: "pending" | "completed" | "failed"
  hash?: string
  from?: string
  to?: string
}

interface WalletState {
  isConnected: boolean
  address: string | null
  balances: WalletBalance[]
  transactions: Transaction[]
  totalUsdValue: number
  isLoading: boolean
}

const initialState: WalletState = {
  isConnected: false,
  address: null,
  balances: [
    { symbol: "ATC", name: "Atlanteas Crown", balance: 1250.5, usdValue: 2501.0, change24h: 5.2 },
    { symbol: "BTC", name: "Bitcoin", balance: 0.025, usdValue: 1125.0, change24h: -2.1 },
    { symbol: "ETH", name: "Ethereum", balance: 2.5, usdValue: 5750.0, change24h: 3.8 },
    { symbol: "DOT", name: "Polkadot", balance: 150.0, usdValue: 900.0, change24h: 1.5 },
  ],
  transactions: [
    {
      id: "1",
      type: "receive",
      amount: 100,
      symbol: "ATC",
      timestamp: "2024-01-15T10:30:00Z",
      status: "completed",
      hash: "0x1234...5678",
      from: "0xabcd...efgh",
    },
    {
      id: "2",
      type: "send",
      amount: 50,
      symbol: "ATC",
      timestamp: "2024-01-14T15:45:00Z",
      status: "completed",
      hash: "0x5678...9abc",
      to: "0xijkl...mnop",
    },
  ],
  totalUsdValue: 10276.0,
  isLoading: false,
}

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet: (state, action: PayloadAction<string>) => {
      state.isConnected = true
      state.address = action.payload
    },
    disconnectWallet: (state) => {
      state.isConnected = false
      state.address = null
    },
    updateBalances: (state, action: PayloadAction<WalletBalance[]>) => {
      state.balances = action.payload
      state.totalUsdValue = action.payload.reduce((total, balance) => total + balance.usdValue, 0)
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { connectWallet, disconnectWallet, updateBalances, addTransaction, setLoading } = walletSlice.actions
export default walletSlice.reducer
