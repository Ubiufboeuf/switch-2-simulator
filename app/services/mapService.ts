import { ENDPOINTS } from '~/lib/endpoints'
import { isValidMap } from '~/lib/validations'
import { useMapStore } from '~/stores/useMapStore'
import type { Box } from '~/types/boxTypes'
import type { Map } from '~/types/mapTypes'
import { createBox } from './boxService'

export async function useLoadMap (pathname: string) {
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
  setMap(map)

  for (const item of map.items) {
    const box = createBox({ id: item.id })
    addBoxToMap(box)
  }
}

export async function fetchMap (pathname: string): Promise<Map | undefined> {
  const res = await fetch(ENDPOINTS.MAPS['home-map'])
  const map = await res.json()

  if (!isValidMap(map)) return

  return map
}

export function addBoxToMap (box: Box | undefined) {
  if (!box) return

  const { map } = useMapStore.getState()
  console.log(map, box)
}
