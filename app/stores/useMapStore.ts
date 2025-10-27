import { create } from 'zustand'
import { Map } from '~/models/MapModel'
import type { MapItem } from '~/types/mapTypes'

type MapStore = {
  map: Map | null
  createMap: (id?: string) => Map
  addItem: (item: MapItem) => void
}

export const useMapStore = create<MapStore>((set, get) => ({
  map: null,
  createMap: (id) => {
    const map = new Map(id)
    set({ map })
    return map
  },
  addItem (item) {
    const { map } = get()
    if (!map) return
    
    set((state) => ({
      map: {
        id: state.map!.id,
        items: [
          ...state.map!.items,
          item
        ]
      }
    }))
  }
}))
