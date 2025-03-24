"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text, Html } from "@react-three/drei"
import type { Group } from "three"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

export function SceneFive() {
  const sphereRef = useRef<Group>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <MotionConfig transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}>
      <group position={[0, 0, 0]}>
        <motion.group ref={sphereRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[0, 0, 0]}>
              {/* Earth representing global impact */}
              <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#0a3847" map={null} metalness={0.2} roughness={0.8} />
              </mesh>

              {/* Orbiting small spheres representing future opportunities */}
              <group rotation={[0, 0, Math.PI / 6]}>
                <mesh position={[0, 0, 2]}>
                  <sphereGeometry args={[0.1, 16, 16]} />
                  <meshStandardMaterial color="#0a3847" />
                </mesh>
              </group>

              <group rotation={[0, Math.PI / 2, Math.PI / 4]}>
                <mesh position={[0, 0, 1.8]}>
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshStandardMaterial color="#0a3847" />
                </mesh>
              </group>

              <group rotation={[Math.PI / 3, 0, 0]}>
                <mesh position={[0, 0, 1.5]}>
                  <sphereGeometry args={[0.12, 16, 16]} />
                  <meshStandardMaterial color="#0a3847" />
                </mesh>
              </group>
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
            O Futuro é Agora
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
                Olhando para o futuro, vejo infinitas possibilidades. Novas tecnologias, novos desafios e novas
                oportunidades para criar impacto global.
              </p>
              <p className="text-sm text-[#0a3847]/70">Vamos construir o futuro juntos</p>
            </div>
          </Html>
        </motion.group>
      </group>
    </MotionConfig>
  )
}

