import type { Point } from '~/env'
import { BOX } from '~/lib/constants/constants'
import { convertPointToDirection } from '~/lib/utils'
import { useCursorStore } from '~/stores/useCursorStore'
import { useMapStore } from '~/stores/useMapStore'
import type { Box, CreateBoxProps } from '~/types/boxTypes'
import type { Section } from '~/types/sectionTypes'

export function createBox (props?: CreateBoxProps): Box {
  const box: Box = {
    id: props?.id ?? crypto.randomUUID(),
    type: BOX,
    selected: props?.selected,
    topology: props?.topology
  }
  
  return box
}

export function getSelectedBox (mapItems: Section[] | undefined | null) {
  let selectedBox
  for (const section of mapItems || []) {
    for (const box of section.items) {
      if (box.selected) selectedBox = box
    }
  }
  
  const element = document.querySelector(`[data-box-id="${selectedBox?.id}"]`) as HTMLElement | null
  return {
    box: selectedBox,
    element
  }
}

export function getBoxById (id: string | undefined) {
  const { items } = useMapStore.getState()
  for (const section of items || []) {
    for (const box of section.items) {
      if (box.id === id) return box
    }
  }
}

export function findBoxToSelect ({ x, y }: Point) {
  const { selectedBoxId, setSelectedBox } = useCursorStore.getState()
  const { items } = useMapStore.getState()

  if (!selectedBoxId || !items) return

  let selectedBox
  for (const section of items || []) {
    for (const box of section.items) {
      if (box.id === selectedBoxId) selectedBox = box
    }
  }

  const direction = convertPointToDirection({ x, y })
  if (!direction) return
  
  const newBoxId = selectedBox?.topology?.[direction]
  const newBox = getBoxById(newBoxId)
  if (!newBox) return
  
  setSelectedBox(newBox.id)
  
  return getSelectedBox(items)
}
