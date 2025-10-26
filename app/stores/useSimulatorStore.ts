import { create } from 'zustand'

type SimulatorStore = {
  camera: HTMLElement | null
  setCamera: (camera: HTMLElement) => void
}

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  camera: null,
  setCamera: (camera) => set({ camera })
}))
