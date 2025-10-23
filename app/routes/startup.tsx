import { PROJECT_DESCRIPTION } from '~/lib/constants'
import type { Route } from './+types/startup'
import { title } from '~/lib/utils'

export function meta ({}: Route.MetaArgs) {
  return [
    { title },
    { name: 'description', content: PROJECT_DESCRIPTION }
  ]
}

export default function Startup () {
  return (
    'startup'
  )
}
