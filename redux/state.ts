import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const getSystemTheme = () => {
  if (typeof window === "undefined") return true // Default to dark for crypto platform
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

const defaultState = {
  isSidebarCollapsed: false,
  isDarkMode: true, // Default to dark theme for crypto platform
  isSystemTheme: false,
}

const loadInitialState = () => {
  if (typeof window === "undefined") return defaultState

  try {
    const savedState = localStorage.getItem("atlanteasCrownSettings")
    if (savedState) {
      return JSON.parse(savedState)
    }
  } catch (error) {
    console.error("Error loading settings:", error)
  }

  return {
    ...defaultState,
    isDarkMode: getSystemTheme(),
  }
}

interface InitialStateTypes {
  isSidebarCollapsed: boolean
  isDarkMode: boolean
  isSystemTheme: boolean
}

const initialState: InitialStateTypes = loadInitialState()

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("atlanteasCrownSettings", JSON.stringify(state))
        } catch (error) {
          console.error("Error saving settings:", error)
        }
      }
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
      state.isSystemTheme = false
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("atlanteasCrownSettings", JSON.stringify(state))
        } catch (error) {
          console.error("Error saving settings:", error)
        }
      }
    },
    resetToSystemTheme: (state) => {
      state.isDarkMode = getSystemTheme()
      state.isSystemTheme = true
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("atlanteasCrownSettings", JSON.stringify(state))
        } catch (error) {
          console.error("Error saving settings:", error)
        }
      }
    },
  },
})

export const { setIsSidebarCollapsed, setIsDarkMode, resetToSystemTheme } = globalSlice.actions
export default globalSlice.reducer
