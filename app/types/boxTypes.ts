import type { Point } from '~/env'
import type { GameAssets } from './games'

export type BoxType = 'empty' | 'game'

export type GameModelProps = {
  gameName: string
  isDigital: boolean
  isInserted: boolean
  assets: GameAssets
  position: Point
}
