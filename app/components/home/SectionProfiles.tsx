import { Icon } from '../images/Icon'
import { Avatar } from '../images/Avatar'
import { useUserStore } from '~/stores/useUserStore'

export function SectionProfiles () {
  const user = useUserStore((state) => state.user)

  return (
    <section
      className='visual-section absolute left-[27.5px] top-[47px] h-[35.75px] w-[120px] rounded-full flex gap-[6.5px]'
      data-section-name='section-profiles'
    >
      { user?.profiles.map(({ avatar }, idx) => (
        <article
          key={`box-profiles-${idx}`}
          className='visual-box h-full rounded-full'
          data-profile-name={avatar}
          data-box-id={`box-1-${idx + 1}`}
        >
          <Icon className='bg-black/50 h-full w-[35.75px] rounded-full pointer-events-none'>
            <Avatar name={avatar} className='text-[4px]' />
          </Icon>
        </article>
      )) }
    </section>
  )
}
