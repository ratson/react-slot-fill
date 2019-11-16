import React from 'react'
import SlotFillContext from './SlotFillContext'

export interface FillProps {
  name: string
}

const Fill: React.FC<FillProps> = ({ name, ...props }) => {
  const ctx = React.useContext(SlotFillContext)
  ctx.setFillForSlot(name, () => props.children)

  return null
}

export default Fill
