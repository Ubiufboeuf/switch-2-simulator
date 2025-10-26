import type { Box, Game } from './BoxModel'

type Item = Box | Game

export class Section {
  id: string
  mapId?: string
  items: Item[] = []

  constructor (mapId?: string) {
    this.id = crypto.randomUUID()
    this.mapId = mapId
  }
}
