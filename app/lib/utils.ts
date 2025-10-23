import { BASE_TITLE } from './constants'

export function title (title: string = '') {
  return title ? `${title} - ${BASE_TITLE}` : BASE_TITLE
}
