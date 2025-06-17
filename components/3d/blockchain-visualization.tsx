"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { Box, Sphere } from "@react-three/drei"

function BlockchainNodes() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  const nodes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const radius = 3
    return {
      position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number],
      delay: i * 0.2,
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <group key={index} position={node.position}>
          <Sphere args={[0.1, 16, 16]}>
            <meshStandardMaterial color="#667eea" emissive="#667eea" emissiveIntensity={0.2} />
          </Sphere>
          {/* Connection lines */}
          {index < nodes.length - 1 && (
            <Box
              args={[0.02, 0.02, 3]}
              position={[
                (nodes[index + 1].position[0] - node.position[0]) / 2,
                0,
                (nodes[index + 1].position[2] - node.position[2]) / 2,
              ]}
              rotation={[
                0,
                Math.atan2(
                  nodes[index + 1].position[2] - node.position[2],
                  nodes[index + 1].position[0] - node.position[0],
                ),
                0,
              ]}
            >
              <meshStandardMaterial color="#667eea" opacity={0.6} transparent />
            </Box>
          )}
        </group>
      ))}
      {/* Center node */}
      <Sphere args={[0.2, 16, 16]}>
        <meshStandardMaterial color="#f093fb" emissive="#f093fb" emissiveIntensity={0.3} />
      </Sphere>
    </group>
  )
}

export function BlockchainVisualization() {
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 2, 8] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <BlockchainNodes />
      </Canvas>
    </div>
  )
}
