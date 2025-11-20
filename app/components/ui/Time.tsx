import { useEffect, useState } from 'react'
import { Temporal } from 'temporal-polyfill'
import { parseTimestamp } from '~/lib/utils'
import type { TimeFormat, TimeSystem } from '~/types/uiTypes'

export function Time () {
  const [time, setTime] = useState<string>('--:--')
  const [format, setFormat] = useState<TimeFormat>('12 hrs')
  const [timeSystem, setTimeSystem] = useState<TimeSystem>(null)

  function updateTime () {
    const instant =  Temporal.Now.instant()
    const { time, format, timeSystem } = parseTimestamp(instant.epochMilliseconds, { format: '12 hrs', output: 'h:mm' })
    setTime(time)
    setFormat(format)
    setTimeSystem(timeSystem)
  }

  useEffect(() => {
    updateTime()
    
    const id = setInterval(() => {
      updateTime()
    }, 60 * 1000)

    return () => {
      clearInterval(id)
    }
  }, [])
  
  return (
    <article className='flex items-center gap-[3px]'>
      <span className='tracking-tight'>
        {time}
      </span>
      <span
        className='text-xs pt-[2px]'
        hidden={format === '24 hrs'}
      >
        {timeSystem}
      </span>
    </article>
  )
}
