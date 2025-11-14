import { useEffect, useState, type CSSProperties } from 'react'
import { convertCSSUnitToNumber, getPositionInCamera } from '~/lib/utils'
import { useMapStore } from '~/stores/useMapStore'
import type { CursorHookProps } from '~/types/cursorTypes'

const defaultStyles: CSSProperties = {
  height: 40,
  width: 40,
  borderRadius: 8
}

export function useCursor ({ borderWidth, borderSpacing }: CursorHookProps) {
  const [cursorStyles, setCursorStyles] = useState(defaultStyles)
  const items = useMapStore((state) => state.items)

  function getSelectedBox () {
    const box = items?.find((i) => i.selected)
    const element = document.querySelector(`[data-box-id="${box?.id}"]`) as HTMLElement | null
    return {
      box,
      element
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

  function loadInitialPosition () {
    const { element } = getSelectedBox()
    if (!element) return

    updateCursorStyles(element)
  }
  
  useEffect(() => {
    console.log('effect', items)
    loadInitialPosition()
  }, [items])
  
  return {
    cursorStyles
  }
}
