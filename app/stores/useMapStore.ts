import { create } from 'zustand'
import { Map } from '~/models/MapModel'
import type { MapItem } from '~/types/mapTypes'

type MapStore = {
  map: Map
  addItem: (item: MapItem) => void
}

export const useMapStore = create<MapStore>((set) => ({
  map: new Map(),
  addItem (item) {
    
  }
}))
