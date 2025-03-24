"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text, Html } from "@react-three/drei"
import type { Group } from "three"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

export function SceneTwo() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <MotionConfig transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}>
      <group position={[0, 0, 0]}>
        <motion.group ref={groupRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 0, 0]}>
              {/* Floating code symbols */}
              <Text
                font="/fonts/GeistMono-Bold.ttf"
                fontSize={0.4}
                position={[-1.5, 0.5, -1]}
                color="#0a3847"
                anchorX="center"
                anchorY="middle"
              >
                {"</>"}
              </Text>
              <Text
                font="/fonts/GeistMono-Bold.ttf"
                fontSize={0.4}
                position={[1.5, -0.5, 1]}
                color="#0a3847"
                anchorX="center"
                anchorY="middle"
              >
                {"{}"}
              </Text>
              <Text
                font="/fonts/GeistMono-Bold.ttf"
                fontSize={0.4}
                position={[0, 1, 0]}
                color="#0a3847"
                anchorX="center"
                anchorY="middle"
              >
                {"()=>{}"}
              </Text>
              <Text
                font="/fonts/GeistMono-Bold.ttf"
                fontSize={0.4}
                position={[-1, -1, 0.5]}
                color="#0a3847"
                anchorX="center"
                anchorY="middle"
              >
                {"import"}
              </Text>
              <Text
                font="/fonts/GeistMono-Bold.ttf"
                fontSize={0.4}
                position={[1, 0, -0.5]}
                color="#0a3847"
                anchorX="center"
                anchorY="middle"
              >
                {"export"}
              </Text>
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
            Descobrindo o Código
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
                Minha jornada começou com a descoberta das linguagens de programação. Cada linha de código abria um novo
                mundo de possibilidades.
              </p>
              <p className="text-sm text-[#0a3847]/70">HTML, CSS, JavaScript, React, Node.js...</p>
            </div>
          </Html>
        </motion.group>
      </group>
    </MotionConfig>
  )
}

