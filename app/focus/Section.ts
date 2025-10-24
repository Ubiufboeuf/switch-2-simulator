import type { Box } from './Box'

type Focusable = Box

export class Section {
  id: string
  parentId: string | null
  items: Focusable[] = []

  constructor (id: string, parentId: string | null = null) {
    this.id = id
    this.parentId = parentId
  }

  addItem (item: Focusable) {
    this.items.push(item)
  }

  getItem (id: string) {
    return this.items.find((item) => item.id === id)
  }

  removeItem (id: string) {
    const newItems = this.items.filter((item) => item.id === id)
    this.items = newItems
    
    return newItems
  }
}
