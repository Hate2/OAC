import { Enchantment, ItemStack, MinecraftEnchantmentTypes } from "mojang-minecraft";
import { Entity } from "../Entity/index.js";
import { ItemComponents } from "../Types/index";
export declare class Item {
    /**
     * The item stack
     */
    protected itemStack: ItemStack;
    protected readonly data?: {
        slot: number;
        entity: Entity;
    };
    /**
     * Create a new item class with an item stack or item id
     * @param {ItemStack | string} item Item stack or id of the item
     */
    constructor(item: ItemStack | string, data?: {
        slot: number;
        entity: Entity;
    });
    /**
     * Add an enchant to the item
     * @param {{ enchant: keyof typeof MinecraftEnchantmentTypes, level?: number }} enchant Enchant to add to the item
     * @returns {boolean} Whether or not the the enchant was added successfully
     */
    addEnchant(enchant: {
        enchant: keyof typeof MinecraftEnchantmentTypes;
        level?: number;
    }): boolean;
    /**
     * Test if two items are equal
     * @param {Item} item Item to test with
     * @returns {boolean} Whether or not they are equal
     */
    equals(item: Item): boolean;
    /**
     * Get the amount of the item
     * @returns {number} The amount of the item
     */
    getAmount(): number;
    /**
     * Get an item component
     * @param {keyof ItemComponents} component Component to get
     * @returns {any} The component
     */
    getComponent<compName extends keyof ItemComponents>(component: compName): ItemComponents[compName];
    /**
     * Get all components on the item
     * @returns {any[]} All components on this item
     */
    getComponents(): any[];
    /**
     * Get the data value of the item
     * @returns {number} The data value of the item
     */
    getData(): number;
    /**
     * Get an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to get from the item
     * @returns {Enchantment} The enchant
     */
    getEnchant(enchant: keyof typeof MinecraftEnchantmentTypes): Enchantment;
    /**
     * Get all enchants on the item
     * @returns {IterableIterator<Enchantment>} All enchants on the item
     */
    getEnchants(): IterableIterator<Enchantment>;
    /**
     * Get the item's id
     * @returns {string} The item's id
     */
    getId(): string;
    /**
     * Get the item stack
     * @returns {ItemStack} The item stack
     */
    getItemStack(): ItemStack;
    /**
     * Get the item's lore
     * @returns {string[]} The item's lore
     */
    getLore(): string[];
    /**
     * Get the name of the item
     * @returns {string} The name of the item
     */
    getName(): string;
    /**
     * Test whether or not the item has a component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the item has the component
     */
    hasComponent(component: string): boolean;
    /**
     * Remove an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to remove from the item
     */
    removeEnchant(enchant: keyof typeof MinecraftEnchantmentTypes): void;
    /**
     * Set the item's amount
     * @param {number} amount The item's new amount
     */
    setAmount(amount: number): void;
    /**
     * Set the item's data value
     * @param {number} data The item's new data value
     */
    setData(data: number): void;
    /**
     * Set the item stack
     * @param {ItemStack} item The item stack to set as the new item stack
     */
    setItemStack(item: ItemStack): void;
    /**
     * Set the item's lore
     * @param {number} lore The item's new lore
     */
    setLore(lore: string[]): void;
    /**
     * Set the item's name
     * @param {number} name The item's new name
     */
    setName(name: string): void;
    /**
     * Trigger an item event
     * @param {string} event Event to trigger
     */
    triggerEvent(event: string): void;
}
