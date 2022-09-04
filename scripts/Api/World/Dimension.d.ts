import { BlockLocation, BlockRaycastOptions, CommandResult, Dimension as IDimension, EntityQueryOptions, EntityRaycastOptions, ExplosionOptions, Location, Vector } from "mojang-minecraft";
import { Block } from "../Block/index.js";
import { Entity } from "../Entity/index";
import { Item } from "../Item/index";
export declare class Dimension {
    protected readonly dimension: IDimension;
    /**
     * The id of the dimension
     */
    readonly id: string;
    constructor(dimension: IDimension);
    /**
     * Create an explosion
     * @param {Location | BlockLocation} location Location to create the explosion at
     * @param {number} radius The radius of the explosion
     * @param {ExplosionOptions} explosionOptions Explosion options
     */
    createExplosion(location: Location | BlockLocation, radius: number, explosionOptions: ExplosionOptions): void;
    /**
     * Get a block from a block location
     * @param {BlockLocation | Location} location Location to get the block from
     * @returns {Block} The block at that location
     */
    getBlock(location: BlockLocation | Location): Block;
    /**
     * Get a block from a ray
     * @param {Location | BlockLocation} location Starting location
     * @param {Vector} direction The direction of the ray
     * @param {BlockRaycastOptions} options Block raycast options
     * @returns {Block} First block to intercept with the ray
     */
    getBlockFromRay(location: Location | BlockLocation, direction: Vector, options?: BlockRaycastOptions): Block;
    /**
     * Get all entities in the dimension
     * @param {EntityQueryOptions} options Entity query options
     * @returns {Entity[]} All entities in the dimension
     */
    getEntities(options?: EntityQueryOptions): Entity[];
    /**
     * Get all entities at a location
     * @param {Location | BlockLocation} location Location to get the entities from
     * @returns {Entity[]} All entities at that location
     */
    getEntitiesAtLocation(location: Location | BlockLocation): Entity[];
    /**
     * Get all entities from a ray
     * @param {Location | BlockLocation} location Starting location
     * @param {Vector} direction The direction of the ray
     * @param {EntityRaycastOptions} options Entity raycast options
     * @returns {Entity[]} All entities to intercept with the ray
     */
    getEntitiesFromRay(location: Location | BlockLocation, direction: Vector, options?: EntityRaycastOptions): Entity[];
    /**
     * Whether or not a block is air or not
     * @param {Location | BlockLocation} location Location to test with
     * @returns {boolean} Whether or not that location is empty (air)
     */
    isEmpty(location: Location | BlockLocation): boolean;
    /**
     * Run a command
     * @param {string} command Command to run
     * @returns {any} Command data + error
     */
    runCommand(command: string): any;
    /**
     * Runs a command asynchronously from the context of the broader dimension.
     * @param command Command to run
     * @returns {Promise<CommandResult>} Command stuff... idk
     */
    runCommandAsync(command: string): Promise<CommandResult>;
    /**
     * Spawn an item at a certain location
     * @param {string} id Id of the entity to spawn
     * @param {Location | BlockLocation} location The location to spawn the entity at
     * @returns {Entity} The entity that was spawned
     */
    spawnEntity(id: string, location: Location | BlockLocation): Entity;
    /**
     * Spawn an item at a certain location
     * @param {Item} item Item to spawn
     * @param {Location | BlockLocation} location The location to spawn the item at
     * @returns {Entity} The entity that was spawned
     */
    spawnItem(item: Item, location: Location | BlockLocation): Entity;
}
