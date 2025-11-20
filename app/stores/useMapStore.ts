import { create } from 'zustand'
import type { Map } from '~/types/mapTypes'
import type { Section } from '~/types/sectionTypes'

type MapStore = {
  items: Section[]
  setMap: (map: Map) => void
  addItem: (item: Section) => void
  updateItem: (id: string, section: Section) => void
  setSelectedBox: (selectedBoxId: string) => void
}

export const useMapStore = create<MapStore>((set) => ({
  items: [],
  setMap: (map) => set({ ...map }),
  addItem: (item) => set(({ items }) => ({ items: { ...items, item } })),
  updateItem (id, section) {
    set(({ items }) => {
      const idx = items.findIndex((s) => s.id === id)
      return {
        items: items.toSpliced(idx, 1, section)
      }
    })
  },
  setSelectedBox: (id) => {
    set(({ items }) => {
      const newItems: Section[] = []

      for (const section of [...items]) {
        for (const box of section.items) {
          box.selected = box.id === id
        }
        newItems.push(section)
      }

      return {
        items: [...newItems]
      }
    })
  }
}))
