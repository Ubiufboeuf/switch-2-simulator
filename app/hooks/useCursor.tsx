import { useEffect, useState, type CSSProperties } from 'react'
import { convertCSSUnitToNumber, getPositionInCamera } from '~/lib/utils'
import { useCursorStore } from '~/stores/useCursorStore'
import { useDebugStore } from '~/stores/useDebugData'
import { useMapStore } from '~/stores/useMapStore'
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

type KeyAction = {
  action: 'press' | 'release'
  key: string
}

export function useCursor ({ borderSpacing, borderWidth }: CursorHookProps) {
  const toggleIsPanelVisible = useDebugStore((state) => state.toggleIsPanelVisible)
  const setDebugData = useDebugStore((state) => state.setDebugData)
  const boxId = useCursorStore((state) => state.boxId)
  const setBoxId = useCursorStore((state) => state.setBoxId)
  const boxElement = useCursorStore((state) => state.boxElement)
  const setBoxElement = useCursorStore((state) => state.setBoxElement)
  const cursor = useCursorStore((state) => state.cursor)
  const initCursor = useCursorStore((state) => state.initCursor)
  const direction = useCursorStore((state) => state.direction)
  const setDirection = useCursorStore((state) => state.setDirection)
  const cursorPosition = useCursorStore((state) => state.virtualPosition)
  const setCursorPosition = useCursorStore((state) => state.setVirtualPosition)
  const setCursorAnimation = useCursorStore((state) => state.setCursorAnimation)
  const revertCursorMovement = useCursorStore((state) => state.revertCursorMovement)
  const addCursorPosition = useCursorStore((state) => state.addVirtualPosition)
  const changeDirection = useCursorStore((state) => state.changeDirection)
  const initialCursorPosition = useMapStore((state) => state.initialCursorPosition)
  const getBoxByPosition = useMapStore((state) => state.getBoxByPosition)
  const [elementStyles, setElementStyles] = useState<CSSProperties | undefined>()
  const [elementDimensions, setElementDimensions] = useState<Partial<DOMRect> | null>(null)
  const [borderStyles, setBorderStyles] = useState<CSSProperties | undefined>()
  const [lastKeyAction, setLastKeyAction] = useState<KeyAction>()

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
    if (!cursor?.controller.keyboard.some(({ key }) => key === event.key)) return
    setLastKeyAction({ action: 'press', key: event.key })
  }

  function handleKeyUp (event: KeyboardEvent) {
    if (!cursor?.controller.keyboard.some(({ key }) => key === event.key)) return
    setLastKeyAction({ action: 'release', key: event.key })
  }

  async function handleKeyPressed (lastKey: string) {
    if (!cursor) return

    const controllerKeyboard = cursor.controller.keyboard

    if (!controllerKeyboard.some(({ key }) => key === lastKey)) return
    
    let directionAsPoint: DirectionAsPoint = {}
    for (const { key, direction } of controllerKeyboard) {
      if (key !== lastKey) continue
      directionAsPoint = changeDirection('press', direction)
    }

    setDirection({
      ...direction,
      ...directionAsPoint
    })

    // console.log('cursorPosition', cursorPosition, 'direction', direction)
    // const newElement = map[]
  }

  function handleKeyReleased (lastKey: string) {
    if (!cursor) return
    const controllerKeyboard = cursor.controller.keyboard

    let directionAsPoint: DirectionAsPoint = {}
    for (const { key, direction } of controllerKeyboard) {
      if (key !== lastKey) continue
      directionAsPoint = changeDirection('release', direction)
    }
    setDirection({
      ...direction,
      ...directionAsPoint
    })
  }

  function tryMoveCursor () {
    if (lastKeyAction?.action === 'release') {
      setElementStyles({ ...elementStyles, transform: 'translate(0px, 0px)' })
      return
    }
    
    let x = movement[`${direction.x}` as keyof typeof movement]
    let y = movement[`${direction.y}` as keyof typeof movement]

    // Esto es para limitar la distancia que se mueve en diagonal,
    // acercando el movimiento más a el de uno circular
    if (x !== 0 && y !== 0) {
      x *= Math.sin(45 * Math.PI / 180)
      y *= Math.sin(45 * Math.PI / 180)
    }

    setElementStyles({ ...elementStyles, transform: `translate(${x}px, ${y}px)`, transition: 'all 200ms ease' })
  }

  useEffect(() => {
    if (!lastKeyAction) return
    if (lastKeyAction.action === 'press')
      handleKeyPressed(lastKeyAction.key)
    else {
      handleKeyReleased(lastKeyAction.key)
      tryMoveCursor() // Esto es para reestablecer la "animación"
    }
  }, [lastKeyAction, cursor])

  useEffect(() => {
    addCursorPosition(direction)
  }, [direction])
  
  useEffect(() => {
    const newBox = getBoxByPosition(cursorPosition)
    // console.log('newBox', newBox)
    if (!newBox) {
      revertCursorMovement()
      tryMoveCursor()
      return
    }

    setBoxId(newBox.id)
  }, [cursorPosition, boxElement, lastKeyAction])
  
  useEffect(() => {
    if (!initialCursorPosition) return
    initCursor(initialCursorPosition)
  }, [initialCursorPosition])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [cursor])
  
  useEffect(() => {
    if (!boxId) return

    const prevFocusBoxElement = document.querySelector('[data-box-is-focus]') as BoxElement | undefined
    const boxElement = document.querySelector(`[data-box-id=${boxId}]`) as BoxElement
    if (!boxElement) return

    setBoxElement(boxElement)
    // console.log({boxElement, prevFocusBoxElement})

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
