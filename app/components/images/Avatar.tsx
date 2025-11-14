import { useState } from 'react'
import { getAvatar } from '~/lib/avatars/avatarDimensions'
import type { AvatarDimensions } from '~/types/avatarTypes'

export function Avatar ({ name, className = '' }: { name: keyof AvatarDimensions, className?: string }) {
  const [avatar] = useState(getAvatar(name))

  return (
    <div className={`${className} relative h-full w-full`}>
      <img
        src='/switchui/images/avatars_performance.webp'
        className='absolute flex shink-0 object-top-left opacity-50'
        style={{
          left: avatar.left,
          top: avatar.top,
          height: avatar.height,
          width: avatar.width,
          minHeight: avatar.height,
          minWidth: avatar.width
        }}
      />
    </div>
  )
}
