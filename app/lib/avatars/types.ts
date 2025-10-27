import type { Dimensions } from '~/types/ui'
import type { Avatars } from './dimensions'

export type AvatarDimensions = Record<keyof typeof Avatars, Dimensions>
