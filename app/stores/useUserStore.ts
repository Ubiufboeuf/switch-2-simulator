import { create } from 'zustand'
import type { Profile, User } from '~/types/userTypes'

type UserStore = {
  user: User | null
  id: User['id'] | null
  name: Profile['name'] | null
  userName: Profile['userName'] | null
  birthDate: Profile['birthDate'] | null
  avatar: Profile['avatar'] | null
  setUser: (user: User) => void
  setUserId: (userId: User['id']) => void
  setName: (name: Profile['name']) => void
  setUserName: (userName: Profile['userName']) => void
  setBirthDate: (birthDate: Profile['birthDate']) => void
  setAvatar: (avatar: Profile['avatar']) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  id: null,
  name: null,
  userName: null,
  birthDate: null,
  avatar: null,
  setUser: (user: User) => set({ user }),
  setUserId: (id: string) => set({ id }),
  setName: (name) => set({ name }),
  setUserName: (userName) => set({ userName }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setAvatar: (avatar) => set({ avatar })
}))
