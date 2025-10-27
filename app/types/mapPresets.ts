import type { MapItem } from './mapTypes'
import type { Size } from './ui'

// HomeMapPreset
export interface MapPreset {
  id: string
  name: string
  path: string
  items: MapItem[]
  virtualSize: Size
}
