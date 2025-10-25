import { create } from 'zustand'
import type { Link } from '~/types/navigation'

const baseLinks: Link[] = []

for (let i = 0; i < 10; i++) {
  const newLink: Link = {
    id: `link-${i}`,
    link: '/',
    src: '/switchui/images/nso/icon.svg'
  }

  baseLinks.push(newLink)
}

type NavigationStore = {
  homeLinks: Link[]
  setHomeLinks: (newHomeLinks: Link[]) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  homeLinks: baseLinks,
  setHomeLinks: (homeLinks) => set({ homeLinks })
}))
