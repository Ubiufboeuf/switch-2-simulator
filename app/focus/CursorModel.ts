import type { CursorKeyboard } from '~/types/cursorTypes'

export class CursorModel {
  keyboard: CursorKeyboard = {
    actions: {
      w: '',
      a: '',
      s: '',
      d: ''
    },
    directions: {
      w: { y: -1 },
      a: { x: -1 },
      s: { y: 1 },
      d: { x: 1 }
    }
  }
}
