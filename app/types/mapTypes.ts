import type { Point } from '~/env'
import type { Section } from '~/models/SectionModel'
import type { Size } from './ui'

export type MapItem = Section

export type MapProps = {
  id?: string
  name: string
  path: string
  initialCursorPosition: Point
  virtualSize: Size
}
