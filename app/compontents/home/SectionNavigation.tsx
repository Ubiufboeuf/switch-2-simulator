import { useNavigationStore } from '~/stores/useNavigationStore'
import { Icon } from '../Images/Icon'

export function SectionNavigation () {
  const links = useNavigationStore((state) => state.homeLinks)
  
  return (
    <section className='section absolute top-[311.5px] left-1/2 -translate-x-1/2 w-[473.75px] h-fit flex items-center justify-end p-[8.5px] gap-[10px] rounded-full bg-[#2C2C2C]'>
      { links.map(({ id, src }) => (
        <article key={id} className='box first:mr-[6.75px] size-9'>
          { src && (
            <Icon>
              <img src={src} />
            </Icon>
          ) }
        </article>
      )) }
    </section>
  )
}
