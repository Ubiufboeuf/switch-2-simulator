import { create } from 'zustand'
import type { Game } from '~/types/games'

const baseGames: Game[] = []

for (let i = 0; i < 5; i++) {
  const newGame: Game = {
    id: `game-${i}`,
    name: 'Mario Kart 8 Deluxe',
    digital: false,
    inserted: false,
    assets: {
      coverArt: '/switchui/images/games-cover-art/mario_kart_8_deluxe-256.avif'
    }
  }

  baseGames.push(newGame)
}

type GamesStore = {
  installedGames: Game[]
  setInstalledGames: (newGames: Game[]) => void
}

export const useGamesStore = create<GamesStore>((set) => ({
  installedGames: baseGames,
  setInstalledGames: (installedGames) => set({ installedGames })
}))
