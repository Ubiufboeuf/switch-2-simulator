import { useCursor } from '~/hooks/useCursor'

export const map = [
  ['box-a0', 'box-a1', 'box-a2'],
  ['box-b0', 'box-b1', 'box-b2'],
  ['box-c0', 'box-c1', 'box-c2']
]

let itemIdx = 0

export const items = [
  { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  { id: `item-${itemIdx++}`, image: '/nom-nom.png' }
]

const borderSpacing = 2
const borderWidth = 2

export default function Index () {
  const { cursorStyles } = useCursor({ borderSpacing, borderWidth })

  return (
    <main
      id='#camera'
      className='relative flex items-center justify-center w-full h-full p-8'
    >
      <article
        id='cursor'
        className='absolute z-2 flex items-center justify-center border-2 border-dark-secondary'
        style={cursorStyles}
      >
        cursor
      </article>
      <div className='absolute z-1 flex flex-col gap-2 rounded-lg bg-black/30'>
        { map.map((row, rowIdx) => (
            <section
              key={`key-section-row-${rowIdx}`}
              className='flex gap-2'
            >
              { row.map((col, colIdx) => (
                  <div
                    key={`key-box-row-${rowIdx}-col-${colIdx}`}
                    className='size-24 border-2 rounded-lg flex items-center justify-center not-[.selected]:backdrop-blur-[2px]'
                    data-id={col}
                  />
              )) }
            </section>
        )) }
      </div>
      <div className='flex items-center justify-center gap-2 w-full'>
        <section className='flex items-center gap-2'>
          { items.map(({ id, image }) => (
              <article
                key={`key-article-${id}`}
                className='size-24 overflow-hidden rounded-lg'
              >
                <img src={image} className='object-cover h-full w-full' />
              </article>
          )) }
        </section>
      </div>
    </main>
  )
}

