import type { ReactNode } from 'react'

export function Camera ({ children }: { children: ReactNode }) {
  return (
    <main
      id='camera'
      className='absolute'
    >
      {children}
    </main>
  )
}
