import React from "react";
import PropTypes from "prop-types";

export class InnerSlot extends React.Component {
    static displayName = "InnerSlot";

    static propTypes = {
        slotId: PropTypes.string.isRequired,
        context: PropTypes.shape({
            _notify: PropTypes.func,
            subscribe: PropTypes.func.isRequired,
            unsubscribe: PropTypes.func.isRequired,
            setFillForSlot: PropTypes.func.isRequired,
            getFillForSlot: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillUnmount() {
        const { slotId, context } = this.props;
        
        if (!context) {
            console.warn(`Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`);
            return;
        }

        if (this.slotIndex) {
            context.unsubscribe(slotId, this.slotIndex);
        }
    }

    render() {
        const { slotId, context } = this.props;

        if (!context || !context.hasOwnProperty("getFillForSlot")) {
            console.warn(`Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`);
            return false;
        }

        if (!slotId) {
            console.warn(`Slot: You forget to pass id to <Slot>`);
            return false;
        }

        const renderCallback = context.getFillForSlot(slotId, slotIndex => {
            console.warn(`Slot: calling suscribe for slotIndex ${slotIndex}, where slotId is ${slotId}`);

            this.slotIndex = slotIndex;
            this.forceUpdate();
        });

        return renderCallback();
    }
}