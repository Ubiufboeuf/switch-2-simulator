import type { MapItem } from './mapTypes'

// HomeMapPreset
export interface MapPreset {
  id: string
  name: string
  path: string
  items: MapItem[]
}
