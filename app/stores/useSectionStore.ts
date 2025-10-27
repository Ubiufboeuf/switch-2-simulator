import { create } from 'zustand'
import type { Map } from '~/models/MapModel'
import { Section } from '~/models/SectionModel'

type SectionStore = {
  getSectionInMap: (id: string, map: Map) => Section | undefined
  createSection: (name: string, map: Map) => Section
}

export const useSectionStore = create<SectionStore>(() => ({
  createSection (name, map) {
    const section = new Section(name, map.id)
    
    return section
  },
  getSectionInMap (id, map) {
    const { items } = map
    const section = items.find((i) => i.id === id)
    return section
  }
}))
