"use client"

import { useProgress } from "@react-three/drei"
import { useEffect, useState } from "react"

export function Loader() {
  const { progress } = useProgress()
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setOpacity(0)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [progress])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#e6eef1] transition-opacity duration-1000"
      style={{ opacity }}
    >
      <div className="w-full max-w-md px-4 text-center">
        <div className="mb-8">
          <div className="relative h-1 w-full bg-[#0a3847]/20 overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-[#0a3847] transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="text-[#0a3847] text-lg font-light tracking-wider">CARREGANDO...</p>
      </div>
    </div>
  )
}

