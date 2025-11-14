import type { Box, Game } from './boxTypes'

export interface Map {
  id: string
  items: MapItem[]
}

export type MapItem = Box | Game
