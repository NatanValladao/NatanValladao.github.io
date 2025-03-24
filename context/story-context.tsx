"use client"

import { createContext, type Dispatch, type SetStateAction } from "react"

type Scene = {
  id: number
  title: string
  subtitle: string
}

type StoryContextType = {
  currentScene: number
  setCurrentScene: Dispatch<SetStateAction<number>>
  scenes: Scene[]
  hasInteracted: boolean
  setHasInteracted: Dispatch<SetStateAction<boolean>>
}

export const StoryContext = createContext<StoryContextType>({
  currentScene: 0,
  setCurrentScene: () => {},
  scenes: [],
  hasInteracted: false,
  setHasInteracted: () => {},
})

