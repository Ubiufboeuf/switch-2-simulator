import { useEffect, useState, type CSSProperties } from 'react'
import type { Point, ValidKeys } from '~/env'
import { convertCSSUnitToNumber, getPositionInCamera } from '~/lib/utils'
import { map } from '~/routes/index'

type HookProps = {
  borderSpacing: number
  borderWidth: number
}

export const validKeys: ValidKeys = [
  { key: 'w', direction: 'up' },
  { key: 'a', direction: 'left' },
  { key: 's', direction: 'down' },
  { key: 'd', direction: 'right' }
]

const defaultStyles: CSSProperties = {
  height: '96px',
  width: '96px',
  borderRadius: 8
}

export function useCursor ({ borderWidth, borderSpacing }: HookProps) {
  const [cursorStyles, setCursorStyles] = useState(defaultStyles)

  function handleKeyDown (event: KeyboardEvent) {
    if (!validKeys.some(({ key }) => key === event.key)) return
    console.log('key pressed')
  }

  function handleKeyUp (event: KeyboardEvent) {
    if (!validKeys.some(({ key }) => key === event.key)) return
    console.log('key released')
  }

  function getBoxByPosition ({ x, y }: Point) {
    const id = map?.[y]?.[x]
    const box = document.querySelector(`[data-id='${id}']`)
    return box
  }

  function updateCursorStyles (box: HTMLElement) {
    const boxRect = box.getBoundingClientRect()

    const boxDimensions = {
      left: getPositionInCamera('left', boxRect.left) - (borderWidth + borderSpacing),
      top: getPositionInCamera('top', boxRect.top) - (borderWidth + borderSpacing),
      height: boxRect.height + (borderWidth + borderSpacing) * 2,
      width: boxRect.width + (borderWidth + borderSpacing) * 2
    }

    const styleMap = box.computedStyleMap()
    const borderRadius = convertCSSUnitToNumber(styleMap.get('border-radius')) + borderSpacing * 1.5

    setCursorStyles({
      ...boxDimensions,
      borderRadius
    })
  }
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return {
    cursorStyles
  }
}
