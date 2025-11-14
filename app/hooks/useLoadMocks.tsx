import { useEffect } from 'react'
import { useLoadUser } from '~/services/userService'

export function useLoadMocks () {
  useEffect(() => {
    useLoadUser()    
  }, [])
}
