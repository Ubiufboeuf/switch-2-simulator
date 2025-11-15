import { create } from 'zustand'
import type { Cursor } from '~/types/cursorTypes'
import { useMapStore } from './useMapStore'

const defaultCursor: Cursor = {
  selectedBoxId: null,
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

type CursorStore = Cursor & {
  cursor: Cursor
  setCursor: (cursor: Cursor) => void /* esto es simplemente por reactividad */
  setSelectedBox: (id: string) => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  ...defaultCursor,
  cursor: defaultCursor,
  setCursor: (cursor) => set({ cursor }),
  setSelectedBox: (selectedBoxId) => {
    // Actualizar cursor
    set(({ cursor }) => ({
      cursor: {
        ...cursor,
        selectedBoxId
      },
      selectedBoxId
    }))

    // Actualizar mapa
    const { setSelectedBox } = useMapStore.getState()
    setSelectedBox(selectedBoxId)
  }
}))
