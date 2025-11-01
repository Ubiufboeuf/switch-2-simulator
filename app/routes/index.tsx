import { useCursor } from '~/hooks/useCursor'

export const map = [
  // ['box-a0', 'box-a1', 'box-a2'],
  // ['box-b0', 'box-b1', 'box-b2'],
  // ['box-c0', 'box-c1', 'box-c2']
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
  [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
  [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
  [91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
]
let itemIdx = 0

export const items = [
  // { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  // { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  // { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  // { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  // { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  // { id: `item-${itemIdx++}`, image: '/nom-nom.png' },
  // { id: `item-${itemIdx++}`, image: '/nom-nom.png' }
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
        {/* cursor */}
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
                    className='size-12 border-2 rounded-lg flex items-center justify-center not-[.selected]:backdrop-blur-[2px]'
                    data-id={col}
                  >
                    {col}
                  </div>
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

