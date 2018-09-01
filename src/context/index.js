import React from 'react';

export class SlotAndFillManager {
    slotsAndFills = new Map();
    subscribers = [];

    setFillForSlot = (slotId, renderCallback = () => false) => {
        const fillForSlot = this.getFillForSlot(slotId);

        if (fillForSlot) {
            console.warn(`SlotAndFillManager: You've already registered a Fill for the following slotId: ${id}`);
            return;
        }

        this.slotsAndFills.set(slotId, renderCallback);
        this._notify(slotId);
    };

    getFillForSlot = (slotId, renderCallback = () => false) => {
        const fillById = this.slotsAndFills.get(slotId);

        if (!fillById) {
            console.warn(`SlotAndFillManager: There's no Fill registered for the following slotId: ${id}`);
            return renderCallback;
        }

        return fillById;
    };

    subscribe = (slotId, callback) => {
        this.subscribers.push({ slotId, callback });
    };

    unsubscribe = (slotId) => {
        this.subscribers = this.subscribers.filter(subscriber => subscriber.slotId === slotId);
    };

    _notify = (slotId) => {
        this.subscribers.forEach(subscriber => {
            if (subscriber.slotId === slotId) {
                subscriber.callback(slotId);
            }
        });
    };
}

export const SlotAndFillContext = React.createContext(null);