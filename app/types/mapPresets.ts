import type { Point } from '~/env'
import type { GameAssets } from './games'

// HomeMapPreset
export interface MapPreset {
  id: string
  name: string
  path: string
  items: {
    id: string
    mapId: string
    items: {
      id: string
      parentId: string
      type: string
      gameName: string
      isDigital: boolean
      isInserted: boolean
      assets: GameAssets
      position: Point
    }[]
  }[]
}
