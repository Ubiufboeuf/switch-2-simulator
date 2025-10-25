import { BASE_TITLE } from './constants/project'

export function handleTitle (title: string = '') {
  return title ? `${title} - ${BASE_TITLE}` : BASE_TITLE
}

export const title = handleTitle()

export function getPositionInCamera (coordAxis: 'left' | 'top' = 'left', position: number) {
  if (!document || !window) return position
  const camera = document.querySelector('#camera')
  const cameraRect = camera?.getBoundingClientRect()

  if (!cameraRect) return position
  
  if (coordAxis === 'left') return position - cameraRect.left
  if (coordAxis === 'top') return position - cameraRect.top

  return position
}
