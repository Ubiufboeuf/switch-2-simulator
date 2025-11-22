import type { NavbarLinkDimensions } from '~/types/navbarLinkTypes'
import type { Dimensions } from '~/types/uiTypes'

export const NavbarLinksList = {
  nso: [0],
  chat: [1],
  news: [2],
  eshop: [3],
  galery: [4],
  share: [5],
  controllers: [6],
  shared_games: [7],
  settings: [8],
  power_off: [9]
}

export function getNavbarLink (name: keyof NavbarLinkDimensions): Dimensions {
  const [y] = NavbarLinksList[name]
  const link: Dimensions = {
    left: '-1.8px',
    top: `${-2 + (33.3 * -y)}px`,
    height: '',
    width: '40px'
  }
  return link
}
