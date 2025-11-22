import type { NavbarLinksList } from '~/lib/navbarLinks/navbarLinkDimensions'
import type { Dimensions } from '~/types/uiTypes'

export type NavbarLinks = keyof typeof NavbarLinksList
export type NavbarLinkDimensions = Record<NavbarLinks, Dimensions>
export type Link = {
  link: NavbarLinks
  name: string
  href: string
}
