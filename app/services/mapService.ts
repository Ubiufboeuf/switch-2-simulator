import { ENDPOINTS } from '~/lib/endpoints'
import { isValidMap } from '~/lib/validations'
import { useMapStore } from '~/stores/useMapStore'
import type { Box } from '~/types/boxTypes'
import type { Map, MapItem } from '~/types/mapTypes'
import { createBox } from './boxService'
import { useCursorStore } from '~/stores/useCursorStore'
import { BOX, SECTION } from '~/lib/constants'

const listOfLoaders: Record<MapItem['type'], (item: MapItem) => void> = {
  'box': loadBox,
  'section': loadSection
}

export async function loadMap (pathname: string) {
  const state = useMapStore.getState()
  if (state.map) return

  const { setMap } = state

  let map: Map | undefined
  try {
    map = await fetchMap(pathname)
  } catch (err) {
    console.error('error cargando el mapa', err)
  }

  if (!map) return
  const mapToSet: Map = {
    id: map.id,
    items: []
  }
  setMap(mapToSet)

  for (const item of map.items) {
    const loadItem = listOfLoaders[item.type]
    loadItem(item)
  }
}

export async function fetchMap (pathname: string): Promise<Map | undefined> {
  const res = await fetch(ENDPOINTS.MAPS['home-map'])
  const map = await res.json()

  if (!isValidMap(map)) return

  return map
}

function loadBox (item: MapItem) {
  if (item.type !== BOX) return // type guard

  const box = createBox(item)
  addBoxToMap(box)
  if (box.selected) {
    const { setSelectedBox } = useCursorStore.getState()
    setSelectedBox(box.id)
  }
}

function loadSection (item: MapItem) {
  if (item.type !== SECTION) return
}

export function addBoxToMap (box: Box | undefined) {
  if (!box) return

  const { addItem } = useMapStore.getState()
  addItem(box)
}
