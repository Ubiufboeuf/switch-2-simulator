import type { Box } from './boxTypes'

export interface Map {
  id: string
  items: MapItem[]
}

export type MapItem = Box
