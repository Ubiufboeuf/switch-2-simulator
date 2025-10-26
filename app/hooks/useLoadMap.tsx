import { useEffect } from 'react'
import type { MapPreset } from '~/types/mapPresets'

export function useLoadMap (name: 'home') {  
  async function loadMap () {
    let mapJson
    try {
      mapJson = await fetchMap(name)
    } catch (err) {
      console.error(err)
    }

    if (!mapJson) return

    // ...
  }

  async function fetchMap (slug: string): Promise<MapPreset> {
    return fetch(`/app/lib/maps/${slug}.json`)
      .catch(() => {
        throw new Error('Error haciendo la petición del mapa')
      })
      .then((res) => res.json())
      .catch(() => {
        throw new Error('Error parseando el json del mapa')
      })
      .then((data) => data)
  }
  
  useEffect(() => {
    loadMap()
  }, [])
}
