import { Enchantment, Items, ItemStack, MinecraftEnchantmentTypes } from "mojang-minecraft";
export class Item {
    /**
     * Create a new item class with an item stack or item id
     * @param {ItemStack | string} item Item stack or id of the item
     */
    constructor(item, data) {
        this.itemStack = item instanceof ItemStack ? item : new ItemStack(Items.get(item));
        this.data = data;
    }
    /**
     * Add an enchant to the item
     * @param {{ enchant: keyof typeof MinecraftEnchantmentTypes, level?: number }} enchant Enchant to add to the item
     * @returns {boolean} Whether or not the the enchant was added successfully
     */
    addEnchant(enchant) {
        const eC = this.itemStack?.getComponent('enchantments'), eL = eC.enchantments;
        if (!eC)
            return;
        const rV = eL.addEnchantment(new Enchantment(MinecraftEnchantmentTypes[enchant.enchant], enchant.level ?? 1));
        eC.enchantments = eL;
        if (this.data)
            this.data.entity.getInventory().setItem(this.data.slot, this);
        return rV;
    }
    /**
     * Test if two items are equal
     * @param {Item} item Item to test with
     * @returns {boolean} Whether or not they are equal
     */
    equals(item) {
        if (this.getId() !== item.getId())
            return false;
        if (this.getName() !== item.getName())
            return false;
        if (this.getAmount() !== item.getAmount())
            return false;
        if (this.getData() !== item.getData())
            return false;
        if (JSON.stringify(this.getLore()) !== JSON.stringify(item.getLore()))
            return false;
        if (JSON.stringify(this.getEnchants()) !== JSON.stringify(this.getEnchants()))
            return false;
        return true;
    }
    /**
     * Get the amount of the item
     * @returns {number} The amount of the item
     */
    getAmount() {
        return this.itemStack?.amount;
    }
    /**
     * Get an item component
     * @param {keyof ItemComponents} component Component to get
     * @returns {any} The component
     */
    getComponent(component) {
        //@ts-ignore
        return this.itemStack?.getComponent(component);
    }
    /**
     * Get all components on the item
     * @returns {any[]} All components on this item
     */
    getComponents() {
        return this.itemStack?.getComponents();
    }
    /**
     * Get the data value of the item
     * @returns {number} The data value of the item
     */
    getData() {
        return this.itemStack?.data;
    }
    /**
     * Get an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to get from the item
     * @returns {Enchantment} The enchant
     */
    getEnchant(enchant) {
        // @ts-ignore
        return this.getComponent('enchantments')?.enchantments?.getEnchantment(MinecraftEnchantmentTypes[enchant]);
    }
    /**
     * Get all enchants on the item
     * @returns {IterableIterator<Enchantment>} All enchants on the item
     */
    *getEnchants() {
        const e = this.getComponent("enchantments").enchantments;
        for (const a of e) yield a
    }
    /**
     * Get the item's id
     * @returns {string} The item's id
     */
    getId() {
        return this.itemStack.id;
    }
    /**
     * Get the item stack
     * @returns {ItemStack} The item stack
     */
    getItemStack() {
        return this.itemStack;
    }
    /**
     * Get the item's lore
     * @returns {string[]} The item's lore
     */
    getLore() {
        return this.itemStack?.getLore();
    }
    /**
     * Get the name of the item
     * @returns {string} The name of the item
     */
    getName() {
        return this.itemStack?.nameTag;
    }
    /**
     * Test whether or not the item has a component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the item has the component
     */
    hasComponent(component) {
        return this.itemStack?.hasComponent(component);
    }
    /**
     * Remove an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to remove from the item
     */
    removeEnchant(enchant) {
        const eC = this.itemStack?.getComponent('enchantments'), eL = eC?.enchantments;
        if (!eC)
            return;
        // @ts-ignore
        eL.removeEnchantment(MinecraftEnchantmentTypes[enchant]);
        eC.enchantments = eL;
        if (this.data)
            this.data.entity.getInventory().setItem(this.data.slot, this);
    }
    /**
     * Set the item's amount
     * @param {number} amount The item's new amount
     */
    setAmount(amount) {
        this.itemStack && (this.itemStack.amount = amount);
        if (this.data)
            this.data.entity.getInventory().setItem(this.data.slot, this);
    }
    /**
     * Set the item's data value
     * @param {number} data The item's new data value
     */
    setData(data) {
        this.itemStack && (this.itemStack.data = data);
        if (this.data)
            this.data.entity.getInventory().setItem(this.data.slot, this);
    }
    /**
     * Set the item stack
     * @param {ItemStack} item The item stack to set as the new item stack
     */
    setItemStack(item) {
        this.itemStack = item;
        if (this.data)
            this.data.entity.getInventory().setItem(this.data.slot, this);
    }
    /**
     * Set the item's lore
     * @param {number} lore The item's new lore
     */
    setLore(lore) {
        this.itemStack && this.itemStack.setLore(lore);
        if (this.data)
            this.data.entity.getInventory().setItem(this.data.slot, this);
    }
    /**
     * Set the item's name
     * @param {number} name The item's new name
     */
    setName(name) {
        this.itemStack && (this.itemStack.nameTag = name);
        if (this.data)
            this.data.entity.getInventory().setItem(this.data.slot, this);
    }
    /**
     * Trigger an item event
     * @param {string} event Event to trigger
     */
    triggerEvent(event) {
        this.itemStack?.triggerEvent(event);
    }
}
