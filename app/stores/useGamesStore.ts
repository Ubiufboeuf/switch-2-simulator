import { create } from 'zustand'
import type { Game } from '~/models/BoxModel'

type GamesStore = {
  installedGames: Game[]
  setInstalledGames: (newGames: Game[]) => void
}

export const useGamesStore = create<GamesStore>((set) => ({
  installedGames: [],
  setInstalledGames: (installedGames) => set({ installedGames })
}))
