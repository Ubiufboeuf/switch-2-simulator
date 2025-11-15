import type { Direction } from '~/env'

export type ConsoleState = 'on' | 'off'

export type KeyboardKey = ' '
  | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
  | 'q' | 'w' | 'e' | 'r' | 't' | 'y' | 'u' | 'i' | 'o' | 'p'
  | 'a' | 's' | 'd' | 'f' | 'g' | 'h' | 'j' | 'k' | 'l' | 'ñ'
  | 'z' | 'x' | 'c' | 'v' | 'b' | 'n' | 'm' | ',' | '.' | '-'

export type Directions = Record<Direction, number>
