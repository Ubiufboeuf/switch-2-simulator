import { CreatorSection } from '~/compontents/creator/CreatorSection'
import { useRef } from 'react'
import { useCreatorStore } from '~/stores/useCreatorStore'

export default function MapCreator () {
  const itemsRef = useRef<HTMLDivElement>(null)
  const resultCodeRef = useRef<HTMLElement>(null)

  const items = useCreatorStore((state) => state.sections)
  const createSection = useCreatorStore((state) => state.createSection)

  return (
    <>
      <main className='flex not-md:flex-col items-center gap-4'>
        <section id='creator' className='h-screen w-180 rounded-lg bg-gray-900'>
          <div className='w-full p-6 px-12 flex items-center gap-4'>
            <button
              className='p-2 px-3 rounded-lg cursor-pointer transition-colors bg-gray-800 hover:bg-gray-700'
              onClick={createSection}
            >
              Agregar sección
            </button>
          </div>
          <div ref={itemsRef} className='overflow-y-auto px-12 h-[calc(100%-88px)] [scrollbar-width:thin]'>
            <div className='h-fit min-h-fit gap-2 pb-8 flex flex-col'>
              {
                items.map((section) => (
                  <CreatorSection
                    key={`section-${section.id}`}
                    section={section}
                  />
                ))
              }
            </div>
          </div>
        </section>
        <section id='result' className='w-120 h-screen overflow-y-auto [scrollbar-width:thin] p-2 px-4 bg-gray-900'>
          <div className='h-fit w-full'>
<pre>
<code ref={resultCodeRef}>
  {JSON.stringify(items, null, 2)}
</code>
</pre>
          </div>
        </section>
      </main>
    </>
  )
}
