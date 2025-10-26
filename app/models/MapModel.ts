import type { MapItem } from '~/types/mapTypes'

export class Map {
  id: string
  items: MapItem[] = []

  constructor () {
    this.id = crypto.randomUUID()
  }
}
