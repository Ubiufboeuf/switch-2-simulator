import { useCursor } from '~/hooks/useCursor'

export const map = [
  ['box-a1', 'box-a2', 'box-a3', 'box-a4', 'box-a5'],
  ['box-b1', 'box-b2', 'box-b3', 'box-b4', 'box-b5'],
  ['box-c1', 'box-c2', 'box-c3', 'box-c4', 'box-c5'],
  ['box-d1', 'box-d2', 'box-d3', 'box-d4', 'box-d5'],
  ['box-e1', 'box-e2', 'box-e3', 'box-e4', 'box-e5']
]
// export const map: string[][] = Array(3)
//   .fill(
//     Array(3)
//       .fill(crypto.randomUUID())
//   )

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
                    className='size-24 border-2 rounded-lg text-3xl flex items-center justify-center not-[.selected]:backdrop-blur-[2px]'
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

