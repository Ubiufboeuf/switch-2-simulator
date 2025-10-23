import { BASE_TITLE } from './constants'

export function handleTitle (title: string = '') {
  return title ? `${title} - ${BASE_TITLE}` : BASE_TITLE
}

export const title = handleTitle()
