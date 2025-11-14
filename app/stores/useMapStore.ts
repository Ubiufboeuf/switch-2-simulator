import { create } from 'zustand'
import type { Map, MapItem } from '~/types/mapTypes'

type MapStore = {
  map: Map | null
  setMap: (map: Map) => void
  addItem: (item: MapItem) => void
}

export const useMapStore = create<MapStore>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
  addItem (item) {
    set(({ map }) => {
      if (!map) return {}
      return {
        map: {
          ...map,
          items: [...map.items, item]
        }
      }
    })
  }
}))
