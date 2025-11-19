import type { SECTION } from '~/lib/constants/constants'
import type { Box } from './boxTypes'

export interface Section {
  id: string
  type: typeof SECTION
  items: SectionItem[]
}

export type SectionItem = Box
