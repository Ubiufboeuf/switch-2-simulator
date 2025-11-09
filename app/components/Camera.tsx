import type { ReactNode } from 'react'
import { Cursor } from './Cursor'

export function Camera ({ children }: { children: ReactNode }) {
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
