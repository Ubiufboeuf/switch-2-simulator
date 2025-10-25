import { useGamesStore } from '~/stores/useGamesStore'
import { BoxGame } from '../boxes/BoxGame'

export function SectionGames () {
  const installedGames = useGamesStore((state) => state.installedGames)

  return (
    <section
      className='visual-section absolute top-[134.5px] left-0 w-full h-[145.5px] px-15 flex items-center gap-[7.5px]'
      data-section-name='section-games'
    >
      { installedGames.map((game) => (
        <BoxGame key={`box-games-${game.id}`} game={game} />
      )) }
    </section>
  )
}
