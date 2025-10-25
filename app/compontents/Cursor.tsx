import { useEffect, useRef, useState } from 'react'
import { useCursor } from '~/hooks/useCursor'

export function Cursor () {
  const {styles, dimensions} = useCursor()
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
      className='absolute size-10 bg-transparent outline-4'
      style={style}
    >
    </article>
  )
}
