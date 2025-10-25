import { useEffect, useState, type CSSProperties } from 'react'
import { getPositionInCamera } from '~/lib/utils'
import { useCursorStore } from '~/stores/useCursorStore'
import type { BoxElement } from '~/types/ui'

export function useCursor () {
  const boxId = useCursorStore((state) => state.boxId)
  const [elementStyles, setElementStyles] = useState<CSSProperties | undefined>()
  const [elementDimensions, setElementDimensions] = useState<Partial<DOMRect> | null>(null)

  function loadElementStyles (boxElement: BoxElement, boxType: 'game') {
    const rect = boxElement.getBoundingClientRect()
    
    setElementDimensions({
      left: getPositionInCamera('left', rect.left),
      top: getPositionInCamera('top', rect.top),
      height: rect.height,
      width: rect.width
    })

    const styles: CSSProperties = { zIndex: 1 }
    if (boxType === 'game') {
      const styleMap = boxElement.children[0].computedStyleMap()
      styles.borderRadius = styleMap.get('border-radius')?.toString() || styles.borderRadius
    }

    setElementStyles(styles)
  }
  
  useEffect(() => {
    if (!boxId) return

    const boxElement = document.querySelector(`[data-box-id=${boxId}]`) as BoxElement
    if (!boxElement) return

    loadElementStyles(boxElement, 'game')
  }, [boxId])

  return {
    styles: elementStyles,
    dimensions: elementDimensions
  }
}
