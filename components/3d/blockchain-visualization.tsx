"use client"

import { ClientOnly } from "./client-only-wrapper"

function BlockchainFallback() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export function BlockchainVisualization() {
  return (
    <ClientOnly fallback={<BlockchainFallback />}>
      <div className="w-full h-64 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-xl shadow-lg animate-float"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${3 + (i % 3)}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(102, 126, 234, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1={`${20 + (i % 4) * 25}%`}
              y1="30%"
              x2={`${20 + ((i + 1) % 4) * 25}%`}
              y2="70%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      </div>
    </ClientOnly>
  )
}
