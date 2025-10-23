import type { Route } from './+types/startup'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: '' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export default function Startup () {
  return (
    'startup'
  )
}
