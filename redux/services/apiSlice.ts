import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BaseQueryFn, FetchArgs as OriginalFetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"

interface FetchArgs extends OriginalFetchArgs {
  meta?: {
    isFileUpload?: boolean
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: "/api", // Mock API endpoint
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    headers.set("Content-Type", "application/json")
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // For now, return mock data since backend isn't ready
  const argsObj = typeof args === "string" ? { url: args } : args

  // Mock successful responses for development
  return {
    data: {
      success: true,
      message: "Mock response - backend not implemented yet",
    },
  }
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})
