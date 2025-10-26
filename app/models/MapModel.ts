import type { MapItems } from '~/types/mapTypes'

export class Map {
  id: string
  items: MapItems[] = []

  constructor () {
    this.id = crypto.randomUUID()
  }
}
