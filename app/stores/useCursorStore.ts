import { create } from 'zustand'
import type { Point } from '~/env'
import { CursorModel } from '~/models/CursorModel'

type CursorStore = {
  cursor: CursorModel
  boxId: string | null
  direction: Point
  virtualPosition: Point
  initCursor: (initialPosition: Point) => void
  setBoxId: (newBoxId: string) => void
  setDirection: (newDirection: Point) => void
  setVirtualPosition: (newVirtualPosition: Point) => void
}

export const useCursorStore = create<CursorStore>((set, get) => ({
  cursor: new CursorModel({ x: 0, y: 1 }),
  boxId: 'box-game-1',
  direction: { x: 0, y: 0 },
  virtualPosition: { x: 0, y: 0 },
  initCursor: (initialPosition) => {
    if (get().cursor) return
    set({ cursor: new CursorModel(initialPosition) })
  },
  setBoxId: (boxId) => set({ boxId }),
  setDirection : (direction) => set({ direction }),
  setVirtualPosition: (virtualPosition) => set({ virtualPosition })
}))
