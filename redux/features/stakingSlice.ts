import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface StakingPool {
  id: string
  name: string
  symbol: string
  apy: number
  totalStaked: number
  userStaked: number
  rewards: number
  lockPeriod: number
  minStake: number
  isActive: boolean
}

interface StakingState {
  pools: StakingPool[]
  totalRewards: number
  totalStaked: number
  isLoading: boolean
}

const initialState: StakingState = {
  pools: [
    {
      id: "1",
      name: "ATC Staking Pool",
      symbol: "ATC",
      apy: 12.5,
      totalStaked: 1000000,
      userStaked: 500,
      rewards: 15.2,
      lockPeriod: 30,
      minStake: 10,
      isActive: true,
    },
    {
      id: "2",
      name: "DOT Staking Pool",
      symbol: "DOT",
      apy: 8.7,
      totalStaked: 500000,
      userStaked: 100,
      rewards: 2.8,
      lockPeriod: 60,
      minStake: 5,
      isActive: true,
    },
  ],
  totalRewards: 18.0,
  totalStaked: 600,
  isLoading: false,
}

const stakingSlice = createSlice({
  name: "staking",
  initialState,
  reducers: {
    updatePools: (state, action: PayloadAction<StakingPool[]>) => {
      state.pools = action.payload
    },
    stakeTokens: (state, action: PayloadAction<{ poolId: string; amount: number }>) => {
      const pool = state.pools.find((p) => p.id === action.payload.poolId)
      if (pool) {
        pool.userStaked += action.payload.amount
        state.totalStaked += action.payload.amount
      }
    },
    claimRewards: (state, action: PayloadAction<{ poolId: string; amount: number }>) => {
      const pool = state.pools.find((p) => p.id === action.payload.poolId)
      if (pool) {
        pool.rewards = 0
        state.totalRewards -= action.payload.amount
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { updatePools, stakeTokens, claimRewards, setLoading } = stakingSlice.actions
export default stakingSlice.reducer
