import { useEffect, useState, type CSSProperties } from 'react'
import { convertCSSUnitToNumber, getPositionInCamera, limitNumber } from '~/lib/utils'
import { useCursorStore } from '~/stores/useCursorStore'
import { useDebugStore } from '~/stores/useDebugData'
import type { BoxElement } from '~/types/ui'

type CursorHookProps = {
  borderSpacing: number
  borderWidth: number
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
    // const key = event.key as KeyboardMovementKeys
    // if (!(key in cursor.keyboard.directions)) return

    // const ckd = cursor.keyboard.directions[key]

    // const positiveDirection = {
    //   x: limitNumber(direction.x + (ckd.x || 0)),
    //   y: limitNumber(direction.y + (ckd.y || 0))
    // }

    // setDirection(positiveDirection)
  }

  function handleKeyUp (event: KeyboardEvent) {
    // const key = event.key as KeyboardMovementKeys
    // if (!(key in cursor.keyboard.directions)) return

    // const ckd = cursor.keyboard.directions[key]
    // const negativeDirection = {
    //   x: limitNumber(direction.x - (ckd.x || 0)),
    //   y: limitNumber(direction.y - (ckd.y || 0))
    // }

    // setDirection({ ...direction, ...negativeDirection })
  }

  useEffect(() => {
    if (direction) {
      setDebugData({...direction})
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

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
