import { useState } from 'react'
import { getNavbarLink } from '~/lib/navbarLinks/navbarLinkDimensions'
import type { NavbarLinkDimensions } from '~/types/navbarLinkTypes'

export function NavbarLink ({ name, className = '' }: { name: keyof NavbarLinkDimensions, className?: string }) {
  const [link] = useState(getNavbarLink(name))

  return (
    <div className={`${className} relative h-full w-full group-first:scale-100 group-first:bg-[#E40110] scale-115`}>
      <img
        src='/switchui/images/navbar_links.svg'
        className='absolute flex shink-0 object-top-left pointer-events-none'
        style={{
          left: link.left,
          top: link.top,
          height: link.height,
          width: link.width,
          minHeight: link.height,
          minWidth: link.width
        }}
      />
    </div>
  )
}
