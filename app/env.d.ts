export type Point = {
  x: number,
  y: number
}

export type DirectionAsPoint = {
  x?: -1 | 0 | 1
  y?: -1 | 0 | 1
}

export type Keys = ' '
  | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'
  | 'q' | 'w' | 'e' | 'r' | 't' | 'y' | 'u' | 'i' | 'o' | 'p'
  | 'a' | 's' | 'd' | 'f' | 'g' | 'h' | 'j' | 'k' | 'l' | 'ñ'
  | 'z' | 'x' | 'c' | 'v' | 'b' | 'n' | 'm' | ',' | '.' | '-'

export type Direction = 'up' | 'left' | 'down' | 'right'
  
export type ValidKeys = {
  key: Keys,
  direction: Direction
}[]
