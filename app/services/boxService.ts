import type { Box, CreateBoxProps } from '~/types/boxTypes'

export function createBox (props?: CreateBoxProps): Box {
  const box: Box = {
    id: props?.id ?? crypto.randomUUID(),
    selected: props?.selected,
    topology: props?.topology
  }
  
  return box
}
