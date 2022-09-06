import { BlockInventory } from "../Inventory/index.js";
import { locationFunctions } from "../utils";
import { Dimension } from "../World/index";
export class Block {
    constructor(block) {
        this.block = block;
    }
    /**
     * Get the block's block location
     * @returns {BlockLocation} The block's block location
     */
    getBlockLocation() {
        return this.block.location;
    }
    /**
     * Get a block component
     * @param {string} comp The component to get
     * @returns {any} The component
     */
    getComponent(comp) {
        return this.block.getComponent(comp);
    }
    /**
     * Get the block's dimension
     * @returns {Dimension} The block's dimension
     */
    getDimension() {
        return new Dimension(this.block.dimension);
    }
    /**
     * Get the block's id
     * @returns {string} The block's id
     */
    getId() {
        return this.block?.id;
    }
    getInventory() {
        return new BlockInventory(this.block)
    }
    /**
     * Get the block's location
     * @returns {Location} The block's location
     */
    getLocation() {
        return locationFunctions.blockLocationToLocation(this.block.location);
    }
    /**
     * Get the block's permutation
     * @returns {BlockPermutation} The block's permutation
     */
    getPermutation() {
        return this.block.permutation;
    }
    /**
     * Get all the block's tags
     * @returns {string[]} All the block's tags
     */
    getTags() {
        return this.block.getTags();
    }
    /**
     * Get the block's type
     * @returns {BlockType} The block's type
     */
    getType() {
        return this.block.type;
    }
    /**
     * Test for whether or not the block has a certain tag
     * @param {string} tag Tag to test for
     * @returns {boolean} Whether or not the block has the tag
     */
    hasTag(tag) {
        return this.block.hasTag(tag);
    }
    /**
     * Test for whether or not the block is empty (air)
     * @returns {boolean} Whether or not the block is empty
     */
    isEmpty() {
        return this.block.isEmpty;
    }
    /**
     * Test for whether or not the block is waterlogged
     * @returns {boolean} Whether or not the block is waterlogged
     */
    isWaterLogged() {
        return this.block.isWaterlogged;
    }
    /**
     * Set the block's permutation
     * @param {BlockPermutation} permutation Permutation to set the block to
     */
    setPermutation(permutation) {
        this.block.setPermutation(permutation);
    }
    /**
     * Set the block's type
     * @param {BlockType} type Type to set the block to
     */
    setType(type) {
        this.block.setType(type);
    }
}
