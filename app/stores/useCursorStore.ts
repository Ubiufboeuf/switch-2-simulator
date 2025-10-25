import { create } from 'zustand'
import type { Point } from '~/env'
import { CursorModel } from '~/focus/CursorModel'

export type DirectionValue = -1 | 0 | 1
export type Positions = Record<DirectionValue, number>

type CursorStore = {
  readonly cursor: CursorModel
  boxId: string | null
  direction: Point
  virtualPosition: Point
  setBoxId: (newBoxId: string) => void
  setDirection: (newDirection: Point) => void
  setVirtualPosition: (newVirtualPosition: Point) => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  cursor: new CursorModel(),
  boxId: 'game-0',
  direction: { x: 0, y: 0 },
  virtualPosition: { x: 0, y: 0 },
  setBoxId: (boxId) => set({ boxId }),
  setDirection : (direction) => set({ direction }),
  setVirtualPosition: (virtualPosition) => set({ virtualPosition })
}))
