import { useGamesStore } from '~/stores/useGamesStore'
import { CoverArt } from '../Images/CoverArt'

export function SectionGames () {
  const installedGames = useGamesStore((state) => state.installedGames)

  return (
    <section className='absolute top-[134.5px] left-0 w-full h-[145.5px] px-15 flex items-center gap-[7.5px]'>
      { installedGames.map(({ id, assets }) => (
        <article key={`section-profiles-${id}`} className='h-full aspect-square'>
          <CoverArt src={assets.coverArt} />
        </article>
      )) }
    </section>
  )
}
