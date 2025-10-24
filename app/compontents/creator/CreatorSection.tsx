import type { ChangeEvent, FormEvent } from 'react'
import { CreatorBox } from './CreatorBox'
import { useCreatorStore, type Section } from '~/stores/useCreatorStore'

export function CreatorSection ({ section }: { section: Section }) {
  const editSection = useCreatorStore((state) => state.editSection)
  const createBox = useCreatorStore((state) => state.createBox)
  
  function handleCreateBox () {
    createBox(section.id)
  }

  function handleInput (event: FormEvent<HTMLInputElement>) {
    const input = event.currentTarget
    const { value } = input

    const newSection: Section = {
      id: section.id,
      name: value || section.name,
      items: section.items,
      orientation: section.orientation
    }
    
    editSection(newSection)
  }

  function handleSelectOrientation (event: ChangeEvent<HTMLSelectElement>) {
    const select = event.currentTarget
    const newSection: Section = {
      id: section.id,
      name: section.name,
      items: section.items,
      orientation: select.value
    }
    
    editSection(newSection)
  }
  
  return (
    <section className='flex flex-col justify-center w-full max-w-full h-fit p-4 gap-2 rounded-lg bg-gray-950/70'>
      <div className='h-8 flex items-center gap-2'>
        <button
          className='h-full px-3 rounded-lg cursor-pointer transition-colors bg-gray-800 hover:bg-gray-700'
          onClick={handleCreateBox}
        >
          Agregar caja
        </button>
        <input
          placeholder='section-name'
          className='h-full px-3 border border-gray-700'
          defaultValue={section.id}
          onInput={handleInput}
        />
        <select
          defaultValue={section.orientation}
          onChange={handleSelectOrientation}
        >
          <option value='horizontal'>horizontal</option>
          <option value='vertical'>vertical</option>
        </select>
      </div>
      <div className='overflow-x-auto [scrollbar-width:thin] max-w-full'>
        <div className='w-fit min-w-fit h-full flex items-center gap-2'>
          {section.items.map((box) => (
            <CreatorBox
              key={box.id}
              box={box}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
