import { useUserStore } from '~/stores/useUserStore'

export function Games () {
  const user = useUserStore((state) => state.user)
  const currentGame = {
    title: 'Mario Kart 8 Deluxe'
  }

  return (
    <section
      className='absolute left-0 top-[106px] h-[180px] w-full flex flex-col gap-[6.5px] overflow-hidden'
    >
      <h1
        className='absolute top-0 text-sm tracking-[-0.6px]'
        style={{ left: '81px' }}
      >
        {currentGame.title}
      </h1>
      <div className='flex items-center gap-[6.5px] h-[146px] mt-[27px] pl-[58.5px]'>
        { user?.games.principalList.map(({ game, assets }, idx) => (
          <article
            key={`box-game-${idx}`}
            className='visual-box h-full rounded-[10px] aspect-square'
            data-game-name={game}
            data-box-id={`box-2-${idx + 1}`}
          >
            <div className='h-full w-full rounded-[inherit] overflow-hidden'>
              <img
                src={assets.coverArt}
                className='h-full w-full object-cover'
              />
            </div>
          </article>
        )) }
      </div>
    </section>
  )
}
