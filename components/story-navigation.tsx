"use client"

import { useContext, useState, useEffect } from "react"
import { StoryContext } from "@/context/story-context"
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react"

type StoryNavigationProps = {
  onSceneChange: (sceneId: number) => void
}

export function StoryNavigation({ onSceneChange }: StoryNavigationProps) {
  const { currentScene, scenes, hasInteracted } = useContext(StoryContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUI, setShowUI] = useState(false)

  useEffect(() => {
    if (hasInteracted && !showUI) {
      setShowUI(true)
    }
  }, [hasInteracted, showUI])

  const handlePrevScene = () => {
    if (currentScene > 0) {
      onSceneChange(currentScene - 1)
    }
  }

  const handleNextScene = () => {
    if (currentScene < scenes.length - 1) {
      onSceneChange(currentScene + 1)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSceneSelect = (sceneId: number) => {
    onSceneChange(sceneId)
    setIsMenuOpen(false)
  }

  if (!showUI) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
        <p className="text-[#0a3847] text-xl font-light tracking-wider animate-pulse">Clique para começar a jornada</p>
      </div>
    )
  }

  return (
    <>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 transition-opacity duration-500">
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-full shadow-lg">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevScene}
              disabled={currentScene === 0}
              className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h2 className="text-lg font-medium">{scenes[currentScene].title}</h2>
              <p className="text-sm opacity-70">{scenes[currentScene].subtitle}</p>
            </div>

            <button
              onClick={handleNextScene}
              disabled={currentScene === scenes.length - 1}
              className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed top-8 right-8 z-40">
        <button
          onClick={toggleMenu}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors shadow-lg"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-medium mb-6 text-center">Capítulos da Jornada</h2>
            <div className="space-y-4">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => handleSceneSelect(scene.id)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    currentScene === scene.id ? "bg-[#0a3847] text-white" : "hover:bg-white/20"
                  }`}
                >
                  <h3 className="text-lg font-medium">{scene.title}</h3>
                  <p className="text-sm opacity-70">{scene.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

