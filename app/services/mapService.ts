import { useMapStore } from '~/stores/useMapStore'
import type { Box } from '~/types/boxTypes'
import type { Map } from '~/types/mapTypes'

export function useLoadMap (pathname: string) {
  const { map, setMap } = useMapStore.getState()
  if (map) return

  const newMap = loadMap(pathname)
  if (!newMap) return
  
  setMap(newMap)
}

export function loadMap (pathname: string): Map {
  console.log('loadMap', pathname)
  const map: Map = {
    id: 'map-1'
  }

  return map
}

export function addBoxToMap (box: Box | undefined) {
  if (!box) return

  const { map } = useMapStore.getState()
  console.log(map, box)
}
