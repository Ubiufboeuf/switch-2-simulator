import type { CSSProperties } from 'react'

export function CoverArt ({ src, fit = 'cover' }: { src: string, fit?: CSSProperties['objectFit'] }) {
  return (
    <div className='rounded-[10px] overflow-hidden'>
      <img
        src={src}
        className='h-full w-full'
        style={{objectFit: fit}}
      />
    </div>
  )
}
