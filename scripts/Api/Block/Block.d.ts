import { Block as IBlock, BlockLocation, BlockPermutation, BlockType, Location } from "mojang-minecraft";
import { BlockInventory } from "../Inventory/index.js";
import { Dimension } from "../World/index";
export declare class Block {
    protected readonly block: IBlock;
    constructor(block: IBlock);
    /**
     * Get the block's block location
     * @returns {BlockLocation} The block's block location
     */
    getBlockLocation(): BlockLocation;
    /**
     * Get a block component
     * @param {string} comp The component to get
     * @returns {any} The component
     */
    getComponent(comp: string): any;
    /**
     * Get the block's dimension
     * @returns {Dimension} The block's dimension
     */
    getDimension(): Dimension;
    /**
     * Get the block's id
     * @returns {string} The block's id
     */
    getId(): string;
    /**
     * Get the block's inventory
     * @returns {BlockInventory} The block's inventory
     */
    getInventory(): BlockInventory
    /**
     * Get the block's location
     * @returns {Location} The block's location
     */
    getLocation(): Location;
    /**
     * Get the block's permutation
     * @returns {BlockPermutation} The block's permutation
     */
    getPermutation(): BlockPermutation;
    /**
     * Get all the block's tags
     * @returns {string[]} All the block's tags
     */
    getTags(): string[];
    /**
     * Get the block's type
     * @returns {BlockType} The block's type
     */
    getType(): BlockType;
    /**
     * Test for whether or not the block has a certain tag
     * @param {string} tag Tag to test for
     * @returns {boolean} Whether or not the block has the tag
     */
    hasTag(tag: string): boolean;
    /**
     * Test for whether or not the block is empty (air)
     * @returns {boolean} Whether or not the block is empty
     */
    isEmpty(): boolean;
    /**
     * Test for whether or not the block is waterlogged
     * @returns {boolean} Whether or not the block is waterlogged
     */
    isWaterLogged(): boolean;
    /**
     * Set the block's permutation
     * @param {BlockPermutation} permutation Permutation to set the block to
     */
    setPermutation(permutation: BlockPermutation): void;
    /**
     * Set the block's type
     * @param {BlockType} type Type to set the block to
     */
    setType(type: BlockType): void;
}
