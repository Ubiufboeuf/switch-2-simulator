import { create } from 'zustand'
import type { ConsoleState } from '~/types/consoleTypes'

type ConsoleStore = {
  isConsoleOn: boolean
  consoleState: ConsoleState
  userId: string
  setIsConsoleOn: (newState: boolean) => void
  setConsoleState: (newState: ConsoleState) => void
}

export const useConsoleStore = create<ConsoleStore>((set) => ({
  isConsoleOn: false,
  consoleState: 'off',
  userId: 'user-1',
  setIsConsoleOn: (newState) => set({ isConsoleOn: newState }),
  setConsoleState: (newState) => set({ consoleState: newState })
}))
