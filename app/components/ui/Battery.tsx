import { useEffect, useState } from 'react'

export function Battery () {
  // Guardamos el objeto manager por si lo necesitas para otras cosas (charging, etc)
  const [batteryLevel, setBatteryLevel] = useState(0)

  useEffect(() => {
    let activeBattery: BatteryManager | null = null
    let handleUpdate: (() => void) | null = null

    const init = async () => {
      if (!navigator.getBattery) return

      try {
        activeBattery = await navigator.getBattery()        
        handleUpdate = () => {
          if (activeBattery) {
            setBatteryLevel(Math.round(activeBattery.level * 100))
          }
        }

        handleUpdate()
        activeBattery.addEventListener('levelchange', handleUpdate)

      } catch (err) {
        console.error('Error manejando la batería:', err)
      }
    }

    init()

    // 4. Cleanup: Como 'handleUpdate' y 'activeBattery' son variables locales
    // de este efecto, la función de limpieza las recuerda perfectamente.
    return () => {
      if (activeBattery && handleUpdate) {
        activeBattery.removeEventListener('levelchange', handleUpdate)
      }
    }
  }, []) // Array vacío: esto solo corre una vez al montar
  
  return (
    <article className='flex items-center gap-[6.5px]'>
      {/* Número */}
      <div>
        <span className='tracking-tighter'>{batteryLevel}</span>
        <span className='text-[11px] font-bold'>%</span>
      </div>
      {/* Icono */}
      <div className='w-[21px]'></div>
    </article>
  )
}
