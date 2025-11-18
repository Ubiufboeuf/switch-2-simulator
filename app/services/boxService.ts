import type { Point } from '~/env'
import { BOX } from '~/lib/constants'
import { convertPointToDirection } from '~/lib/utils'
import { useCursorStore } from '~/stores/useCursorStore'
import { useMapStore } from '~/stores/useMapStore'
import type { Box, CreateBoxProps } from '~/types/boxTypes'
import type { MapItem } from '~/types/mapTypes'

export function createBox (props?: CreateBoxProps): Box {
  const box: Box = {
    id: props?.id ?? crypto.randomUUID(),
    type: BOX,
    selected: props?.selected,
    topology: props?.topology
  }
  
  return box
}

export function getSelectedBox (items: MapItem[] | undefined | null) {
  const box = items?.find((i) => i.type === BOX && i.selected)
  const element = document.querySelector(`[data-box-id="${box?.id}"]`) as HTMLElement | null
  return {
    box,
    element
  }
}

export function getBoxById (id: string | undefined) {
  const { items } = useMapStore.getState()
  return items?.find((i) => i.id === id)
}

export function findBoxToSelect ({ x, y }: Point) {
  const { selectedBoxId, setSelectedBox } = useCursorStore.getState()
  const { items } = useMapStore.getState()

  if (!selectedBoxId || !items) return

  const item = items.find((i) => i.id === selectedBoxId)
  if (item?.type !== BOX) return

  const direction = convertPointToDirection({ x, y })
  if (!direction) return
  
  const newBoxId = item.topology?.[direction]
  const newBox = getBoxById(newBoxId)
  if (!newBox) return
  
  setSelectedBox(newBox.id)
  
  return getSelectedBox(items)
}
