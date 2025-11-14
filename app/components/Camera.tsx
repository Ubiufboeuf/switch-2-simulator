import { useEffect, type ReactNode } from 'react'
import { Cursor } from './Cursor'
import { useLoadMap } from '~/services/mapService'
import { useLocation } from 'react-router'

let isMapLoaded = false

export function Camera ({ children }: { children: ReactNode }) {
  const location = useLocation()

  useEffect(() => {  
    if (isMapLoaded) return
    
    useLoadMap(location.pathname)
    isMapLoaded = true
  }, [])
  
  return (
    <main
      id='camera'
      className='absolute z-1 mr-[6px] mt-[12px] flex items-center justify-center w-181 h-[450.5px] bg-[#1A1A1A]'
    >
      <Cursor />
      {children}
    </main>
  )
}
