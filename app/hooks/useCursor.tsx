import { useEffect, useState, type CSSProperties } from 'react'
import type { DirectionAsPoint, Directions, KeyAction, Point, ValidKeys } from '~/env'
import { convertCSSUnitToNumber, getPositionInCamera, limitNumber } from '~/lib/utils'
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

const defaultPosition = {
  x: 1,
  y: 1
}

const defaultDirection = {
  x: 0,
  y: 0
}

const defaultDirections: Directions = {
  up: false,
  left: false,
  down: false,
  right: false
}

export function useCursor ({ borderWidth, borderSpacing }: HookProps) {
  const [cursorStyles, setCursorStyles] = useState(defaultStyles)
  const [cursorPosition, setCursorPosition] = useState(defaultPosition)
  const [cursorDirection, setCursorDirection] = useState(defaultDirection)
  const [lastKeyAction, setLastKeyAction] = useState<KeyAction>()
  const [directions, setDirections] = useState<Directions>(defaultDirections)

  function handleKeyDown (event: KeyboardEvent) {
    if (!validKeys.some(({ key }) => key === event.key)) return
    console.log('key pressed')
    setLastKeyAction({ action: 'press', key: event.key })
  }

  function handleKeyUp (event: KeyboardEvent) {
    if (!validKeys.some(({ key }) => key === event.key)) return
    console.log('key released')
    setLastKeyAction({ action: 'release', key: event.key })
  }

  function getBoxByPosition ({ x, y }: Point) {
    const id = map?.[y]?.[x]
    const box = document.querySelector(`[data-id='${id}']`)
    return box
  }

  function getPositionPlusDirection (position: Point, direction: Point) {
    return {
      x: position.x + direction.x,
      y: position.y + direction.y
    }
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

  useEffect(() => {
    // Actualizar la dirección
    const newDirections = {...directions}
    const direction = validKeys.find(({ key }) => key === lastKeyAction?.key)?.direction

    if (!direction) return

    newDirections[direction] = lastKeyAction?.action === 'press'

    setDirections(newDirections)
  }, [lastKeyAction])

  useEffect(() => {
    // Esto es para actualizar cursorDirection
    let verticalDirection = 0
    let horizontalDirection = 0

    if (directions.up) verticalDirection--
    if (directions.left) horizontalDirection--
    if (directions.down) verticalDirection++
    if (directions.right) horizontalDirection++
        
    const x = limitNumber(horizontalDirection) as DirectionAsPoint['x'] || 0
    const y = limitNumber(verticalDirection) as DirectionAsPoint['y'] || 0
    
    setCursorDirection({ ...cursorDirection, x, y })
  }, [directions])
  
  
  useEffect(() => {
    // Mover el cursor
    const sum = getPositionPlusDirection(cursorPosition, cursorDirection)
    const newBox = getBoxByPosition(sum)

    // Si no existe "uy, quieto"
    if (!newBox || !(newBox instanceof HTMLElement)) return
    
    // Si sí, entonces mover
    setCursorPosition(sum)
    updateCursorStyles(newBox)
  }, [cursorDirection])

  return {
    cursorStyles
  }
}
