import { create } from 'zustand'

type CursorStore = {
  boxId: string | null
  setBoxId: (newBoxId: string) => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  boxId: 'game-0',
  setBoxId: (boxId) => set({ boxId })
}))
