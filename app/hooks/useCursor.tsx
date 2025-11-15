import { useEffect, useState, type CSSProperties } from 'react'
import { Temporal } from 'temporal-polyfill'
import { calculateDirection, convertCSSUnitToNumber, getPositionInCamera } from '~/lib/utils'
import { findBoxToSelect, getSelectedBox } from '~/services/boxService'
import { useCursorStore } from '~/stores/useCursorStore'
import { useMapStore } from '~/stores/useMapStore'
import type { Directions } from '~/types/consoleTypes'
import type { CursorHookProps } from '~/types/cursorTypes'

const defaultStyles: CSSProperties = {
  height: 40,
  width: 40,
  borderRadius: 8
}

const defaultDirections: Directions = {
  up: 0,
  down: 0,
  left: 0,
  right: 0
}

export function useCursor ({ borderWidth, borderSpacing }: CursorHookProps) {
  const [cursorStyles, setCursorStyles] = useState(defaultStyles)
  const [borderStyles, setBorderStyles] = useState<CSSProperties | undefined>()
  const [directions, setDirections] = useState(defaultDirections)
  const [repeatTimerId, setRepeatTimerId] = useState<NodeJS.Timeout | null>(null)

  const cursor = useCursorStore((state) => state.cursor)
  const items = useMapStore((state) => state.items)

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
    setBorderStyles({ padding: borderWidth })
  }

  function loadInitialPosition () {
    const { element } = getSelectedBox(items)
    if (!element) return

    updateCursorStyles(element)
  }

  function handleKeyDown (event: KeyboardEvent) {
    if (event.repeat) return
    
    const key = cursor?.controller.keyboard?.find(({ key }) => key === event.key)
    if (!key) return

    // Conseguir dirección
    const direction = key.direction

    // Actualizar direcciones
    setDirections((prev) => ({
      ...prev,
      [direction]: Temporal.Now.instant().epochMilliseconds
    }))
  }

  function handleKeyUp (event: KeyboardEvent) {
    const key = cursor?.controller.keyboard?.find(({ key }) => key === event.key)
    if (!key) return

    // Conseguir dirección
    const direction = key.direction

    // Reiniciar timestamp
    setDirections((prev) => ({
      ...prev,
      [direction]: 0
    }))
  }

  function moveCursor () {
    // Calcular la dirección de movimiento
    const { x, y } = calculateDirection(directions)

    // Mover solo si hay movimiento
    if (x === 0 && y === 0) return

    // Mover cursor
    const newBox = findBoxToSelect({ x, y })
    
    if (!newBox?.element) return
    
    // Actualizar posición y estilos solo si existe la caja
    updateCursorStyles(newBox.element)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [cursor])

  useEffect(() => {
    // Lógica para repetir el movimiento mientras hayan teclas presionadas
    // Solo debe ejecutarse cuando el estado LTV cambia (o sea, alguna tecla se presiona y suelta)

    // Limpiar intervalo para evitar más de un intervalo
    if (repeatTimerId) {
      clearInterval(repeatTimerId)
      setRepeatTimerId(null)
    }

    const { x, y } = calculateDirection(directions)
    if (x !== 0 || y !== 0) {
      moveCursor()

      const timer = setInterval(() => {
        moveCursor()
      }, 300)

      setRepeatTimerId(timer)
    }

    return () => {
      // Limpiar intervalo para evitar más de un intervalo
      // Tanto esta como la anterior limpieza son importantes como están ahora
      if (repeatTimerId) {
        clearInterval(repeatTimerId)
      }
    }
  }, [directions])
  
  useEffect(() => {
    loadInitialPosition()
  }, [items])
  
  return {
    cursorStyles,
    borderStyles
  }
}
