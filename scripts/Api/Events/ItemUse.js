import { world } from "mojang-minecraft";
import { Player, Entity } from "../Entity/index.js";
import { Item } from "../Item/index.js";
export class ItemUse {
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
        this.arg = world.events.beforeItemUse.subscribe(data => {
            const entity = data.source.id === 'minecraft:player' ? new Player(data.source) : new Entity(data.source);
            callback({
                entity,
                item: entity.isPlayer() ? new Item(data.item, { slot: entity.getSelectedSlot(), entity }) : new Item(data.item),
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
        world.events.beforeItemUse.unsubscribe(this.arg);
    }
}
