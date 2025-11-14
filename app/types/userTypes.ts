import type { Avatars } from './avatarTypes'

export interface User {
  id: string
  name: string
  userName: string
  birthDate: {
    day: number
    month: number
  }
  avatar: Avatars
}
