import { Player as IPlayer, BlockRaycastOptions, CommandResult, Effect, Entity as IEntity, EntityRaycastOptions, IEntityComponent, Location, MinecraftEffectTypes, ScreenDisplay, Vector, XYRotation, BlockLocation } from "mojang-minecraft";
import { Block } from "../Block/Block.js";
import { EntityInventory } from "../Inventory/index.js";
import { Item } from "../Item/index.js";
import type { Gamemode, EntityComponents } from "../Types/index.js";
import { Dimension } from "../World/index.js";
export declare class Entity {
    /**
     * The entity
     */
    protected entity: IEntity;
    constructor(entity: IEntity);
    /**
     * Add an effect to the entity
     * @param {string} effect Effect to add to the entity
     * @param {number} duration Amount of time (in ticks) for the effect to last
     * @param {number} amplifier The strength of the effect
     * @param {boolean} showParticles Whether or not to show particles
     */
    addEffect(effect: keyof (typeof MinecraftEffectTypes), duration: number, amplifier?: number, showParticles?: boolean): void;
    /**
     * Add a score to an objective
     * @param {string} objective Objective to add the score to
     * @param {number} score Amount to add to the objective
     */
    addScore(objective: string, score: number): void;
    /**
     * Add a tag to the entity
     * @param {string} tag Tag to add to the entity
     * @returns {boolean} Whether or not the tag was added successfully
     */
    addTag(tag: string): boolean;
    /**
     * Find a tag with startWiths and endsWith options
     * @param {{ startsWith?: string, endsWith?: string }} tagOptions Tag options to find
     * @returns {string} Tag that is found, or undefined if nothing is found
     */
    findTag(tagOptions: {
        startsWith?: string;
        endsWith?: string;
    }): string;
    /**
     * Get the block in the entity's view vector
     * @param {BlockRaycastOptions} options Optional block raycast options
     * @returns {Block} Block in the entity's view vector
     */
    getBlockFromViewVector(options?: BlockRaycastOptions): Block;
    /**
     * Get a component from the player
     * @param {string} component Component to get from the entity
     * @returns {IEntityComponent} The component
     */
    getComponent<componentName extends keyof EntityComponents>(component: componentName): EntityComponents[componentName];
    /**
     * Get all components that the entity has
     * @returns {IEntityComponent[]} All components of the entity
     */
    getComponents(): IEntityComponent[];
    /**
     * Get the dimension of the entity
     * @returns {Dimension} The entity's dimension
     */
    getDimension(): Dimension;
    /**
     * Get a dynamic property from the entity
     * @param {string} identifier The id of the property you want to get
     * @returns {boolean | number | string} The value of the property
     */
    getDynamicProperty(identifier: string): boolean | number | string;
    /**
     * Get an effect that the entity has
     * @param {string} effect Effect to get
     * @returns {Effect} The effect that the entity has
     */
    getEffect<effect extends keyof (typeof MinecraftEffectTypes)>(effect: effect): Effect;
    /**
     * Get all (or one idk) entities in the entity's view vector
     * @param {EntityRaycastOptions} options Entity raycast options
     * @returns {Entity[]} An array of all entities (or first idk) in the entity's view vector
     */
    getEntitiesFromViewVector(options?: EntityRaycastOptions): Entity[];
    /**
     * Get the entity's head location
     * @returns {Location} The entity's head location
     */
    getHeadLocation(): Location;
    /**
     * Get the entity's health (if they have health)
     * @returns {number} The entity's health
     */
    getHealth(): number;
    /**
     * Get the entity's id
     * @returns {string} The entity's id
     */
    getId(): string;
    /**
     * Get the IEntity
     * @returns {IEntity} The IEntity
     */
    getIEntity(): IEntity;
    /**
     * Get the entity's inventory (if they have one)
     * @returns {EntityInventory} The entity's inventory
     */
    getInventory(): EntityInventory;
    /**
     * Get the entity's location
     * @returns {Location} The entity's location
     */
    getLocation(): Location;
    /**
     * Get the entity's max health (if they have health)
     * @returns {number} The entity's max health
     */
    getMaxHealth(): number;
    /**
     * Get the entity's name tag
     * @returns {string} The entity's nametag
     */
    getNameTag(): string;
    /**
     * Get the entity's rotation
     * @returns {XYRotation} The entity's rotation
     */
    getRotation(): XYRotation;
    /**
     * Get the entity's score on a scoreboard
     * @param {string} objective Objective name to get the score from
     * @param {boolean} useZero Whether or not to return 0 if error (normally returns NaN)
     * @returns {number} The score on the scoreboard
     */
    getScore(objective: string, useZero?: boolean): number;
    /**
     * Get all tags that the entity has
     * @returns {string[]} All tags of the entity
     */
    getTags(): string[];
    /**
     * Get the entity's target
     * @returns {Entity} The entity's target
     */
    getTarget(): Entity;
    /**
     * Get the entity's velocity
     * @returns {Vector} The entity's velocity
     */
    getVelocity(): Vector;
    /**
     * Get the entity's view vector
     * @returns {Vector} The entity's view vector
     */
    getViewVector(): Vector;
    /**
     * Test whether or not the entity has a certain component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the entity has the component
     */
    hasComponent(component: string): boolean;
    /**
     * Test for whether or not the player has a certain tag
     * @param {string} tag Tag to test for
     * @returns {boolean} Whether or not the entity has the tag
     */
    hasTag(tag: string): boolean;
    /**
     * Whether or not the entity is a player
     * @returns {Player} The entity but player
     */
    isPlayer(): this is Player;
    /**
     * Kill the entity
     */
    kill(): void;
    /**
     * Remove a dynamic property from the entity
     * @param {string} identifier Id of the property being removed
     * @returns {boolean} Whether or not it was removed successfully
     */
    removeDynamicProperty(identifier: string): boolean;
    /**
     * Remove a score from an objective
     * @param {string} objective Objective to remove the score from
     * @param {number} score Amount to remove from the objective
     */
    removeScore(objective: string, score: number): void;
    /**
     * Remove a tag from the entity
     * @param {string} tag Tag to remove from the entity
     * @returns {boolean} Whether or not the tag was removed successfully
     */
    removeTag(tag: string): boolean;
    /**
     * Make the entity run a command
     * @param {string} command Command to run
     * @returns {{ error: boolean, data?: any }} Command data + error
     */
    runCommand(command: string): {
        error: boolean;
        data?: any;
    };
    /**
     * Make the entity run an async command
     * @param {string} command Command to run
     * @returns {Promise<CommandResult>} i dont even know man...
     */
    runCommandAsync(command: string): Promise<CommandResult>;
    /**
     * Set a dynamic property
     * @param {string} identifier Id of the property to set
     * @param {boolean | number | string} value Value to set the property to
     */
    setDynamicProperty(identifier: string, value: boolean | number | string): void;
    /**
     * Set the entity's health (if they have health)
     * @param {number}  health Amount to set the entity's health too
     */
    setHealth(health: number): void;
    /**
     * Set the entity's nametag
     * @param {string} name The value to set the nametag to
     */
    setNameTag(name: string): void;
    /**
     * Set the main rotation of the entity
     * @param {number} degreesX Degrees on the X axis to set the rotation to
     * @param {number} degreesY Degrees on the Y axis to set the rotation to
     */
    setRotation(degreesX: number, degreesY: number): void;
    /**
     * Set a score for an objective
     * @param {string} objective Objective to set the score to
     * @param {number} score Amount to set for the objective
     */
    setScore(objective: string, score: number): void;
    /**
     * Set the velocity of the entity
     * @param {Vector} velocity New velocity for the entity
     */
    setVelocity(velocity: Vector): void;
    /**
     * Set the entity's target
     * @param {Entity} entity The entity to be the new entity's target
     */
    setTarget(entity: Entity): void;
    teleport(location: Location | BlockLocation, dimension?: Dimension, xRot?: number, yRot?: number, keepVelocity?: boolean): void;
    /**
     * Trigger an entity event
     * @param {string} event Event to trigger
     */
    triggerEvent(event: string): void;
}
export declare class Player extends Entity {
    protected entity: IPlayer;
    protected readonly _log: PlayerLog;
    constructor(player: IPlayer);
    /**
     * Add xp points to the player
     * @param {number} amount Amount of xp points to add to the player
     */
    addXpPoints(amount: number): void;
    /**
     * Add xp levels to the player
     * @param {number} amount Amount of xp levels to add to the player
     */
    addXpLevels(amount: number): void;
    /**
     * Clear the player's spawn point
     */
    clearRespawnPoint(): void;
    /**
     * Clear the player's title
     * @remarks Only clears title and subtitle, not actionbar
     */
    clearTitle(): void;
    /**
     * Get the player's gamemode
     * @returns {Gamemode} The player's gamemode
     */
    getGamemode(): Gamemode;
    /**
     * Get the item the player is holding
     * @returns {Item} The item the player is holding
     */
    getHeldItem(): Item;
    /**
     * Get the player's id
     * @returns {"minecraft:player"} The player's id
     */
    getId(): "minecraft:player";
    /**
     * Get the IPlayer
     * @returns {IPlayer} The IPlayer
     */
    getIEntity(): IPlayer;
    /**
     * Get an item cooldown from an item catagory
     * @param {string} itemCatagory Catagory of cooldown to test for
     * @returns {number} The length of that cooldown
     */
    getItemCooldown(itemCatagory: string): number;
    /**
     * Get the player's log (like a map attached to the player)
     * @returns {PlayerLog} The player's log
     */
    getLog(): PlayerLog;
    /**
     * Get the player's name
     * @returns {string} The player's name
     */
    getName(): string;
    /**
     * Get the player's screen display
     * @returns {ScreenDisplay} The player's screen display
     */
    getScreenDisplay(): ScreenDisplay;
    /**
     * Get the player's selected slot
     * @returns {number} The selected slot
     */
    getSelectedSlot(): number;
    /**
     * Test for whether or not the player is dead
     * @returns {boolean} Whether or not the player is dead
     */
    isDead(): boolean;
    /**
     * Test for whether or not the player is jumping
     * @returns {boolean} Whether or not the player is jumping
     */
    isJumping(): boolean;
    /**
     * Test for whether or not the player is moving
     * @returns {boolean} Whether or not the player is moving
     */
    isMoving(): boolean;
    /**
     * Test for whether or not the player is on fire
     * @returns {boolean} Whether or not the player is on fire
     */
    isOnFire(): boolean;
    /**
     * Test for whether or not the player is sleeping
     * @returns {boolean} Whether or not the player is sleeping
     */
    isSleeping(): boolean;
    /**
     * Test for whether or not the player is sneaking
     * @returns {boolean} Whether or not the player is sneaking
     */
    isSneaking(): boolean;
    /**
     * Test for whether or not the player is sprinting
     * @returns {boolean} Whether or not the player is sprinting
     */
    isSprinting(): boolean;
    /**
     * Test for whether or not the player is swimming
     * @returns {boolean} Whether or not the player is swimming
     */
    isSwimming(): boolean;
    /**
     * Test for whether or not the player is using an item
     * @returns {boolean} Whether or not the player is using an item
     */
    isUsingItem(): boolean;
    /**
     * Kick the player
     * @param {string} reason The reason they got kicked
     * @returns {boolean} Whether or not there was an error trying to kick the person
     */
    kick(reason?: string): void;
    /**
     * Message the player
     * @param {string} msg The message to send to the player
     */
    message(msg: any): void;
    /**
     * Set the player's gamemode
     * @param {Gamemode} gamemode The gamemode to set the player too
     */
    setGamemode(gamemode: Gamemode): void;
    /**
     * Set the item the player is holding
     * @param {Item} item The item that the player will be holding
     */
    setHeldItem(item: Item): void;
    /**
     * Make the player run a command
     * @param {string} command Command to run (includes custom commands)
     * @returns {any} Command data + error
     */
    runCommand(command: string): {
        error: boolean;
        data?: any;
    };
}
export declare class PlayerLog {
    protected name: string;
    protected _size: number;
    constructor(name: string);
    /**
     * Get a value from a key
     * @param {any} key The key of the value to get
     * @returns {any} The value of the key
     */
    get(key: any): any;
    /**
     * Set a value with a key
     * @param {any} key The key of the value
     * @param {any} value The value to set
     */
    set(key: any, value: any): void;
    /**
     * Delete a value with a key
     * @param {any} key Key to delete
     */
    delete(key: any): void;
    /**
     * Test if the log has a value from a key
     * @param {any} key Key to test for
     * @returns {boolean} Whether or not the log has said key
     */
    has(key: any): boolean;
    /**
     * Clear all values and keys from the log
     */
    clear(): void;
    /**
     * Get all keys in the log
     * @returns {IterableIterator<any>} All keys
     */
    keys(): IterableIterator<any>;
    /**
     * Get all values in the log
     * @returns {IterableIterator<any>} All values
     */
    values(): IterableIterator<any>;
    /**
     * Loop through all keys and values of the log
     * @param {(value: any, key: any) => void} callback Callback to run for every key and value
     * @param {any} thisArg ...idk
     */
    forEach(callback: (value: any, key: any) => void, thisArg?: any): void;
    /**
     * Get the size of the log
     * @returns {number} The size of the log
     */
    getSize(): number;
}
