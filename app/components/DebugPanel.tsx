import { useEffect, useState } from 'react'
import { useCursorStore } from '~/stores/useCursorStore'

export function DebugPanel () {
  const [isDebugPanelVisible, setIsDebugPanelVisible] = useState(false)
  const selectedBoxId = useCursorStore((state) => state.selectedBoxId)
  
  function handleKeyDown (event: KeyboardEvent) {
    const { key, shiftKey } = event
    if (key.toLowerCase() !== 'd' || !shiftKey) return

    setIsDebugPanelVisible((prevState) => !prevState)
  }
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  
  return (
    <section
      id='debugPanel'
      className='fixed left-0 top-0 z-10 h-full w-78 pointer-events-none bg-black/50'
      hidden={!isDebugPanelVisible}
    >
      <span>selectedBoxId: {selectedBoxId}</span>
    </section>
  )
}
