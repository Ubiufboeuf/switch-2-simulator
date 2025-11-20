import type { Box } from './boxTypes'

export interface Section {
  id: string
  type: 'section'
  items: Box[]
}
