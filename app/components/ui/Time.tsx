import { useEffect, useState } from 'react'
import { Temporal } from 'temporal-polyfill'

export function Time () {
  const [time, setTime] = useState('--:--')

  function updateTime () {
    const instant =  Temporal.Now.instant()
    const zdt = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId())
    const time = `${zdt.hour}:${zdt.minute}`
    setTime(time)
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
    <div className='fixed z-[99999] top-0 right-0 bg-black text-white p-1 px-2 flex'>{time}</div>
  )
}
