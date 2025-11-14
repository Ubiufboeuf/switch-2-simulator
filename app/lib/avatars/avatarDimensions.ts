import type { AvatarDimensions } from '~/types/avatarTypes'
import type { Dimensions } from '~/types/uiTypes'

export const Avatars = {
  mario: [0, 0], luigi: [1, 0], peach: [2, 0], yoshi: [3, 0], donkeyKong: [4, 0], bowser: [5, 0],
  anonymous: [3, 24]
}

const left = 36.4
const top = 36.4

export function getAvatar (name: keyof AvatarDimensions): Dimensions {
  const [x, y] = Avatars[name] || Avatars.anonymous
  const avatar: Dimensions = {
    left: `${- (0.3 + (left * x))}px`,
    top: `${- (0.5 + (top * y))}px`,
    height: '',
    width: '218.5px'
  }
  return avatar
}
