import type { Game } from '~/models/BoxModel'
import { CoverArt } from '../Images/CoverArt'

export function BoxGame ({ game: { id, assets } }: { game: Game }) {
  return (
    <article
      className='visual-box h-full aspect-square'
      data-box-id={id}
    >
      { assets.coverArt && <CoverArt src={assets.coverArt} /> }
    </article>
  )
}
