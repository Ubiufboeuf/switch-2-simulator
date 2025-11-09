import { Link, Outlet } from 'react-router'
import { Camera } from '~/components/Camera'

export default function ConsoleLayout () {
  return (
    <div
      id='console-layout'
      className='relative flex items-center justify-center h-fit min-h-clh w-fit min-w-clw'
    >
      <Link
        to='/'
        className='absolute left-[198.375px] top-[375.4px] w-[73.75px] h-[30.3px] rounded-full transition-colors hover:bg-neutral-300/10'
      />
      <Camera>
        <Outlet />
      </Camera>
    </div>
  )
}
