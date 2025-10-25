import { useEffect } from 'react'
import { useAudioStore } from '~/stores/useAudioStore'

export function useAudio () {
  const { audio, setAudio } = useAudioStore((state) => state)

  useEffect(() => {
    if (!audio) {
      setAudio(new Audio())
    }
  }, [audio])
}
