import type { Avatars } from './avatarTypes'
import type { Game } from './boxTypes'

export interface User {
  id: string
  profiles: Profile[]
  games: {
    principalList: Game[]
    completeList: Game[]
  }
}

export interface Profile {
  name: string
  userName: string
  birthDate: {
    day: number
    month: number
  }
  avatar: Avatars
}
