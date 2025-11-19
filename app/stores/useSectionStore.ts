import { create } from 'zustand'
import type { Box } from '~/types/boxTypes'
import type { Section } from '~/types/sectionTypes'
import { useMapStore } from './useMapStore'

type SectionStore = {
  addBox: (box: Box, section: Section) => void
}

export const useSectionStore = create<SectionStore>((set) => ({
  addBox (box, section) {
    const { updateItem } = useMapStore.getState()

    const newSection = {
      ...section,
      items: [...section.items]
    }
    newSection.items.push(box)
    
    updateItem(section.id, newSection)
  }
}))
