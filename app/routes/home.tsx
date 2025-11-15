import { web_description, createWebTitle } from '~/lib/utils'
import type { Route } from './+types/home'
import { SectionProfiles } from '~/components/home/SectionProfiles'
import { useLoadMocks } from '~/hooks/useLoadMocks'
import { SectionGames } from '~/components/home/SectionGames'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: createWebTitle('Página de inicio') },
    web_description
  ]
}

export default function Home () {
  useLoadMocks()
  
  return (
    <>
      <SectionProfiles />
      <SectionGames />
    </>
  )
}
