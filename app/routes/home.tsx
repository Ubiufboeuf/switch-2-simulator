import { title } from '~/lib/utils'
import type { Route } from './+types/home'
import { useEffect, useRef } from 'react'
import { SectionProfiles } from '~/compontents/home/SectionProfiles'
import { SectionTopInfo } from '~/compontents/home/SectionTopInfo'
import { SectionGames } from '~/compontents/home/SectionGames'
import { SectionNavigation } from '~/compontents/home/SectionNavigation'
import { SectionControls } from '~/compontents/home/SectionControls'
import { SectionButtons } from '~/compontents/home/SectionButtons'
import { Cursor } from '~/compontents/Cursor'
import { useSimulatorStore } from '~/stores/useSimulatorStore'
import { useLoadMap } from '~/hooks/useLoadMap'

export function meta ({}: Route.MetaArgs) {
  return [
    { title },
    { name: 'description', content: 'Página de inicio' }
  ]
}

export default function Home () {
  useLoadMap('home')

  const cameraRef = useRef<HTMLElement>(null)
  const setCamera = useSimulatorStore((state) => state.setCamera)

  useEffect(() => {
    if (cameraRef.current) {
      setCamera(cameraRef.current)
    }
  }, [])
  
  return (
    <main
      ref={cameraRef}
      id='camera'
      className='absolute left-[317px] top-[56px] z-1 w-181 h-[450.5px] flex items-center justify-center overflow-hidden bg-[#1A1A1A] [&>*]:animate-fade-in [&>*]:animate-delay-300 [&>*]:animate-duration-200'
    >
      <div className='absolute -z-1'>
        <img src='/switchui/images/home-load-finished.png' className='opacity-20' />
      </div>
      <Cursor />
      <SectionProfiles />
      <SectionTopInfo />
      <SectionGames />
      <SectionNavigation />
      <SectionControls />
      <SectionButtons />
    </main>
  )
}
