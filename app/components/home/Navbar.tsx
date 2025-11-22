import type { Link } from '~/types/navbarLinkTypes'
import { Icon } from '../images/Icon'
import { NavbarLink } from '../images/NavbarLink'

const links: Link[] = [
  { link: 'nso', name: 'Nintendo Switch online', href: '' },
  { link: 'chat', name: 'Chat', href: '' },
  { link: 'news', name: 'Noticias', href: '' },
  { link: 'eshop', name: 'EShop', href: '' },
  { link: 'galery', name: 'Galería', href: '' },
  { link: 'share', name: 'Compartir Pantalla', href: '' },
  { link: 'controllers', name: 'Mandos', href: '' },
  { link: 'shared_games', name: 'Juegos Compartidos', href: '' },
  { link: 'settings', name: 'Configuración', href: '' },
  { link: 'power_off', name: 'Apagar', href: '' }
]

export function Navbar () {
  return (
    <section
      className='absolute left-1/2 -translate-x-1/2 bottom-[86px] h-[53px] w-[472px] flex items-center gap-[6.25px] px-[6px] rounded-[25px] bg-[#2C2C2C]'
    >
      { links.map(({ link }, idx) => (
        <div
          className='h-full px-[2px] flex items-center justify-center first:mr-[6px]'
          key={`box-navbar-wrapper-${link}`}
        >
          <article
            className={`${idx === 0 ? 'group' : ''} w-full aspect-square rounded-full`}
            data-navbar-link={link}
            data-box-id={`box-3-${idx + 1}`}
          >
            <Icon className='h-full w-[35.75px] rounded-full pointer-events-none'>
              <NavbarLink name={link} />
            </Icon>
          </article>
        </div>
      )) }
    </section>
  )
}
