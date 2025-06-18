"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import { RoundedBox } from "@react-three/drei"

function FloatingCard({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <RoundedBox ref={meshRef} args={[1, 1.4, 0.1]} position={position} radius={0.1}>
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </RoundedBox>
  )
}

export function FloatingCards() {
  const cards = [
    { position: [-2, 0, 0] as [number, number, number], color: "#667eea" },
    { position: [0, 0.5, -1] as [number, number, number], color: "#f093fb" },
    { position: [2, -0.3, 0.5] as [number, number, number], color: "#4facfe" },
  ]

  return (
    <div className="w-full h-64 relative">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        {cards.map((card, index) => (
          <FloatingCard key={index} position={card.position} color={card.color} />
        ))}
      </Canvas>
    </div>
  )
}
