import React from 'react'
import SlotFillContext, { SlotFillManager } from './SlotFillContext'

const SlotFillProvider: React.FC = ({ children }) => (
  <SlotFillContext.Provider value={new SlotFillManager()}>
    {children}
  </SlotFillContext.Provider>
)

export default SlotFillProvider
