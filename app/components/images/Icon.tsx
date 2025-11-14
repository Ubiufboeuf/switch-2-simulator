import type { ReactNode } from 'react'

export function Icon ({ className = '', children }: { className?: string, children: ReactNode }) {
  return (
    <div className={`${className} not-[[class*=h-]]:h-10 not-[[class*=w-]]:w-10 flex items-center justify-center overflow-hidden`}>
      {children}
    </div>
  )
}
