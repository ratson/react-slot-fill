import React from 'react'
import SlotFillContext from './SlotFillContext'

export interface SlotProps {
  name: string
}

const Slot: React.FC<SlotProps> = ({ name, ...props }) => {
  const ctx = React.useContext(SlotFillContext)
  const [slotIndex, setSlotIndex] = React.useState<number>(-1)
  const [, count] = React.useState(0)
  const forceUpdate = React.useCallback(() => count(c => c + 1), [])

  React.useEffect(() => {
    ctx.subscribe(name, (slotIndexNew: number) => {
      console.warn(
        `Slot: Calling suscribe for slotIndex ${slotIndexNew}, where name is ${name}`
      )

      setSlotIndex(slotIndexNew)
      forceUpdate()
    })

    forceUpdate()

    return () => {
      ctx.unsubscribe(name, slotIndex)
    }
  }, [ctx, name, slotIndex, count, forceUpdate])

  const renderCallback = ctx.getFillForSlot(name)
  const children = renderCallback()

  return children ? React.cloneElement(children, props) : null
}

export default Slot
