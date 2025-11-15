import type { Direction, DirectionAsPoint } from '~/env'
import type { KeyboardKey } from './consoleTypes'

export interface CursorHookProps {
  borderSpacing: number
  borderWidth: number
}

export interface Cursor {
  selectedBoxId: string | null
  controller: {
    directions: Record<Direction, boolean>,
    directionAsPoint: DirectionAsPoint,
    keyboard: {
      key: KeyboardKey
      direction: Direction
    }[]
  }
}
