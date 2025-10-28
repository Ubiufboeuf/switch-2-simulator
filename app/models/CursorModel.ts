import type { Point } from '~/env'
import { limitNumber } from '~/lib/utils'
import type { CursorController } from '~/types/cursorTypes'
import type { Direction, DirectionAsPoint } from '~/types/ui'

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

  changeDirection (action: 'press' | 'release', desiredDirection: Direction) {
    const directions = this.controller.directions

    let verticalDirection = 0
    let horizontalDirection = 0
    
    directions[desiredDirection] = action === 'press'
    if (directions.top) verticalDirection--
    if (directions.left) horizontalDirection--
    if (directions.bottom) verticalDirection++
    if (directions.right) horizontalDirection++

    const x = limitNumber(horizontalDirection) as DirectionAsPoint['x']
    const y = limitNumber(verticalDirection) as DirectionAsPoint['y']

    const directionAsPoint: DirectionAsPoint = { x, y }
    this.controller.directionAsPoint = directionAsPoint
    return directionAsPoint
  }
}
