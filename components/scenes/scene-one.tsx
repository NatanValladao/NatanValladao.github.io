"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text, useGLTF, Html } from "@react-three/drei"
import type { Group } from "three"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

export function SceneOne() {
  const duckRef = useRef<Group>(null)
  const { scene } = useGLTF("/assets/3d/duck.glb")

  useFrame((state) => {
    if (duckRef.current) {
      duckRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + 0.1
    }
  })

  return (
    <MotionConfig transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}>
      <group position={[0, 0, 0]}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <motion.group
            ref={duckRef}
            position={[0, 0, 0]}
            scale={1.5}
            initial={{ scale: 0, rotateY: Math.PI * 2 }}
            animate={{ scale: 1.5, rotateY: 0 }}
          >
            <primitive object={scene.clone()} />
          </motion.group>
        </Float>

        <motion.group position={[0, 2, 0]} initial={{ opacity: 0, y: -1 }} animate={{ opacity: 1, y: 2 }}>
          <Text
            font="/fonts/Geist-Bold.ttf"
            fontSize={0.5}
            position={[0, 0, 0]}
            color="#0a3847"
            anchorX="center"
            anchorY="middle"
          >
            Olá, eu sou um desenvolvedor
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
                Bem-vindo à minha jornada como desenvolvedor. Vamos explorar juntos minha história através do código e
                da criatividade.
              </p>
              <p className="text-sm text-[#0a3847]/70">Navegue usando as setas abaixo</p>
            </div>
          </Html>
        </motion.group>
      </group>
    </MotionConfig>
  )
}

