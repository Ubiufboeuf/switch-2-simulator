import { Avatar } from '../Images/Avatar'
import { Icon } from '../Images/Icon'
import { useEffect, useState } from 'react'
import type { SectionItem } from '~/types/sectionTypes'
import { useMapStore } from '~/stores/useMapStore'

export function SectionProfiles () {
  const map = useMapStore((state) => state.map)
  const [profiles, setProfiles] = useState<SectionItem[]>([])

  useEffect(() => {
    if (!map) return

    const section = map.items.find((s) => s.name === 'section-profiles')

    if (!section) return
    setProfiles(section.items)
  }, [map])
  
  return (
    <section
      className='visual-section absolute left-[27.5px] top-[47px] h-[35.75px] w-[120px] rounded-full flex gap-[6.5px]'
      data-section-name='section-profiles'
    >
      { profiles.map(({ id }) => (
        <article
          key={`box-profiles-${id}`}
          className='visual-box h-full'
          data-game-id={id}
        >
          <Icon className='bg-black/50 h-full w-[35.75px] rounded-full overflow-hidden'>
            <Avatar name={'luigi2'} className='text-[4px]' />
          </Icon>
        </article>
      )) }
    </section>
  )
}
