import { useNetworkRtt } from '~/hooks/useNetworkRtt'
import { IconWifi } from '../images/Icons'
import { Icon } from '../images/Icon'

// Sé que es WiFi, pero me cuesta escribir la segunda mayúscula rápido
export function Wifi () {
  const rtt = useNetworkRtt()

  console.log(rtt)
  
  return (
    <article
      className='absolute left-[59.5px] w-[21.5px] h-[14px] flex flex-col items-center justify-center overflow-visible'
    >
      <Icon>
        <IconWifi level={rtt} />
      </Icon>
    </article>
  )
}
