import { ENDPOINTS } from '~/lib/constants/endpoints'
import { useUserStore } from '~/stores/useUserStore'
import type { User } from '~/types/userTypes'

const USER_ID = 'user-1'

export async function loadUser () {
  const { id } = useUserStore.getState()

  if (id) return
  
  let user = null
  try {
    user = await fetchUser(USER_ID)
  } catch (err) {
    console.error('error consiguiendo los datos del usuario', err)
  }

  if (!user) return

  const { 
    setUser, 
    setUserId, 
    setName, 
    setUserName, 
    setBirthDate, 
    setAvatar 
  } = useUserStore.getState()

  setUser(user)
  setUserId(user.id)
  setName(user.profiles[0].name)
  setUserName(user.profiles[0].userName)
  setBirthDate(user.profiles[0].birthDate)
  setAvatar(user.profiles[0].avatar)
}

export async function fetchUser (id: string): Promise<User | undefined> {
  console.log(ENDPOINTS.USER)
  const res = await fetch(ENDPOINTS.USER)
  const user = await res.json()
  return user
}
