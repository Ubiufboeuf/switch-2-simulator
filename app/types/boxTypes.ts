import type { Direction } from '~/env'

export interface CreateBoxProps {
  id?: string
  selected?: boolean
  topology?: Record<Direction, string>
}

export interface Box {
  id: string
  selected?: boolean
  topology?: Record<Direction, string>
}

export interface Game extends Box {
  id: string
}
