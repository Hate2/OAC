import { world } from "mojang-minecraft";
import { Player } from "../Entity/index.js";
export class PlayerJoin {
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
        this.arg = world.events.playerJoin.subscribe(data => {
            callback(new Player(data.player));
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.playerJoin.unsubscribe(this.arg);
    }
}
