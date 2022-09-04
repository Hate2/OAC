import { world } from "mojang-minecraft";
import { Commands } from "../Commands/index";
import { Player } from "../Entity/index";
export class Chat {
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
        this.arg = world.events.beforeChat.subscribe(data => {
            const { message } = data;
            if (Commands.clients.find(e => message.startsWith(e.command?.prefix)))
                return;
            callback({
                player: new Player(data.sender),
                message: message,
                cancel() {
                    data.cancel = true;
                }
            });
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.beforeChat.unsubscribe(this.arg);
    }
}
