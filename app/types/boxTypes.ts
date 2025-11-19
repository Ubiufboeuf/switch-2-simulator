import type { Direction } from '~/env'
import type { BOX } from '~/lib/constants/constants'

export interface CreateBoxProps {
  id?: string
  selected?: boolean
  topology?: Record<Direction, string>
}

export interface Box {
  id: string
  type: typeof BOX
  selected?: boolean
  topology?: Record<Direction, string>
}
