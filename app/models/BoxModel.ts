import type { Point } from '~/env'
import type { BoxType, GameModelProps, LinkModelProps } from '~/types/boxTypes'
import type { GameAssets } from '~/types/games'

export class Box {
  id: string
  parentId?: string
  type: BoxType
  position?: Point

  constructor ({ id, type = 'empty', position, parentId }: { id?: string, type: BoxType, position: Point, parentId?: string }) {
    this.id = id ?? crypto.randomUUID()
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

  constructor ({ id, gameName, isDigital, isInserted, assets, position }: GameModelProps) {
    super({ id, type: 'game', position })
    this.gameName = gameName
    this.isDigital = isDigital
    this.isInserted = isInserted
    this.assets = assets
  }
}

export class Link extends Box {
  path: string
  text?: string
  icon?: string

  constructor ({ path, position, text, icon }: LinkModelProps) {
    super({ type: 'link', position })
    this.path = path
    this.text = text
    this.icon = icon
  }
}
