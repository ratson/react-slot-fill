import React from 'react'
import SlotFillContext from './SlotFillContext'

export interface FillProps {
  name: string
}

const Fill: React.FC<FillProps> = ({ name, ...props }) => {
  const ctx = React.useContext(SlotFillContext)

  if (!name) {
    console.warn(`Fill: id is null or undefined.`)
    return null
  }

  if (Array.isArray(props.children) && props.children.length === 0) {
    console.warn(`Fill: children array is empty.`)
    return null
  }

  ctx.setFillForSlot(name, () => props.children)

  return null
}

export default Fill
