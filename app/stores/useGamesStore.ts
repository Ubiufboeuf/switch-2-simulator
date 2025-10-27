import { create } from 'zustand'
import { Game } from '~/models/BoxModel'

const baseGames: Game[] = []

for (let i = 0; i < 5; i++) {
  const game = new Game({
    gameName: 'Mario Kart 8 Deluxe',
    isDigital: false,
    isInserted: false,
    assets: {
      coverArt: '/switchui/images/games-cover-art/mario_kart_8_deluxe-256.avif'
    },
    position: {
      x: i,
      y: 1
    }
  })

  baseGames.push(game)
}

type GamesStore = {
  installedGames: Game[]
  setInstalledGames: (newGames: Game[]) => void
}

export const useGamesStore = create<GamesStore>((set) => ({
  installedGames: baseGames,
  setInstalledGames: (installedGames) => set({ installedGames })
}))
