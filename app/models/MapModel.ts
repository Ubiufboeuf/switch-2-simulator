import type { MapItem } from '~/types/mapTypes'

export class Map {
  id: string
  items: MapItem[] = []

  constructor (id?: string) {
    this.id = id ?? crypto.randomUUID()
  }
}
