import { Link, Outlet } from 'react-router'

export default function ConsoleLayout () {
  return (
    <>
      <div className='absolute w-341'>
        <img src='/console.svg' className='w-full' />
      </div>
      <Link to='/map-creator' className='absolute left-[198.375px] top-[375.4px] w-[73.75px] h-[30.3px] rounded-full transition-colors hover:bg-neutral-300/10 text-blue-400 hover:text-blue-500'></Link>
      <Outlet />
    </>
  )
}
