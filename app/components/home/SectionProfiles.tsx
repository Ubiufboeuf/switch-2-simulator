import { useEffect } from 'react'
import { Icon } from '../images/Icon'
import { useMapStore } from '~/stores/useMapStore'
import { Avatar } from '../images/Avatar'
import { useUserStore } from '~/stores/useUserStore'

export function SectionProfiles () {
  const map = useMapStore((state) => state.map)
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    if (!map) return

    // const section = map.items.find((s) => s.name === 'section-profiles')

    // if (!section) return
    // setProfiles(section.items)
  }, [map])
  
  return (
    <section
      className='visual-section absolute left-[27.5px] top-[47px] h-[35.75px] w-[120px] rounded-full flex gap-[6.5px]'
      data-section-name='section-profiles'
    >
      { user?.profiles.map(({ avatar }) => (
        <article
          key={`box-profiles-${avatar}`}
          className='visual-box h-full'
          data-profile-name={avatar}
        >
          <Icon className='bg-black/50 h-full w-[35.75px] rounded-full pointer-events-none'>
            <Avatar name={avatar} className='text-[4px]' />
          </Icon>
        </article>
      )) }
    </section>
  )
}
