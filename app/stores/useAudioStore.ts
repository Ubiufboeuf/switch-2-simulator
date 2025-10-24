import { create } from 'zustand'

type AudioStore = {
  paused: boolean
  src?: string
  play?: () => void
  pause?: () => void
  setSource: (src: string) => void
}

export const useAudioStore = create<AudioStore>((set) => ({
  paused: true,
  setSource: (src) => set({ src })
}))
