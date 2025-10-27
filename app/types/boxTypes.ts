import type { Point } from '~/env'
import type { GameAssets } from './games'

export type BoxType = 'empty' | 'game' | 'link'

export type GameModelProps = {
  id?: string
  gameName: string
  isDigital: boolean
  isInserted: boolean
  assets: GameAssets
  position: Point
}

export type LinkModelProps = {
  path: string
  position: Point
  text?: string
  icon?: string
}
