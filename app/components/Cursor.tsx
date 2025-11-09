import { useCursor } from '~/hooks/useCursor'

const borderSpacing = 2
const borderWidth = 2

export function Cursor () {
  const { cursorStyles } = useCursor({ borderSpacing, borderWidth })
  
  return (
    <article
      id='cursor'
      className='absolute z-2 flex items-center justify-center'
      style={cursorStyles}
    >
      cursor
    </article>
  )
}
