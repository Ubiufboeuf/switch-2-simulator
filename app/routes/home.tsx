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
  const screenRef = useRef<HTMLElement>(null)

  async function loadBoxesMap () {
    // const map = new FocusMap()
  }
  
  function loadBoxProfiles () {
    
  }
  
  useEffect(() => { (async () => {
    await loadBoxesMap()
    loadBoxProfiles()
    // loadBoxTopInfo()
    // loadBoxGames()
    // loadBoxNavigation()
    // loadBoxControls()
    // loadBoxButtons()
  })() }, [])
  
  return (
    <main
      ref={screenRef}
      id='screen'
      className='absolute z-1 w-[52.75vw] aspect-[16/10] mr-[0.5vw] mt-[2vh] flex items-center justify-center bg-[#1A1A1A] [&>*]:animate-fade-in [&>*]:animate-delay-300 [&>*]:animate-duration-200'
    >
      <div className='absolute'>
        <img src='/switchui/images/home-semi-loaded.png' />
      </div>
    </main>
  )
}
