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
      <div className='absolute z-2 w-181 h-fit mr-[6px] mt-[12px]'>
        <img src='/switchui/images/home.png' className='opacity-20 w-full' />
      </div>
      <Camera>
        <Outlet />
      </Camera>
    </div>
  )
}
