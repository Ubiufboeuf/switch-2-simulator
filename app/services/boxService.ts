import type { Point } from '~/env'
import { convertPointToDirection } from '~/lib/utils'
import { useCursorStore } from '~/stores/useCursorStore'
import { useMapStore } from '~/stores/useMapStore'
import type { Box, CreateBoxProps } from '~/types/boxTypes'
import type { Section } from '~/types/sectionTypes'
import { getSectionByBoxId, getSectionById } from './sectionService'

export function createBox (props?: CreateBoxProps): Box {
  const box: Box = {
    id: props?.id ?? crypto.randomUUID(),
    type: 'box',
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
  let newBox = getBoxById(newBoxId)

  // Si la caja no tiene topología, buscar por sección
  if (!newBox) {
    const section = getSectionByBoxId(selectedBoxId)
    const newSectionId = section?.topology?.[direction]
    if (!newSectionId) return

    const newSection = getSectionById(newSectionId)
    const box = getBoxById(newSection?.boxToReturn)
    if (box) newBox = box
  }
  
  if (!newBox) return

  setSelectedBox(newBox.id)

  return getSelectedBox(items)
}
