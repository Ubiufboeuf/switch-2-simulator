import { create } from 'zustand'
import type { Cursor } from '~/types/cursorTypes'

const cursor: Cursor = {
  controller: {
    directions: {
      up: false,
      left: false,
      down: false,
      right: false
    },
    directionAsPoint: { x: 0, y: 0 },
    keyboard: [
      { key: 'w', direction: 'up' },
      { key: 'a', direction: 'left' },
      { key: 's', direction: 'down' },
      { key: 'd', direction: 'right' }
    ]
  }  
}

type CursorStore = {
  cursor: Cursor
}

export const useCursorStore = create<CursorStore>((set) => ({
  cursor
}))
