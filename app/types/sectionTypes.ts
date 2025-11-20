import type { Direction } from '~/env'
import type { Box } from './boxTypes'

export interface Section {
  id: string
  type: 'section'
  boxToReturn: string
  topology?: Record<Direction, string>
  items: Box[]
}
