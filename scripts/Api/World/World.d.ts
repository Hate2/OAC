import { Player } from "../Entity/index.js";
import { Dimension } from "./Dimension.js";
import { Dimension as DimensionType } from "../Types/Dimension.js";
export declare class World {
    /**
     * Broadcast a message for everyone to see
     * @param {string} message Message to broadcast
     */
    broadcast(message: string): void;
    /**
     * Get all players in the world
     * @returns {Player[]} All players in the world
     */
    getAllPlayers(): Player[];
    /**
     * Get the current tick (kinda like Date.now() but ticks)
     * @returns {number} The current tick
     */
    getCurrentTick(): number;
    /**
     * Get a dimension from a string
     * @param {DimensionType} dimension Dimension to get
     * @returns {Dimension} The actual dimension
     */
    getDimension(dimension: DimensionType): Dimension;
    /**
     * Get the world's tps
     * @returns {number} The tps of the world
     */
    getTps(): number;
}
