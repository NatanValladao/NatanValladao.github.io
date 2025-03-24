"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text, Html } from "@react-three/drei"
import type { Group } from "three"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

export function SceneFour() {
  const cubesRef = useRef<Group>(null)

  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.children.forEach((child, i) => {
        child.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.3
        child.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3 + i) * 0.5
      })
    }
  })

  return (
    <MotionConfig transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}>
      <group position={[0, 0, 0]}>
        <motion.group ref={cubesRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 0, 0]}>
              {/* Building blocks representing projects */}
              <mesh position={[-1, 0.5, 0]}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial color="#0a3847" />
              </mesh>
              <mesh position={[0.8, -0.3, 0.5]}>
                <boxGeometry args={[0.6, 0.6, 0.6]} />
                <meshStandardMaterial color="#0a3847" />
              </mesh>
              <mesh position={[0, 0, -0.7]}>
                <boxGeometry args={[0.7, 0.7, 0.7]} />
                <meshStandardMaterial color="#0a3847" />
              </mesh>
              <mesh position={[-0.5, -0.5, 0.2]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#0a3847" />
              </mesh>
            </group>
          </Float>
        </motion.group>

        <motion.group position={[0, 2, 0]} initial={{ opacity: 0, y: -1 }} animate={{ opacity: 1, y: 2 }}>
          <Text
            font="/fonts/Geist-Bold.ttf"
            fontSize={0.5}
            position={[0, 0, 0]}
            color="#0a3847"
            anchorX="center"
            anchorY="middle"
          >
            Construindo Soluções
          </Text>
        </motion.group>

        <motion.group
          position={[0, -2, 0]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Html position={[0, 0, 0]} center transform>
            <div className="w-64 text-center p-4 bg-white/30 backdrop-blur-md rounded-xl shadow-lg">
              <p className="text-[#0a3847] mb-4">
                Com conhecimento e experiência, comecei a construir soluções que realmente faziam a diferença. Cada
                projeto se tornou uma oportunidade de inovação.
              </p>
              <p className="text-sm text-[#0a3847]/70">Websites, aplicativos, sistemas completos</p>
            </div>
          </Html>
        </motion.group>
      </group>
    </MotionConfig>
  )
}

