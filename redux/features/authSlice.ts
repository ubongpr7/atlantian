import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  isVerified: boolean
  twoFactorEnabled: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  accessToken: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  accessToken: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.accessToken = null
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
      localStorage.setItem("accessToken", action.payload)
    },
  },
})

export const { setAuth, setUser, logout, setLoading, setAccessToken } = authSlice.actions
export default authSlice.reducer
