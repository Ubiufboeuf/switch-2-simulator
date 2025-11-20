import { ENDPOINTS } from '~/lib/constants/endpoints'
import { isValidMap } from '~/lib/validations'
import { useMapStore } from '~/stores/useMapStore'
import type { Box } from '~/types/boxTypes'
import type { Map } from '~/types/mapTypes'
import { createBox } from './boxService'
import { useCursorStore } from '~/stores/useCursorStore'
import type { Section } from '~/types/sectionTypes'
import { useSectionStore } from '~/stores/useSectionStore'

export async function loadMap (pathname: string) {
  const state = useMapStore.getState()

  const { setMap } = state

  let map: Map | undefined
  try {
    map = await fetchMap(pathname)
  } catch (err) {
    console.error('error cargando el mapa', err)
  }

  if (!map) return
  const newMap: Map = {
    id: map.id,
    items: []
  }
  setMap(newMap)

  for (const section of map.items) {
    loadSection(section)
  }
}

export async function fetchMap (pathname: string): Promise<Map | undefined> {
  const res = await fetch(ENDPOINTS.SCHEMES.HOME)
  const map = await res.json()

  if (!isValidMap(map)) return

  return map
}

function loadBox (item: Box, section: Section) {
  console.log('loadBox', item)

  const box = createBox(item)
  addBoxToSection(box, section)

  if (box.selected) {
    const { setSelectedBox } = useCursorStore.getState()
    setSelectedBox(box.id)
  }
}

function loadSection (section: Section) {
  console.log('loadSection', section)

  addSectionToMap(section)

  for (const box of section.items) {
    loadBox(box, section)
  }
}

export function addSectionToMap (section: Section) {
  if (!section) return

  const { addItem } = useMapStore.getState()
  addItem(section)
}

export function addBoxToSection (box: Box, section: Section) {
  if (!box || !section) return

  const { addBox } = useSectionStore.getState()
  addBox(box, section)
}
