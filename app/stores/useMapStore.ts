import { create } from 'zustand'
import type { Point } from '~/env'
import { Map } from '~/models/MapModel'
import type { MapPreset } from '~/types/mapPresets'
import type { MapItem } from '~/types/mapTypes'

type MapStore = {
  map: Map | null
  initialCursorPosition: Point | null
  createMap: (preset: MapPreset) => Map
  addItem: (item: MapItem) => void
}

export const useMapStore = create<MapStore>((set, get) => ({
  map: null,
  initialCursorPosition: null,
  createMap: (preset) => {
    const map = new Map(preset)
    set({ map })
    return map
  },
  addItem (item) {
    const { map } = get()
    if (!map) return
    
    set((state) => ({
      map: {
        ...map,
        items: [
          ...state.map!.items,
          item
        ]
      }
    }))
  }
}))
