import { create } from 'zustand'

type AudioStore = {
  audio: HTMLAudioElement | null
  isPlaying: boolean
  src?: string
  setAudio: (newAudio: HTMLAudioElement) => void
  play: (src?: string) => void
  pause: () => void
  setIsPlaying: (newState: boolean) => void
  setSource: (src: string) => void
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  audio: null,
  isPlaying: false,
  setAudio: (newAudio) => set({ audio: newAudio }),
  play (src) {
    const { audio, setSource } = get()

    if (src) {
      setSource(src)
    }

    if (!audio) return

    audio.play()
      .then(() => set({ isPlaying: true }))
      .catch((err) => {
        console.error('error iniciando el video:', err)
      })
  },
  pause () {
    get().audio?.pause()
    set({ isPlaying: false })
  },
  setIsPlaying: (newState) => set({ isPlaying: newState }),
  setSource: (src) => set({ src })
}))
