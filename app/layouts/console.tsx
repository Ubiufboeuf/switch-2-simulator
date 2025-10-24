import { Link, Outlet } from 'react-router'

export default function ConsoleLayout () {
  return (
    <>
      <div className='w-full'>
        <img src='/console.svg' className='w-full' />
      </div>
      <Link to='/map-creator' className='absolute left-[14.6%] top-[68.1%] w-[5.3%] h-[5.8%] rounded-full transition-colors hover:bg-neutral-300/10 text-blue-400 hover:text-blue-500'></Link>
      <Outlet />
    </>
  )
}
