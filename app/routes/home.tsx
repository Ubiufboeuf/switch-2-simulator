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
    <>
      <div
        className='size-24 border-2 rounded-lg flex items-center justify-center not-[.selected]:backdrop-blur-[2px]'
        data-id={'box'}
      />
    </>
  )
}
