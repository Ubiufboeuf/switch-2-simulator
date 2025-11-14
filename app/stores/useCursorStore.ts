import { create } from 'zustand'
import type { Cursor } from '~/types/cursorTypes'

type CursorStore = {
  cursor: Cursor | null
  setCursor: (cursor: Cursor) => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  cursor: null,
  setCursor: (cursor) => set({ cursor })
}))
