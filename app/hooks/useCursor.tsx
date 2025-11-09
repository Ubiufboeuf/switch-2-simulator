import { useEffect, useState, type CSSProperties } from 'react'
import { Temporal } from 'temporal-polyfill'
import type { LtvDirections, Point, ValidKeys } from '~/env'
import { calculateDirection, convertCSSUnitToNumber, getPositionInCamera, getPositionPlusDirection } from '~/lib/utils'
import { HomeMap as map } from '~/lib/maps/home'

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

const initialPosition = {
  x: 0,
  y: 0
}

const defaultStyles: CSSProperties = {
  height: 0,
  width: 0,
  borderRadius: 8
}

// ltv: Lógica de última Tecla Válida

const defaultLtvDirections: LtvDirections = {
  up: 0,
  down: 0,
  left: 0,
  right: 0
}

export function useCursor ({ borderWidth, borderSpacing }: HookProps) {
  const [cursorPosition, setCursorPosition] = useState(initialPosition)
  const [cursorStyles, setCursorStyles] = useState(defaultStyles)
  const [ltvDirections, setLtvDirections] = useState(defaultLtvDirections)
  const [repeatTimer, setRepeatTimer] = useState<NodeJS.Timeout | null>(null)

  function handleKeyDown (event: KeyboardEvent) {
    if (!validKeys.some(({ key }) => key === event.key)) return

    // Conseguir dirección
    const direction = validKeys.find(({ key }) => key === event.key)!.direction
    
    // Si la dirección está presionada, ignorar
    if (ltvDirections[direction] !== 0) return

    // Actualizar estado ltv
    setLtvDirections((prev) => ({
      ...prev,
      [direction]: Temporal.Now.instant().epochMilliseconds
    }))

    // // Mover cursor inmediatamente
    // moveCursor()
  }

  function handleKeyUp (event: KeyboardEvent) {
    if (!validKeys.some(({ key }) => key === event.key)) return

    // Conseguir dirección
    const direction = validKeys.find(({ key }) => key === event.key)!.direction

    // Reiniciar timestamp
    setLtvDirections((prev) => ({
      ...prev,
      [direction]: 0
    }))
  }

  function moveCursor () {
    // Calcular la dirección de movimiento
    const { x, y } = calculateDirection(ltvDirections)

    // Mover solo si hay movimiento
    if (x === 0 && y === 0) return

    // Mover cursor
    const sum = getPositionPlusDirection(cursorPosition, { x, y })
    const newBox = getBoxByPosition(sum)

    if (!(newBox instanceof HTMLElement)) return
    
    // Actualizar posición y estilos solo si existe la caja
    setCursorPosition(sum)
    updateCursorStyles(newBox)
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
    const sum = getPositionPlusDirection(cursorPosition, initialPosition)
    const newBox = getBoxByPosition(sum)

    if (!(newBox instanceof HTMLElement)) return
    
    // Actualizar posición y estilos solo si existe la caja
    setCursorPosition(sum)
    updateCursorStyles(newBox)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    // Lógica para repetir el movimiento mientras hayan teclas presionadas
    // Solo debe ejecutarse cuando el estado LTV cambia (o sea, alguna tecla se presiona y suelta)

    // Limpiar intervalo para evitar más de un intervalo
    if (repeatTimer) {
      clearInterval(repeatTimer)
      setRepeatTimer(null)
    }

    const { x, y } = calculateDirection(ltvDirections)
    if (x !== 0 || y !== 0) {
      moveCursor()

      const timer = setInterval(() => {
        moveCursor()
      }, 120)

      setRepeatTimer(timer)
    }

    return () => {
      // Limpiar intervalo para evitar más de un intervalo
      // Tanto esta como la anterior limpieza son importantes como están ahora
      if (repeatTimer) {
        clearInterval(repeatTimer)
      }
    }
  }, [ltvDirections])

  return {
    cursorStyles
  }
}
