import type { Point } from '~/env'
import type { CursorController } from '~/types/cursorTypes'

export class CursorModel {
  initialVirtualPosition: Point
  // controllerType: 'keyboard' | 'gamepad' = 'keyboard'
  controllerType: 'keyboard' = 'keyboard' as const
  controller: CursorController = {
    directions: {
      top: false,
      left: false,
      bottom: false,
      right: false
    },
    directionAsPoint: { x: 0, y: 0 },
    keyboard: [
      { key: 'w', direction: 'top' },
      { key: 'a', direction: 'left' },
      { key: 's', direction: 'bottom' },
      { key: 'd', direction: 'right' }
    ]
  }

  constructor (initialPosition: Point) {
    this.initialVirtualPosition = initialPosition
  }
}
