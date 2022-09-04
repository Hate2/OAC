import { world } from "mojang-minecraft";
import { PlayerLog } from "../Entity/Entity.js";
export class PlayerLeave {
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
        this.arg = world.events.playerLeave.subscribe(({ playerName }) => callback({ playerName, log: new PlayerLog(playerName) }));
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.playerLeave.unsubscribe(this.arg);
    }
}
