import { useEffect, useState, type ReactNode } from 'react'
import { useCursorStore } from '~/stores/useCursorStore'
import { useDebugStore } from '~/stores/useDebugData'

export function DebugPanel () {
  const isPanelVisible = useDebugStore((state) => state.isPanelVisible)
  const direction = useCursorStore((state) => state.direction)
  const virtualPosition = useCursorStore((state) => state.virtualPosition)
  const [debugData, setDebugData] = useState<{ [key: string]: ReactNode }[]>([])

  useEffect(() => {
    setDebugData([
      {
        direction_x: direction.x,
        direction_y: direction.y
      },
      {
        position_x: virtualPosition.x,
        position_y: virtualPosition.y
      }
    ])
  }, [direction, virtualPosition])

  return (
    <dialog
      className='absolute left-auto right-0 top-0 z-[999] h-120 w-80 flex flex-col gap-2 bg-neutral-950 transition-all p-4 outline-0'
      hidden={!isPanelVisible}
    >
      <h1 className='text-center font-bold text-lg'>Debug Panel</h1>
      {
        debugData.map((part) => {
          return Object.entries(part).map(([key, value]) => {
            return <p key={`debug-data-${key}-${value}`}>{`${key}: ${value}`}</p>
          })
        })
      }
    </dialog>
  )
}
