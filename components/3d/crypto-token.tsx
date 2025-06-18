"use client"

import { useRef, Suspense } from "react"
import dynamic from "next/dynamic"
import { ClientOnly } from "./client-only-wrapper"

// Dynamically import Three.js components to avoid SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false })
const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls), { ssr: false })
const Sphere = dynamic(() => import("@react-three/drei").then((mod) => mod.Sphere), { ssr: false })
const MeshDistortMaterial = dynamic(() => import("@react-three/drei").then((mod) => mod.MeshDistortMaterial), {
  ssr: false,
})

function AnimatedToken() {
  const meshRef = useRef<any>(null)

  // Simple rotation animation without useFrame to avoid SSR issues
  return (
    <Suspense fallback={null}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#667eea"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Suspense>
  )
}

function CryptoTokenFallback() {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-purple-600 animate-pulse flex items-center justify-center">
        <div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 animate-spin"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>
    </div>
  )
}

export function CryptoToken() {
  return (
    <ClientOnly fallback={<CryptoTokenFallback />}>
      <div className="w-full h-96 relative">
        <Suspense fallback={<CryptoTokenFallback />}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedToken />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </Suspense>
      </div>
    </ClientOnly>
  )
}
