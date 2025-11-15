import { create } from 'zustand'
import type { Map, MapItem } from '~/types/mapTypes'

type MapStore = {
  map: Map | null
  items: MapItem[] | null
  setMap: (map: Map) => void
  addItem: (item: MapItem) => void
  setSelectedBox: (selectedBoxId: string) => void
}

export const useMapStore = create<MapStore>((set) => ({
  map: null,
  items: null,
  setMap: (map) => set({ map }),
  addItem (item) {
    set(({ map }) => {
      if (!map) return {}
      const newItems = [...(map.items)]
      if (!newItems.some((i) => i.id === item.id)) newItems.push(item)
      return {
        map: {
          ...map,
          items: [...newItems]
        },
        items: [...newItems]
      }
    })
  },
  setSelectedBox: (id) => {
    set(({ map }) => {
      if (!map) return {}

      const newItems = [...map.items.map((i) => {
        i.selected = i.id === id
        return i
      })]

      return {
        map: {
          ...map,
          items: newItems
        },
        items: newItems
      }
    })
  }
}))
