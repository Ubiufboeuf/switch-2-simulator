import { Avatars } from '~/lib/avatars/dimensions'
import type { AvatarDimensions } from '~/lib/avatars/types'

export function Avatar ({ name, className = '' }: { name: keyof AvatarDimensions, className?: string }) {
  return (
    <div className={`${className} relative h-full w-full`}>
      <img
        src='/switchui/images/avatars.webp'
        className='absolute flex shink-0'
        style={{
          left: Avatars[name].left,
          top: Avatars[name].top,
          height: Avatars[name].height,
          width: Avatars[name].width,
          minHeight: Avatars[name].height,
          minWidth: Avatars[name].width
        }}
      />
    </div>
  )
}
