import { useEffect } from 'react'
import { useDebugStore } from '~/stores/useDebugData'

export function DebugPanel () {
  const isPanelVisible = useDebugStore((state) => state.isPanelVisible)
  const debugData = useDebugStore((state) => state.debugData)

  useEffect(() => {
    console.log(isPanelVisible)
  }, [isPanelVisible])

  return (
    <dialog
      className='absolute left-auto right-0 top-0 z-[999] h-120 w-80 flex flex-col gap-2 bg-neutral-950 transition-all p-4'
      hidden={!isPanelVisible}
    >
      <h1 className='text-center font-bold text-lg'>Debug Panel</h1>
      { Object.entries(debugData).map(([key, value]) => (
        <div key={`debug-panel-${key}-${value}`}>
          <span>{key}:</span>
          <span>{`${value}`}</span>
        </div>
      )) }
    </dialog>
  )
}
