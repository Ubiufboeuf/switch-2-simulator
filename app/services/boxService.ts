import type { Box, CreateBoxProps } from '~/types/boxTypes'

export function createBox (props?: CreateBoxProps): Box {
  const box: Box = {
    id: props?.id ?? crypto.randomUUID()
  }
  
  return box
}
