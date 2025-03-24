"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text, Html } from "@react-three/drei"
import type { Group } from "three"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

export function SceneThree() {
  const mountainRef = useRef<Group>(null)

  useFrame((state) => {
    if (mountainRef.current) {
      mountainRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <MotionConfig transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}>
      <group position={[0, 0, 0]}>
        <motion.group ref={mountainRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            {/* Stylized mountains */}
            <group position={[0, -0.5, 0]}>
              <mesh position={[-1, 0, 0]}>
                <coneGeometry args={[0.7, 1.5, 4]} />
                <meshStandardMaterial color="#0a3847" />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <coneGeometry args={[1, 2, 4]} />
                <meshStandardMaterial color="#0a3847" />
              </mesh>
              <mesh position={[1, 0, 0]}>
                <coneGeometry args={[0.5, 1, 4]} />
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
            Superando Desafios
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
                Cada projeto trouxe novos desafios. Bugs complexos, prazos apertados e tecnologias desconhecidas se
                tornaram montanhas a serem escaladas.
              </p>
              <p className="text-sm text-[#0a3847]/70">A persistência foi minha melhor ferramenta</p>
            </div>
          </Html>
        </motion.group>
      </group>
    </MotionConfig>
  )
}

