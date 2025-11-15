import { useEffect } from 'react'
import { loadUser } from '~/services/userService'

export function useLoadMocks () {
  useEffect(() => {
    loadUser()    
  }, [])
}
