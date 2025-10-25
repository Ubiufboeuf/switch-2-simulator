import { useEffect, useState, type ChangeEvent } from 'react'
import { useCreatorStore, type Box } from '~/stores/useCreatorStore'

export function CreatorBox ({ box }: { box: Box }) {
  const items = useCreatorStore((state) => state.sections)
  const editBox = useCreatorStore((state) => state.editBox)
  const [topology, setTopology] = useState<typeof box['topology']>(box.topology)

  function handleChangeTopology (direction: keyof typeof topology) {
    return function (event: ChangeEvent<HTMLSelectElement>) {
      const { value } = event.currentTarget
      
      // console.log(value, direction)

      const newTopology: typeof topology = {
        ...topology,
        [direction as keyof typeof topology]: value
      }

      setTopology(newTopology)
    }
  }

  useEffect(() => {
    if (!box.parentId) return

    editBox(box.parentId, {
      ...box,
      topology
    })
  }, [topology])
  
  return (
    <article className='shrink-0'>
      <div className='font-[CascadiaCode]'>
        <div>• {box.id}</div>
        <div>
          ↑ <select onChange={handleChangeTopology('up')} defaultValue={box.id}>{
            items.map((section) => section.items.map((box) => (
              <option key={`select-up-${section.id}-option-${box.id}`}>{box.id}</option>
            )))
          }</select>
        </div>
        <div>
          ← <select onChange={handleChangeTopology('left')} defaultValue={box.id}>{
            items.map((section) => section.items.map((box) => (
              <option key={`select-left-${section.id}-option-${box.id}`}>{box.id}</option>
            )))
          }</select>
        </div>
        <div>
          ↓ <select onChange={handleChangeTopology('down')} defaultValue={box.id}>{
            items.map((section) => section.items.map((box) => (
              <option key={`select-down-${section.id}-option-${box.id}`}>{box.id}</option>
            )))
          }</select>
        </div>
        <div>
          → <select onChange={handleChangeTopology('right')} defaultValue={box.id}>{
            items.map((section) => section.items.map((box) => (
              <option key={`select-right-${section.id}-option-${box.id}`}>{box.id}</option>
            )))
          }</select>
        </div>
      </div>
    </article>
  )
}
