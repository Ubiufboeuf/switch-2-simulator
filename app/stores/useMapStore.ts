import { create } from 'zustand'
import type { Map } from '~/types/mapTypes'
import type { Section } from '~/types/sectionTypes'

type MapStore = {
  map: Map | null
  items: Section[] | null
  setMap: (map: Map) => void
  addItem: (item: Section) => void
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

      const newItems: Section[] = []

      for (const section of map.items) {
        for (const box of section.items) {
          box.selected = box.id === id
        }
        newItems.push(section)
      }

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
