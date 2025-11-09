import { web_description, createWebTitle } from '~/lib/utils'
import type { Route } from './+types/home'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: createWebTitle('Página de inicio') },
    web_description
  ]
}

export default function Home () {
  return (
    'home'
  )
}
