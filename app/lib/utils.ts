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

export function convertCSSUnitToNumber (unit: string | CSSStyleValue | undefined) {
  if (!unit) return 0

  const unitAsString = unit.toString()
  let numberAsString = ''

  for (const letter of unitAsString.split('')) {
    if (Number(letter) || Number(letter) === 0) {
      numberAsString = numberAsString.concat(letter)
    }
  }
  
  return Number(numberAsString) || 0
}

export function limitNumber (num: number = 0, min: number = -1, max: number = 1) {
  let n = num
  n = Math.min(max, num)
  n = Math.max(min, n)
  return n
}
