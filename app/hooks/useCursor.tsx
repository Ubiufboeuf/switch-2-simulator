import { useEffect, useState, type CSSProperties } from 'react'
import { convertCSSUnitToNumber, getPositionInCamera } from '~/lib/utils'
import { useCursorStore } from '~/stores/useCursorStore'
import { useDebugStore } from '~/stores/useDebugData'
import type { BoxElement, DirectionAsPoint } from '~/types/ui'

type CursorHookProps = {
  borderSpacing: number
  borderWidth: number
}

const movement = {
  '-1': -10,
  '0': 0,
  '1': 10
}

export function useCursor ({ borderSpacing, borderWidth }: CursorHookProps) {
  const toggleIsPanelVisible = useDebugStore((state) => state.toggleIsPanelVisible)
  const setDebugData = useDebugStore((state) => state.setDebugData)
  const boxId = useCursorStore((state) => state.boxId)
  const cursor = useCursorStore((state) => state.cursor)
  const direction = useCursorStore((state) => state.direction)
  const setDirection = useCursorStore((state) => state.setDirection)
  const [elementStyles, setElementStyles] = useState<CSSProperties | undefined>()
  const [elementDimensions, setElementDimensions] = useState<Partial<DOMRect> | null>(null)
  const [borderStyles, setBorderStyles] = useState<CSSProperties | undefined>()

  function loadElementStyles (boxElement: BoxElement, boxType: 'game') {
    const rect = boxElement.getBoundingClientRect()
    
    setElementDimensions({
      left: getPositionInCamera('left', rect.left) - (borderWidth + borderSpacing),
      top: getPositionInCamera('top', rect.top) - (borderWidth + borderSpacing),
      height: rect.height + (borderWidth + borderSpacing) * 2,
      width: rect.width + (borderWidth + borderSpacing) * 2
    })

    const styles: CSSProperties = { zIndex: 1 }
    if (boxType === 'game') {
      const styleMap = boxElement.children[0].computedStyleMap()
      const borderRadius = convertCSSUnitToNumber(styleMap.get('border-radius')) + borderSpacing * 1.5
      styles.borderRadius = borderRadius
    }

    setElementStyles(styles)
    setBorderStyles({ padding: borderWidth })
  }

  function handleKeyDown (event: KeyboardEvent) {
    if (event.key === ' ') {
      toggleIsPanelVisible()
    }

    const controllerKeyboard = cursor.controller.keyboard

    let directionAsPoint: DirectionAsPoint = {}
    for (const { key, direction } of controllerKeyboard) {
      if (key !== event.key) continue
      directionAsPoint = cursor.changeDirection('press', direction)
    }

    setDirection({
      ...direction,
      ...directionAsPoint
    })
  }

  function handleKeyUp (event: KeyboardEvent) {
    const controllerKeyboard = cursor.controller.keyboard

    let directionAsPoint: DirectionAsPoint = {}
    for (const { key, direction } of controllerKeyboard) {
      if (key !== event.key) continue
      directionAsPoint = cursor.changeDirection('release', direction)
    }
    setDirection({
      ...direction,
      ...directionAsPoint
    })
  }

  useEffect(() => {
    if (direction) {
      setDebugData({...direction})
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    let left = movement[`${direction.x}` as keyof typeof movement]
    let top = movement[`${direction.y}` as keyof typeof movement]

    // Esto es para limitar la distancia que se mueve hacia la "hipotenusa",
    // acercando el movimiento más a el de uno circular
    if (left !== 0 && top !== 0) {
      left *= Math.sin(45 * Math.PI / 180)
      top *= Math.sin(45 * Math.PI / 180)
    }

    setElementDimensions({ ...elementDimensions, left, top })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [direction])
  
  useEffect(() => {
    if (!boxId) return

    const prevFocusBoxElement = document.querySelector('[data-box-is-focus]') as BoxElement | undefined
    const boxElement = document.querySelector(`[data-box-id=${boxId}]`) as BoxElement
    if (!boxElement) return

    prevFocusBoxElement?.removeAttribute('data-box-is-focus')
    boxElement.setAttribute('data-box-is-focus', '')

    loadElementStyles(boxElement, 'game')
  }, [boxId])

  return {
    styles: elementStyles,
    dimensions: elementDimensions,
    borderStyles: borderStyles
  }
}
