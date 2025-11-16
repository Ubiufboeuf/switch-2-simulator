import type { Box } from './boxTypes'
import type { Section } from './sectionTypes'

export interface Map {
  id: string
  items: MapItem[]
}

export type MapItem = Box | Section
