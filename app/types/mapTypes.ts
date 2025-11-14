import type { Direction } from '~/env'

export interface Map {
  id: string
  items: MapItem[]
}

export interface MapItem {
  id: string
  selected?: boolean
  topology?: Record<Direction, string>
}
