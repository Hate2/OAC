import type { BlockPermutation, DefinitionModifier } from "mojang-minecraft";
import type { Block } from "../Block/index.js";
import type { Player, Entity, PlayerLog } from "../Entity/index.js";
import type { Item } from "../Item/index.js";
import type { World } from "../World/index.js";
export declare type Events = {
    BlockBreak: {
        /**
         * The player that broke the block
         */
        player: Player;
        /**
         * The block that was broken
         */
        block: Block;
        /**
         * The broken block permutation
         */
        brokenBlockPermutation: BlockPermutation;
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    BlockHit: {
        /**
         * The entity that hit the block
         */
        entity: Entity;
        /**
         * The block that may have been hit
         */
        hitBlock: Block;
    };
    BlockPlace: {
        /**
         * Player that placed the block
         */
        player: Player;
        /**
         * Block that was placed
         */
        block: Block;
    };
    Chat: {
        /**
         * The player that chatted
         */
        player: Player;
        /**
         * The message that was sent
         */
        message: string;
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    EntityEvent: {
        /**
         * The entity in this event
         */
        entity: Entity;
        /**
         * The id of the event
         */
        id: string;
        /**
         * The event modifiers
         */
        modifiers: DefinitionModifier[];
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    EntityHit: {
        /**
         * The entity that hit the entity
         */
        entity: Entity;
        /**
         * The entity that may have been hit
         */
        hitEntity: Entity;
    };
    ItemUse: {
        /**
         * Entity that used the item
         */
        entity: Entity;
        /**
         * Item that was used
         */
        item: Item;
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    ItemUseOn: {
        /**
         * Entity that used the item
         */
        entity: Entity;
        /**
         * Item that was used
         */
        item: Item;
        /**
         * The block that was clicked one
         */
        block: Block;
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    /**
     * The player that joined
     */
    PlayerJoin: Player;
    PlayerLeave: {
        /**
         * The name of the player who left
         */
        playerName: string;
        /**
         * The log of the player who left
         */
        log: PlayerLog;
    };
    /**
     * The current tick (kinda like Date.now() but ticks)
     */
    Tick: number;
    /**
     * The loaded world
     */
    WorldLoad: World;
};
