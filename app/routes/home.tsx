import { title } from '~/lib/utils'
import type { Route } from './+types/home'

export function meta ({}: Route.MetaArgs) {
  return [
    { title },
    { name: 'description', content: 'Página de inicio' }
  ]
}

export default function Home () {
  return (
    <main id='screen' className='absolute z-1 w-[52.75vw] aspect-[16/10] mr-[0.5vw] mt-[2vh] flex items-center justify-center bg-black'>
      <section className='h-full w-full flex items-center justify-center bg-[#1A1A1A]'>
        
      </section>
    </main>
  )
}
