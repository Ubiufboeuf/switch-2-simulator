type HookProps = {
  borderSpacing: number
  borderWidth: number
}

export function useCursor ({ borderWidth, borderSpacing }: HookProps) {
  return {
    cursorStyles: {}
  }
}
