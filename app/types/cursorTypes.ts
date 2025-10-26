import type { KeyboardKey } from '~/env'
import type { Direction } from './ui'

type CursorControllerAction = () => void

export type CursorController = {
  directions: Record<Direction, boolean>,
  actions: Record<Direction, CursorControllerAction>
  keyboard: {
    key: KeyboardKey
    direction: Direction
  }[]
}
