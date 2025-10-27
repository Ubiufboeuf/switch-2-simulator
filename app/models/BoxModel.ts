import type { Point } from '~/env'
import type { BoxType, GameModelProps } from '~/types/boxTypes'
import type { GameAssets } from '~/types/games'

export class Box {
  id: string
  parentId?: string
  type: BoxType
  position?: Point

  constructor ({ type = 'empty', position, parentId }: { type: BoxType, position: Point, parentId?: string }) {
    this.id = crypto.randomUUID()
    this.type = type
    this.parentId = parentId
    this.position = position
  }

  convertBox (newType: BoxType) {
    this.type = newType
  }
}

export class Game extends Box {
  gameName: string
  isDigital: boolean
  isInserted: boolean
  assets: GameAssets

  constructor ({ gameName, isDigital, isInserted, assets, position }: GameModelProps) {
    super({ type: 'game', position })
    this.gameName = gameName
    this.isDigital = isDigital
    this.isInserted = isInserted
    this.assets = assets
  }
}
