import type { SectionItem } from '~/types/sectionTypes'

export class Section {
  id: string
  mapId?: string
  name: string
  items: SectionItem[] = []

  constructor (name: string, mapId: string) {
    this.id = crypto.randomUUID()
    this.name = name
    this.mapId = mapId
  }
}
