import type { BoxType } from '~/types/boxTypes'
import type { GameAssets } from '~/types/games'

export class Box {
  id: string
  parentId?: string
  type: BoxType

  constructor (type: BoxType = 'empty', parentId?: string) {
    this.id = crypto.randomUUID()
    this.type = type
    this.parentId = parentId
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

  constructor (gameName: string, isDigital: boolean, isInserted: boolean, assets: GameAssets = {}) {
    super('game')
    this.gameName = gameName
    this.isDigital = isDigital
    this.isInserted = isInserted
    this.assets = assets
  }
}
