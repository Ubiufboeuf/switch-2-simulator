import { useEffect } from 'react'
import { useAudioStore } from '~/stores/useAudioStore'

export function useAudioHook () {
  const { audio, setAudio } = useAudioStore((state) => state)

  useEffect(() => {
    if (!audio) {
      setAudio(new Audio())
    }
  }, [audio])
}
