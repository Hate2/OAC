import { world } from "mojang-minecraft";
import { runCommand } from "../utils";
import { World } from "../World/index.js";
export class WorldLoad {
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
        this.arg = world.events.tick.subscribe(() => {
            if (runCommand(`testfor @a`).error)
                return;
            world.events.tick.unsubscribe(this.arg);
            callback(new World());
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        try {
            world.events.tick.unsubscribe(this.arg);
        }
        catch { }
    }
}
