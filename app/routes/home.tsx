import { web_description, createWebTitle } from '~/lib/utils'
import type { Route } from './+types/home'
import { Profiles } from '~/components/home/Profiles'
import { useLoadMocks } from '~/hooks/useLoadMocks'
import { Games } from '~/components/home/Games'
import { StatusBar } from '~/components/home/StatusBar'

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
      <Profiles />
      <StatusBar />
      <Games />
    </>
  )
}
