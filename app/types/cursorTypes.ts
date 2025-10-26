import type { KeyboardKey } from '~/env'
import type { Direction, DirectionAsPoint } from './ui'

export type CursorActionResultData = {
  directionAsPoint: DirectionAsPoint
}
export type CursorControllerAction = () => CursorActionResultData

export type CursorController = {
  directions: Record<Direction, boolean>,
  directionAsPoint: DirectionAsPoint,
  keyboard: {
    key: KeyboardKey
    direction: Direction
  }[]
}
