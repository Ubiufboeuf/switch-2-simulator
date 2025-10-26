export type Box =  {
  id: string
  parentId: string | undefined
  topology: {
    up: string | null
    left: string | null
    down: string | null
    right: string | null
  }
}

export type BoxType = 'empty' | 'game'

