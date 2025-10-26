export type BoxType = 'button' | 'toggle' | 'card' | 'select-trigger'

export class Box {
  id: string
  parentId: string
  type: BoxType

  constructor (id: string, parentId: string, type: BoxType) {
    this.id = id
    this.parentId = parentId
    this.type = type
  }
}
