import type { CursorController } from '~/types/cursorTypes'

export class CursorModel {
  controllerType: 'keyboard' | 'gamepad' = 'keyboard'
  controller: CursorController = {
    directions: {
      top: false,
      left: false,
      bottom: false,
      right: false
    },
    actions: {
      top: () => {},
      left: () => {},
      bottom: () => {},
      right: () => {}
    },
    keyboard: [
      { key: 'w', direction: 'top' },
      { key: 'a', direction: 'left' },
      { key: 's', direction: 'bottom' },
      { key: 'd', direction: 'right' }
    ]
  }
}
