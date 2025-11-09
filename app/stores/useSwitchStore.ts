import { create } from 'zustand'
import type { ConsoleState } from '~/types/console'

type SwitchStore = {
  isConsoleOn: boolean
  consoleState: ConsoleState
  setIsConsoleOn: (newState: boolean) => void
  setConsoleState: (newState: ConsoleState) => void
}

export const useSwitchStore = create<SwitchStore>((set) => ({
  isConsoleOn: false,
  consoleState: 'off',
  setIsConsoleOn: (newState) => set({ isConsoleOn: newState }),
  setConsoleState: (newState) => set({ consoleState: newState })
}))
