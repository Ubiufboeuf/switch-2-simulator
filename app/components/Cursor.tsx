import { useCursor } from '~/hooks/useCursor'

const borderSpacing = 2
const borderWidth = 2

export function Cursor ({ hidden }: { hidden?: boolean }) {
  const { cursorStyles, borderStyles } = useCursor({ borderSpacing, borderWidth })
  
  return (
    <article
      id='cursor'
      className='absolute z-2 flex items-center justify-center'
      style={cursorStyles}
      hidden={hidden}
    >
      <div id='cursor-border' className='relative size-full overflow-visible' style={borderStyles}>
        <div id='cursor-border-colors' className='absolute -left-1/2 -top-1/2 h-[200%] w-[200%] bg-blue-300/20' />
      </div>
    </article>
  )
}
