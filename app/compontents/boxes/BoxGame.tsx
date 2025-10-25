import type { Game } from '~/types/games'
import { CoverArt } from '../Images/CoverArt'

export function BoxGame ({ game: { id, assets } }: { game: Game }) {
  return (
    <article
      className='visual-box h-full aspect-square'
      data-box-id={id}
    >
      <CoverArt src={assets.coverArt} />
    </article>
  )
}
