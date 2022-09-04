import { BlockLocation, Location } from "mojang-minecraft";
import { Block } from "../Block/index.js";
import { Entity, Player } from "../Entity/index";
import { locationFunctions } from "../utils";
export class Dimension {
    constructor(dimension) {
        this.dimension = dimension;
        this.id = dimension.id;
    }
    /**
     * Create an explosion
     * @param {Location | BlockLocation} location Location to create the explosion at
     * @param {number} radius The radius of the explosion
     * @param {ExplosionOptions} explosionOptions Explosion options
     */
    createExplosion(location, radius, explosionOptions) {
        this.dimension.createExplosion(location instanceof Location ? location : locationFunctions.blockLocationToLocation(location), radius, explosionOptions);
    }
    /**
     * Get a block from a block location
     * @param {BlockLocation | Location} location Location to get the block from
     * @returns {Block} The block at that location
     */
    getBlock(location) {
        return new Block(this.dimension.getBlock(location instanceof BlockLocation ? location : locationFunctions.locationToBlockLocation(location)));
    }
    /**
     * Get a block from a ray
     * @param {Location | BlockLocation} location Starting location
     * @param {Vector} direction The direction of the ray
     * @param {BlockRaycastOptions} options Block raycast options
     * @returns {Block} First block to intercept with the ray
     */
    getBlockFromRay(location, direction, options) {
        return new Block(this.dimension.getBlockFromRay(location instanceof Location ? location : locationFunctions.blockLocationToLocation(location), direction, options));
    }
    /**
     * Get all entities in the dimension
     * @param {EntityQueryOptions} options Entity query options
     * @returns {Entity[]} All entities in the dimension
     */
    getEntities(options) {
        return Array.from(this.dimension.getEntities(options), (eN) => eN.id !== "minecraft:player" ? new Entity(eN) : new Player(eN));
    }
    /**
     * Get all entities at a location
     * @param {Location | BlockLocation} location Location to get the entities from
     * @returns {Entity[]} All entities at that location
     */
    getEntitiesAtLocation(location) {
        return this.dimension.getEntitiesAtBlockLocation(location instanceof BlockLocation ? location : locationFunctions.locationToBlockLocation(location)).map(eN => new Entity(eN));
    }
    /**
     * Get all entities from a ray
     * @param {Location | BlockLocation} location Starting location
     * @param {Vector} direction The direction of the ray
     * @param {EntityRaycastOptions} options Entity raycast options
     * @returns {Entity[]} All entities to intercept with the ray
     */
    getEntitiesFromRay(location, direction, options) {
        return this.dimension.getEntitiesFromRay(location instanceof Location ? location : locationFunctions.blockLocationToLocation(location), direction, options).map(eN => new Entity(eN));
    }
    /**
     * Whether or not a block is air or not
     * @param {Location | BlockLocation} location Location to test with
     * @returns {boolean} Whether or not that location is empty (air)
     */
    isEmpty(location) {
        return this.dimension.isEmpty(location instanceof BlockLocation ? location : locationFunctions.locationToBlockLocation(location));
    }
    /**
     * Run a command
     * @param {string} command Command to run
     * @returns {any} Command data + error
     */
    runCommand(command) {
        try {
            return { error: false, ...this.dimension.runCommand(command) };
        }
        catch {
            return { error: true };
        }
    }
    /**
     * Runs a command asynchronously from the context of the broader dimension.
     * @param command Command to run
     * @returns {Promise<CommandResult>} Command stuff... idk
     */
    runCommandAsync(command) {
        return this.dimension.runCommandAsync(command);
    }
    /**
     * Spawn an item at a certain location
     * @param {string} id Id of the entity to spawn
     * @param {Location | BlockLocation} location The location to spawn the entity at
     * @returns {Entity} The entity that was spawned
     */
    spawnEntity(id, location) {
        return new Entity(this.dimension.spawnEntity(id, location));
    }
    /**
     * Spawn an item at a certain location
     * @param {Item} item Item to spawn
     * @param {Location | BlockLocation} location The location to spawn the item at
     * @returns {Entity} The entity that was spawned
     */
    spawnItem(item, location) {
        return new Entity(this.dimension.spawnItem(item.getItemStack(), location));
    }
}
