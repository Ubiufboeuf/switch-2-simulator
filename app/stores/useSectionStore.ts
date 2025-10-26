import { create } from 'zustand'
import type { Map } from '~/models/MapModel'
import { Section } from '~/models/SectionModel'

type SectionStore = {
  getSectionInMap: (id: string, map: Map) => Section | undefined
  createSectionInMap: (map: Map) => Section
}

export const useSectionStore = create<SectionStore>((set) => ({
  getSectionInMap (id, map) {
    const { items } = map
    const section = items.find((i) => i.id === id)
    return section
  },
  createSectionInMap (map) {
    const section = new Section(map.id)
    
    return section
  }
}))
