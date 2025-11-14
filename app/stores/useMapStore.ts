import { create } from 'zustand'
import type { Map } from '~/types/mapTypes'

type MapStore = {
  map: Map | null
  setMap: (map: Map) => void
}

export const useMapStore = create<MapStore>((set) => ({
  map: null,
  setMap: (map) => set({ map })
}))
