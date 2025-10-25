import { useGamesStore } from '~/stores/useGamesStore'
import { CoverArt } from '../Images/CoverArt'

export function SectionGames () {
  const installedGames = useGamesStore((state) => state.installedGames)

  return (
    <section
      className='visual-section absolute top-[134.5px] left-0 w-full h-[145.5px] px-15 flex items-center gap-[7.5px]'
      data-section-name='section-games'
    >
      { installedGames.map(({ id, assets }) => (
        <article
          key={`box-games-${id}`}
          className='visual-box h-full aspect-square'
          data-box-id={id}
        >
          <CoverArt src={assets.coverArt} />
        </article>
      )) }
    </section>
  )
}
