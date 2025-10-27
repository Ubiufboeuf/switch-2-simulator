import { useEffect } from 'react'
import { useMapStore } from '~/stores/useMapStore'
import type { MapPreset } from '~/types/mapPresets'

export function useLoadMap (name: 'home') {  
  const map = useMapStore((state) => state.map)
  const createMap = useMapStore((state) => state.createMap)
  const addItem = useMapStore((state) => state.addItem)
  
  async function loadMap () {
    let preset
    try {
      preset = await fetchMap(name)
    } catch (err) {
      console.error(err)
    }

    if (!preset) return

    createMap(preset.id)

    for (const section of preset.items) {
      addItem(section)
    }
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
