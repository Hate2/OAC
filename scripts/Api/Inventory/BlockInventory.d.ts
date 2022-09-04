import type { Block, BlockInventoryComponent } from "mojang-minecraft";
import { Item } from "../Item/Item.js";
import type { EntityInventory } from "./EntityInventory";
/**
 * An entity's inventory
 */
export declare class BlockInventory {
    protected readonly _inventory: BlockInventoryComponent;
    /**
     * The id of the inventory (should always be "minecraft:inventory")
     */
    readonly id: string;
    /**
     * The size of the inventory
     */
    readonly size: number;
    constructor(block: Block);
    /**
     * Add an item in the inventory
     * @param {Item} item Item to add into the inventory
     */
    addItem(item: Item): void;
    /**
     * Amount of empty slots in the entity's inventory
     */
    get emptySlotCount(): number;
    /**
     * Loop through all items in the inventory
     * @param {(item: Item, index: number, array: Item[]) => void} callback Callback to run for each item
     * @param {any} thisArg The "this" value for the loop
     */
    forEach(callback: (item: Item, index: number, array: Item[]) => void, thisArg?: any): void;
    /**
     * Get an item from a slot
     * @param {number} slot Slot to get the item from
     * @returns {Item}
     */
    getItem(slot: number): Item;
    /**
     * Set an item in the inventory
     * @param {number} slot Slot to set the item in
     * @param {Item} item Item to set the slot to
     */
    setItem(slot: number, item: Item): void;
    /**
     * Swap 2 items in this inventory or another inventory
     * @param {number} slot Slot in the inventory
     * @param {number} otherSlot Slot in the other inventory
     * @param {EntityInventory} otherContainer Other inventory to swap items with
     * @returns {boolean} ...idk
     */
    swapItems(slot: number, otherSlot: number, otherContainer?: BlockInventory | EntityInventory): boolean;
}
