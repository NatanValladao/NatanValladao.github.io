"use client"

import { Suspense, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Loader } from "@/components/loader"
import { StoryScene } from "@/components/story-scene"
import { StoryNavigation } from "@/components/story-navigation"
import { StoryContext } from "@/context/story-context"
import { useProgress } from "@react-three/drei"

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const { progress } = useProgress()

  const scenes = [
    { id: 0, title: "Início", subtitle: "O começo da jornada" },
    { id: 1, title: "Descoberta", subtitle: "Explorando novas tecnologias" },
    { id: 2, title: "Desafios", subtitle: "Superando obstáculos" },
    { id: 3, title: "Criação", subtitle: "Construindo soluções" },
    { id: 4, title: "Futuro", subtitle: "O que está por vir" },
  ]

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [progress])

  const handleSceneChange = (sceneId: number) => {
    setCurrentScene(sceneId)
  }

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }

  return (
    <StoryContext.Provider value={{ currentScene, setCurrentScene, scenes, hasInteracted, setHasInteracted }}>
      <main
        className="h-screen w-screen overflow-hidden bg-[#e6eef1] text-[#0a3847] relative"
        onClick={handleInteraction}
      >
        {isLoading && <Loader />}

        <div className={`w-full h-full transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true }}>
            <Suspense fallback={null}>
              <StoryScene />
            </Suspense>
          </Canvas>

          <StoryNavigation onSceneChange={handleSceneChange} />
        </div>
      </main>
    </StoryContext.Provider>
  )
}

