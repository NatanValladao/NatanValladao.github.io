"use client"

import { useContext, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import type { Group } from "three"
import { StoryContext } from "@/context/story-context"
import { SceneOne } from "./scenes/scene-one"
import { SceneTwo } from "./scenes/scene-two"
import { SceneThree } from "./scenes/scene-three"
import { SceneFour } from "./scenes/scene-four"
import { SceneFive } from "./scenes/scene-five"

export function StoryScene() {
  const { currentScene } = useContext(StoryContext)
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <>
      <color attach="background" args={["#e6eef1"]} />
      <fog attach="fog" args={["#e6eef1", 5, 20]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <Environment preset="dawn" />

      <group ref={groupRef}>
        {currentScene === 0 && <SceneOne />}
        {currentScene === 1 && <SceneTwo />}
        {currentScene === 2 && <SceneThree />}
        {currentScene === 3 && <SceneFour />}
        {currentScene === 4 && <SceneFive />}
      </group>
    </>
  )
}

