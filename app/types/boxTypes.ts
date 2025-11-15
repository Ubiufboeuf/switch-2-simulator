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

export interface Game {
  game: string
  assets: {
    coverArt?: string
  }
}
