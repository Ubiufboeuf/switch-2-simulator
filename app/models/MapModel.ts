import type { MapItem, MapProps } from '~/types/mapTypes'
import type { Size } from '~/types/ui'
import type { MapPreset } from '~/types/mapPresets'
import type { Point } from '~/env'

export class Map implements MapPreset {
  id: string
  name: string
  path: string
  initialCursorPosition: Point
  virtualSize: Size
  items: MapItem[] = []

  constructor ({ id, initialCursorPosition, name, path, virtualSize }: MapProps) {
    this.id = id ?? crypto.randomUUID()
    this.initialCursorPosition = initialCursorPosition
    this.name = name
    this.path = path
    this.virtualSize = virtualSize
  }
}
