import { useEffect, useRef, useState } from 'react'
import { useCursor } from '~/hooks/useCursor'

const borderSpacing = 2
const borderWidth = 2

export function Cursor () {
  const { styles, dimensions, borderStyles } = useCursor({ borderSpacing, borderWidth })
  const [style, setStyles] = useState<Record<string, unknown>>()

  const cursorRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (dimensions) {
      for (const [prop, value] of Object.entries(dimensions)) {
        setStyles((prevStyles) => ({
          ...prevStyles,
          [prop]: value
        }))
      }
    }
  }, [dimensions])

  useEffect(() => {
    if (styles) {
      for (const [prop, value] of Object.entries(styles)) {
        setStyles((prevStyles) => ({
          ...prevStyles,
          [prop]: value
        }))
      }
    }
  }, [styles])

  return (
    <article
      ref={cursorRef}
      id='cursor'
      className='absolute size-10 bg-transparent transition-[left_200ms_ease,top_200ms_ease]'
      style={style}
    >
      <div id='cursor-border' className='relative size-full overflow-visible' style={borderStyles}>
        <div id='cursor-border-colors' className='absolute -left-1/2 -top-1/2 h-[200%] w-[200%] bg-blue-300/20' />
      </div>
    </article>
  )
}
