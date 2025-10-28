import { create } from 'zustand'
import type { Point } from '~/env'
import { CursorModel } from '~/models/CursorModel'
import type { Direction, DirectionAsPoint } from '~/types/ui'
import { limitNumber } from '~/lib/utils'

type CursorStore = {
  cursor: CursorModel | null
  boxId: string | null
  direction: Point
  virtualPosition: Point
  initCursor: (initialPosition: Point) => void
  setBoxId: (newBoxId: string) => void
  setDirection: (newDirection: Point) => void
  setVirtualPosition: (newVirtualPosition: Point) => void
  changeDirection: (action: 'press' | 'release', desiredDirection: Direction) => DirectionAsPoint
}

export const useCursorStore = create<CursorStore>((set, get) => ({
  cursor: null,
  boxId: 'box-game-1',
  direction: { x: 0, y: 0 },
  virtualPosition: { x: 0, y: 0 },
  initCursor: (initialPosition) => {
    if (get().cursor) return
    set({ cursor: new CursorModel(initialPosition) })
  },
  setBoxId: (boxId) => set({ boxId }),
  setDirection : (direction) => set({ direction }),
  setVirtualPosition: (virtualPosition) => set({ virtualPosition }),
  changeDirection (action, desiredDirection) {
    const { cursor } = get()
    if (!cursor) {
      return { x: 0, y: 0 }
    }

    const directions = cursor.controller.directions

    let verticalDirection = 0
    let horizontalDirection = 0
    
    directions[desiredDirection] = action === 'press'
    if (directions.top) verticalDirection--
    if (directions.left) horizontalDirection--
    if (directions.bottom) verticalDirection++
    if (directions.right) horizontalDirection++

    const x = limitNumber(horizontalDirection) as DirectionAsPoint['x']
    const y = limitNumber(verticalDirection) as DirectionAsPoint['y']

    const directionAsPoint: DirectionAsPoint = { x, y }
    cursor.controller.directionAsPoint = directionAsPoint
    return directionAsPoint
  }
}))
