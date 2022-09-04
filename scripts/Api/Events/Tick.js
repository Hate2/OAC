import { world } from "mojang-minecraft";
export class Tick {
    constructor() {
        /**
         * The actual arg
         */
        this.arg = undefined;
    }
    /**
     * Add a listener for the event
     */
    on(callback) {
        this.arg = world.events.tick.subscribe(({ currentTick }) => {
            callback(currentTick);
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.tick.unsubscribe(this.arg);
    }
}
