export type Dimensions = {
  left: string
  top: string
  height: string
  width: string
}

export type BoxElement = HTMLElement | HTMLDivElement

export type Direction = 'top' | 'left' | 'bottom' | 'right'
export type DirectionAsPoint = {
  x?: -1 | 0 | 1
  y?: -1 | 0 | 1
}

export type Size = {
  height: number
  width: number
}
