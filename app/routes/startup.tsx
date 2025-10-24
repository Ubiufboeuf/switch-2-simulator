import { PROJECT_DESCRIPTION } from '~/lib/constants/project'
import type { Route } from './+types/startup'
import { title } from '~/lib/utils'
import { useSwitchStore } from '~/stores/useSwitchStore'
import { useEffect, useRef, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router'

export function meta ({}: Route.MetaArgs) {
  return [
    { title },
    { name: 'description', content: PROJECT_DESCRIPTION }
  ]
}

export default function Startup () {
  const navigate = useNavigate()
  
  const isConsoleOn = useSwitchStore((state) => state.isConsoleOn)
  const setIsConsoleOn = useSwitchStore((state) => state.setIsConsoleOn)
  
  const startupVideoRef = useRef<HTMLVideoElement | null>(null)

  function handleToggleConsoleState () {
    setIsConsoleOn(true)
  }

  function handleStartupVideoTimeUpdate (event: SyntheticEvent<HTMLVideoElement>) {
    const video = event.currentTarget
    const { currentTime } = video

    // TO REMOVE: Esto es para acelerar tiempos por ahora
    if (currentTime < 5) video.currentTime = 5
  }

  function handleStartupVideoEnded () {
    navigate('/home')
  }

  useEffect(() => {
    if (!isConsoleOn) return
    const startupVideo = startupVideoRef.current

    if (!startupVideo) return

    // Simular demora de encendido
    // setTimeout(() => {
      startupVideo.play()
    // }, 2000)
  }, [isConsoleOn])
  
  return (
    <main
      id='camera'
      className='absolute left-[317px] top-[56px] z-1 w-181 h-[450.5px] flex items-center justify-center bg-[#1A1A1A] [&>*]:animate-fade-in [&>*]:animate-delay-300 [&>*]:animate-duration-200'
    >
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
          src='/switchui/movies/startup-without-audio.mp4'
          className='object-cover w-full h-full'
          onTimeUpdate={handleStartupVideoTimeUpdate}
          onEnded={handleStartupVideoEnded}
        />
      </section>
    </main>
  )
}
