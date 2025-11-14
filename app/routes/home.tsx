import { web_description, createWebTitle } from '~/lib/utils'
import type { Route } from './+types/home'
import { SectionProfiles } from '~/components/home/SectionProfiles'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: createWebTitle('Página de inicio') },
    web_description
  ]
}

export default function Home () {
  return (
    <>
      <SectionProfiles />
    </>
  )
}
