import { useCursor } from '~/hooks/useCursor'

const borderSpacing = 2
const borderWidth = 2

export function Cursor ({ hidden }: { hidden?: boolean }) {
  const { cursorStyles } = useCursor({ borderSpacing, borderWidth })
  
  return (
    <article
      id='cursor'
      className='absolute z-2 flex items-center justify-center'
      style={cursorStyles}
      hidden={hidden}
    >
      cursor
    </article>
  )
}
