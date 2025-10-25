import type { KeyboardMovementKeys } from '~/env'

export type CursorKeyboard = {
  actions: Record<KeyboardMovementKeys, string>
  directions: Record<KeyboardMovementKeys, { [k in 'x' | 'y']?: number }>
}
