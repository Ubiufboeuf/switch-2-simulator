import { Avatar } from '../Images/Avatar'
import { Icon } from '../Images/Icon'

const profiles = [
  {
    id: 'profile-1',
    name: 'mario2'
  },
  {
    id: 'profile-2',
    name: 'luigi2'
  },
  {
    id: 'profile-3',
    name: 'donkeyKong2'
  }
]

export function SectionProfiles () {
  return (
    <section
      className='visual-section absolute left-[27.5px] top-[47px] h-[35.75px] w-[120px] rounded-full flex gap-[6.5px]'
      data-section-name='section-profiles'
    >
      { profiles.map(({ id, name }) => (
        <article
          key={`box-profiles-${id}`}
          className='visual-box h-full'
          data-game-id={id}
        >
          <Icon className='bg-black/50 h-full w-[35.75px] rounded-full overflow-hidden'>
            <Avatar name={name} className='text-[4px]' />
          </Icon>
        </article>
      )) }
    </section>
  )
}
