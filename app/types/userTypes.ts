import type { Avatars } from './avatarTypes'

export interface User {
  id: string
  profiles: Profile[]
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
