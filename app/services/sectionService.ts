import { useMapStore } from '~/stores/useMapStore'

export function getSectionById (id: string | undefined) {
  if (!id) return
  const { items } = useMapStore.getState()
  return items.find((section) => section.id === id)
}

export function getSectionByBoxId (id: string | undefined) {
  if (!id) return
  const { items } = useMapStore.getState()
  return items.find((section) => section.items.some((box) => box.id === id))
}
