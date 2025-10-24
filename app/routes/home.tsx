import { title } from '~/lib/utils'
import type { Route } from './+types/home'
import { useEffect, useRef } from 'react'

export function meta ({}: Route.MetaArgs) {
  return [
    { title },
    { name: 'description', content: 'Página de inicio' }
  ]
}

export default function Home () {
  const cameraRef = useRef<HTMLElement>(null)

  async function loadMap () {
    // const map = new FocusMap()
  }
  
  function loadSectionProfiles () {
    // VirtualSectionProfiles
    // VisualSectionProfiles
    
  }
  
  useEffect(() => { (async () => {
    await loadMap()
    loadSectionProfiles()
    // loadSectionTopInfo()
    // loadSectionGames()
    // loadSectionNavigation()
    // loadSectionControls()
    // loadSectionButtons()
  })() }, [])
  
  return (
    <main
      ref={cameraRef}
      id='camera'
      className='absolute z-1 w-[52.75vw] aspect-[16/10] mr-[0.5vw] mt-[2vh] flex items-center justify-center bg-[#1A1A1A] [&>*]:animate-fade-in [&>*]:animate-delay-300 [&>*]:animate-duration-200'
    >
      <div className='absolute'>
        <img src='/switchui/images/home-semi-loaded.png' />
      </div>
    </main>
  )
}
