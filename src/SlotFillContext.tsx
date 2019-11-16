import React from 'react'

const noopRenderCallback = (): React.ReactNode => null

export class SlotFillManager {
  slotsAndFills = new Map()
  subscribers: Array<{ slotId: string; callback: any }> = []

  setFillForSlot = (slotId: string, renderCallback = noopRenderCallback) => {
    const fillForSlot = this.slotsAndFills.get(slotId)

    if (fillForSlot) {
      return
    }

    this.slotsAndFills.set(slotId, renderCallback)
    this.notify(slotId)
  }

  getFillForSlot = (slotId: string) => {
    const fillById = this.slotsAndFills.get(slotId)

    if (!fillById) {
      return noopRenderCallback
    }

    return fillById
  }

  subscribe = (slotId: string, callback: any) => {
    this.subscribers.push({ slotId, callback })
  }

  unsubscribe = (slotId: string, slotIndex: number) => {
    this.subscribers = this.subscribers.filter(
      (subscriber: any, index: number) =>
        subscriber.slotId === slotId && index === slotIndex
    )
  }

  notify = (slotId: string) => {
    this.subscribers.forEach((subscriber: any, index: number) => {
      if (subscriber.slotId !== slotId) {
        return
      }

      subscriber.callback(index)
    })
  }
}

const SlotFillContext = React.createContext(new SlotFillManager())

export default SlotFillContext
