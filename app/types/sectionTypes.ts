import type { Box } from './boxTypes'

export interface Section {
  id: string
  items: SectionItem[]
}


export type SectionItem = Box
