import { create } from 'zustand'
import type { Point } from '~/env'
import { CursorModel } from '~/models/CursorModel'
import type { Animation, Direction, DirectionAsPoint } from '~/types/ui'
import { limitNumber } from '~/lib/utils'

type CursorStore = {
  cursor: CursorModel | null
  boxId: string | null
  boxElement: HTMLElement | null,
  direction: Point
  virtualPosition: Point
  lastVirtualPosition: Point
  cursorAnimation: Animation | null
  setCursorAnimation: (animation: Animation) => void
  initCursor: (initialPosition: Point) => void
  setBoxId: (newBoxId: string) => void
  setBoxElement: (newElement: HTMLElement) => void
  setDirection: (newDirection: Point) => void
  setVirtualPosition: (newVirtualPosition: Point) => void
  addVirtualPosition: (direction: Point) => void
  revertCursorMovement: () => void
  changeDirection: (action: 'press' | 'release', desiredDirection: Direction) => DirectionAsPoint
}

export const useCursorStore = create<CursorStore>((set, get) => ({
  cursor: null,
  boxId: 'box-game-1',
  boxElement: null,
  direction: { x: 0, y: 0 },
  virtualPosition: { x: 0, y: 1 },
  lastVirtualPosition: { x: 0, y: 0 },
  cursorAnimation: null,
  setCursorAnimation: (cursorAnimation) => set({ cursorAnimation }),
  initCursor: (initialPosition) => {
    if (get().cursor) return
    set({ cursor: new CursorModel(initialPosition) })
  },
  setBoxId: (boxId) => set({ boxId }),
  setBoxElement: (boxElement) => set({ boxElement }),
  setDirection : (direction) => set({ direction }),
  setVirtualPosition (virtualPosition) {
    set((state) => ({
      virtualPosition,
      lastVirtualPosition: state.virtualPosition
    }))
  },
  addVirtualPosition (direction) {
    set((state) => ({
      virtualPosition: {
        x: state.virtualPosition.x + direction.x,
        y: state.virtualPosition.y + direction.y
      },
      lastVirtualPosition: state.virtualPosition
    })
  )},
  revertCursorMovement () {
    set((state) => ({
      virtualPosition: state.lastVirtualPosition
    }))
  },
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
