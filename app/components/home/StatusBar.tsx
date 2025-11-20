import { Time } from '../ui/Time'

export function StatusBar () {
  return (
    <section
      className='absolute right-[27px] top-[47px] h-[35.75px] w-[144px] flex items-center gap-[6.5px] bg-black'
    >
      <Time />
    </section>
  )
}
