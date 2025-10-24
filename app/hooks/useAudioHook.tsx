import { useEffect, useRef } from 'react'

export function useAudioHook () {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio
  }, [])
}
