import { world } from "mojang-minecraft";
import { Player } from "../Entity/index.js";
import { Block } from "../Block/index.js";
import { setTickTimeout } from "../utils.js";
export class BlockBreak {
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
        this.arg = world.events.blockBreak.subscribe(({ player, block, brokenBlockPermutation }) => {
            callback({
                player: new Player(player),
                block: new Block(block),
                brokenBlockPermutation,
                cancel() {
                    player.dimension.getBlock(block.location).setPermutation(brokenBlockPermutation);
                    setTickTimeout(() => player.dimension.getEntitiesAtBlockLocation(block.location).filter(entity => entity.id === 'minecraft:item').forEach(item => item.kill()), 0);
                }
            });
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.blockBreak.unsubscribe(this.arg);
    }
}
