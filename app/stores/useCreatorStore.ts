import { create } from 'zustand'

type CreatorStore = {
  sections: Section[]
  createSection: () => Section
  editSection: (section: Section) => void
  createBox: (sectionId: string) => Box | void
  editBox: (sectionId: string, box: Box) => void
}

export type Section = {
  id: string
  name: string
  orientation: string
  items: Box[]
}

export type Box =  {
  id: string
  parentId: string | undefined
  topology: {
    up: string | null
    left: string | null
    down: string | null
    right: string | null
  }
}

let sectionCount = 0
let boxCount = 0

export const useCreatorStore = create<CreatorStore>((set, get) => ({
  sections: [],
  createSection () {
    const section = {
      id: `section-${++sectionCount}`,
      name: `section-${sectionCount}`,
      items: [],
      orientation: 'horizontal'
    }

    set((state) => ({
      sections: [...state.sections, section]
    }))
    
    return section
  },
  editSection (section) {
    const sections = [...get().sections]
    const sectionIdx = sections.findIndex((s) => s.id === section.id)

    sections.splice(sectionIdx, 1, {
      id: section.id,
      name: section.name,
      items: section.items.map((box) => ({
        id: box.id,
        parentId: section.id,
        topology: box.topology
      })),
      orientation: section.orientation
    })
    
    set({ sections })
  },
  createBox (sectionId) {
    const id = `box-${++boxCount}`
    const box: Box = {
      id,
      parentId: undefined,
      topology: {
        down: id,
        left: id,
        right: id,
        up: id
      }
    }

    const sections = [...get().sections]
    const sectionIdx = sections.findIndex((s) => s.id === sectionId)
    const section = sections[sectionIdx]
    
    if (!section) return

    box.parentId = section.id
    const items = [...section.items, box]

    sections.splice(sectionIdx, 1, {
      id: section.id,
      name: section.name,
      items: items,
      orientation: section.orientation
    })
    
    set({ sections })

    return box
  },
  editBox (sectionId, box) {
    const sections = [...get().sections]
    const sectionIdx = sections.findIndex((s) => s.id === sectionId)
    const section = sections[sectionIdx]

    sections.splice(sectionIdx, 1, {
      id: section.id,
      name: section.name,
      items: section.items.map((b) => ({
        id: b.id,
        parentId: section.id,
        topology: box.id === b.id ? box.topology : b.topology
      })),
      orientation: section.orientation
    })
    
    set({ sections })
  }
}))
