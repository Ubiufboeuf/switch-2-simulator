import type { Dimensions } from '~/types/uiTypes'
import type { Avatars } from '../lib/avatars/avatarDimensions'

export type AvatarDimensions = Record<keyof typeof Avatars, Dimensions>
