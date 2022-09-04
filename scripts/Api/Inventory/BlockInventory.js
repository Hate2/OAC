import { Item } from "../Item/Item.js";
/**
 * An entity's inventory
 */
export class BlockInventory {
    constructor(block) {
        const inventory = block.getComponent('inventory');
        this._inventory = inventory;
        this.id = 'minecraft:inventory';
        this.size = inventory.container.size;
    }
    /**
     * Add an item in the inventory
     * @param {Item} item Item to add into the inventory
     */
    addItem(item) {
        this._inventory.container.addItem(item.getItemStack());
    }
    /**
     * Amount of empty slots in the entity's inventory
     */
    get emptySlotCount() {
        return this._inventory.container.emptySlotsCount;
    }
    /**
     * Loop through all items in the inventory
     * @param {(item: Item, index: number, array: Item[]) => void} callback Callback to run for each item
     * @param {any} thisArg The "this" value for the loop
     */
    forEach(callback, thisArg) {
        new Array(this.size).fill(undefined).map((_, i) => this.getItem(i)).forEach(callback, thisArg);
    }
    /**
     * Get an item from a slot
     * @param {number} slot Slot to get the item from
     * @returns {Item}
     */
    getItem(slot) {
        if (slot < 0 || slot > this.size + 1)
            throw new Error(`Slot count is to small or to large! Method "inventory.getItem()"`);
        return new Item(this._inventory.container.getItem(slot));
    }
    /**
     * Set an item in the inventory
     * @param {number} slot Slot to set the item in
     * @param {Item} item Item to set the slot to
     */
    setItem(slot, item) {
        if (slot < 0 || slot > this.size + 1)
            throw new Error(`Slot count is to small or to large! Method "inventory.setItem()"`);
        this._inventory.container.setItem(slot, item.getItemStack());
    }
    /**
     * Swap 2 items in this inventory or another inventory
     * @param {number} slot Slot in the inventory
     * @param {number} otherSlot Slot in the other inventory
     * @param {EntityInventory} otherContainer Other inventory to swap items with
     * @returns {boolean} ...idk
     */
    swapItems(slot, otherSlot, otherContainer) {
        //@ts-ignore
        return this._inventory.container.swapItems(slot, otherSlot, otherContainer ? otherContainer._inventory.container : this._inventory.container);
    }
}
