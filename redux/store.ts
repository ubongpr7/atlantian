import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/authSlice"
import walletReducer from "./features/walletSlice"
import tradingReducer from "./features/tradingSlice"
import stakingReducer from "./features/stakingSlice"
import nftReducer from "./features/nftSlice"
import { apiSlice } from "./services/apiSlice"
import globalReducer from "./state"

const rootReducer = combineReducers({
  auth: authReducer,
  wallet: walletReducer,
  trading: tradingReducer,
  staking: stakingReducer,
  nft: nftReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  global: globalReducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
