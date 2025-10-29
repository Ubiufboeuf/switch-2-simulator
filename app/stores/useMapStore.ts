import { create } from 'zustand'
import type { Point } from '~/env'
import { Map } from '~/models/MapModel'
import type { MapPreset } from '~/types/mapPresets'
import type { MapItem } from '~/types/mapTypes'
import type { SectionItem } from '~/types/sectionTypes'

type MapStore = {
  map: Map | null
  initialCursorPosition: Point | null
  createMap: (preset: MapPreset) => Map
  addItem: (item: MapItem) => void
  addSectionItem: (sectionId: string, item: SectionItem) => void
  getBoxByPosition: (position: Point) => SectionItem | undefined
  getSectionById: (sectionId: string) => MapItem | undefined
}

export const useMapStore = create<MapStore>((set, get) => ({
  map: null,
  initialCursorPosition: null,
  createMap: (preset) => {
    const map = new Map(preset)
    const { initialCursorPosition } = preset
    set({ map, initialCursorPosition })
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
  },
  addSectionItem (id, item) {
    const { map } = get()
    if (!map) return

    const sectionIdx = map.items.findIndex((s) => s.id === id)
    if (sectionIdx === -1) return

    const section = map.items[sectionIdx]

    set({ map:
      { ...map, items:
        [ ...map.items,
          { ...section, items:
            [ ...section.items, item ]
          }
        ]
      }
    })
  },
  getBoxByPosition ({ x, y }) {
    const { map } = get()
    if (!map) return

    const box = map.items?.[y]?.items?.[x]
    return box
  },
  getSectionById (id) {
    const { map } = get()
    if (!map) return

    const section = map.items.find((s) => s.id === id)
    return section
  }
}))
