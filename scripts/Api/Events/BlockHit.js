import { world } from "mojang-minecraft";
import { Block } from "../Block/index.js";
import { Player, Entity } from "../Entity/index";
export class BlockHit {
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
        this.arg = world.events.entityHit.subscribe(data => {
            if (data.hitBlock)
                callback({
                    entity: data.entity.id === 'minecraft:player' ? new Player(data.entity) : new Entity(data.entity),
                    hitBlock: new Block(data.hitBlock)
                });
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.entityHit.unsubscribe(this.arg);
    }
}
