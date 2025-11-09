import { Link, Outlet } from 'react-router'
import { Camera } from '~/components/Camera'

export default function ConsoleLayout () {
  return (
    <div id='console-layout' className='flex items-center justify-center h-full min-h-fit clw:w-clw'>
      <div className='w-341 min-w-341'>
        <img src='/console.svg' className='w-full h-full' />
      </div>
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
