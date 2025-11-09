import { web_description, handleWebTitle } from '~/lib/utils'
import type { Route } from './+types/home'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: handleWebTitle('Página de inicio') },
    web_description
  ]
}

export default function Home () {
  return (
    'home'
  )
}
