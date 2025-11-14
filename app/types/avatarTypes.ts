import type { Dimensions } from '~/types/uiTypes'
import type { AvatarsList } from '../lib/avatars/avatarDimensions'

export type Avatars = keyof typeof AvatarsList
export type AvatarDimensions = Record<Avatars, Dimensions>
