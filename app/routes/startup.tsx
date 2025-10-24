import { PROJECT_DESCRIPTION } from '~/lib/constants'
import type { Route } from './+types/startup'
import { title } from '~/lib/utils'
import { useSwitchStore } from '~/stores/useSwitchStore'
import { useEffect, useRef } from 'react'

export function meta ({}: Route.MetaArgs) {
  return [
    { title },
    { name: 'description', content: PROJECT_DESCRIPTION }
  ]
}

export default function Startup () {
  const isConsoleOn = useSwitchStore((state) => state.isConsoleOn)
  const setIsConsoleOn = useSwitchStore((state) => state.setIsConsoleOn)
  
  const startupVideoRef = useRef<HTMLVideoElement | null>(null)

  function handleToggleConsoleState () {
    setIsConsoleOn(true)
  }

  useEffect(() => {
    if (!isConsoleOn) return
    const startupVideo = startupVideoRef.current

    if (!startupVideo) return

    // Simular demora de encendido
    setTimeout(() => {
      startupVideo.play()
    }, 2000)
  }, [isConsoleOn])
  
  return (
    <main id='screen' className='absolute z-1 w-[52.75vw] aspect-[16/10] mr-[0.5vw] mt-[2vh] flex items-center justify-center bg-black'>
      <button
        className='absolute h-full w-full cursor-pointer outline-0 z-2'
        onClick={handleToggleConsoleState}
        hidden={isConsoleOn}
      >
        Toca la pantalla para encender la consola
      </button>
      <section className='h-full w-full flex items-center justify-center bg-[#1A1A1A]'>
        <video
          ref={startupVideoRef}
          src='/switchui/movies/intro-with-audio.mp4'
          className='object-contain'
        />
      </section>
    </main>
  )
}
