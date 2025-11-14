import { create } from 'zustand'
import type { Profile, User } from '~/types/userTypes'

type UserStore = {
  user: User | null
  id: User['id'] | null
  name: Profile['name'] | null
  userName: Profile['userName'] | null
  birthDate: Profile['birthDate'] | null
  avatar: Profile['avatar'] | null
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  id: null,
  name: null,
  userName: null,
  birthDate: null,
  avatar: null
}))
