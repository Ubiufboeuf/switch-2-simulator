import type { Map } from '~/types/mapTypes'

export function isValidMap (map: Map): map is Map {
  return Boolean(
    map?.id
  )
}
