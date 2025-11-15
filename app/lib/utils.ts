import type { Direction, LtvDirections, Point } from '~/env'
import { BASE_TITLE, WEB_DESCRIPTION } from './project_constants'

export function createWebTitle (title: string = '') {
  return title ? `${title} - ${BASE_TITLE}` : BASE_TITLE
}

export function createWebDescription (description: string = '') {
  return description ? `${description} - ${WEB_DESCRIPTION}` : WEB_DESCRIPTION
}

export const web_title = { title: createWebTitle() }
export const web_description = { name: 'description', description: createWebDescription() }

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

export function calculateDirection ({ down, left, right, up }: LtvDirections): Point {
  let verticalDirection = 0
  let horizontalDirection = 0

  // LTV: Encuentra el más reciente de cada eje (timestamp más alto)
  const lastVertical = Math.max(up, down)
  const lastHorizontal = Math.max(left, right)

  // Prioridad horizontal
  if (down === lastVertical && down !== 0) {
    verticalDirection = 1
  } else if (up === lastVertical && up !== 0) {
    verticalDirection = -1
  }

  // Prioridad horizontal
  if (right === lastHorizontal && right !== 0) {
    horizontalDirection = 1
  } else if (left === lastHorizontal && left !== 0) {
    horizontalDirection = -1
  }

  // Eliminar movimiento diagonal
  if (horizontalDirection !== 0 && verticalDirection !== 0) {
    // Con esto se prioriza, en un caso MUY improbable, el movimiento horizontal
    if (lastHorizontal >= lastVertical) verticalDirection = 0
    else horizontalDirection = 0
  }

  // Al final queda (0, 0), (±1, 0), o (0, ±1) // El ± es u00b1
  return {
    x: horizontalDirection,
    y: verticalDirection
  }
}

export function getPositionPlusDirection (position: Point, direction: Point) {
  return {
    x: position.x + direction.x,
    y: position.y + direction.y
  }
}

export function convertPointToDirection ({ x, y }: Point): Direction | undefined {
  if (x > 0) return 'right'
  if (x < 0) return 'left'
  if (y > 0) return 'down'
  if (y < 0) return 'up'
}
