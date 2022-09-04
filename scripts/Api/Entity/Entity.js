import { Location, MinecraftEffectTypes, world } from "mojang-minecraft";
import { Block } from "../Block/Block.js";
import { Commands } from "../Commands/index.js";
import { EntityInventory } from "../Inventory/index.js";
import { locationFunctions } from "../utils.js";
import { Dimension } from "../World/index.js";
export class Entity {
    constructor(entity) {
        this.entity = entity;
    }
    /**
     * Add an effect to the entity
     * @param {string} effect Effect to add to the entity
     * @param {number} duration Amount of time (in ticks) for the effect to last
     * @param {number} amplifier The strength of the effect
     * @param {boolean} showParticles Whether or not to show particles
     */
    addEffect(effect, duration, amplifier, showParticles) {
        this.entity.addEffect(MinecraftEffectTypes[effect], duration, amplifier, showParticles);
    }
    /**
     * Add a score to an objective
     * @param {string} objective Objective to add the score to
     * @param {number} score Amount to add to the objective
     */
    addScore(objective, score) {
        this.runCommand(`scoreboard players add @s "${objective}" ${score}`);
    }
    /**
     * Add a tag to the entity
     * @param {string} tag Tag to add to the entity
     * @returns {boolean} Whether or not the tag was added successfully
     */
    addTag(tag) {
        return this.entity.addTag(tag);
    }
    /**
     * Find a tag with startWiths and endsWith options
     * @param {{ startsWith?: string, endsWith?: string }} tagOptions Tag options to find
     * @returns {string} Tag that is found, or undefined if nothing is found
     */
    findTag(tagOptions) {
        if ("startsWith" in tagOptions && "endsWith" in tagOptions)
            return this.entity.getTags().find(tag => tag.startsWith(tagOptions.startsWith) && tag.endsWith(tagOptions.endsWith));
        if ("startsWith" in tagOptions)
            return this.entity.getTags().find(tag => tag.startsWith(tagOptions.startsWith));
        if ("endsWith" in tagOptions)
            return this.entity.getTags().find(tag => tag.endsWith(tagOptions.endsWith));
        return undefined;
    }
    /**
     * Get the block in the entity's view vector
     * @param {BlockRaycastOptions} options Optional block raycast options
     * @returns {Block} Block in the entity's view vector
     */
    getBlockFromViewVector(options) {
        return new Block(this.entity.getBlockFromViewVector(options));
    }
    /**
     * Get a component from the player
     * @param {string} component Component to get from the entity
     * @returns {IEntityComponent} The component
     */
    getComponent(component) {
        //@ts-ignore
        return this.entity.getComponent(component);
    }
    /**
     * Get all components that the entity has
     * @returns {IEntityComponent[]} All components of the entity
     */
    getComponents() {
        return this.entity.getComponents();
    }
    /**
     * Get the dimension of the entity
     * @returns {Dimension} The entity's dimension
     */
    getDimension() {
        return new Dimension(this.entity.dimension);
    }
    /**
     * Get a dynamic property from the entity
     * @param {string} identifier The id of the property you want to get
     * @returns {boolean | number | string} The value of the property
     */
    getDynamicProperty(identifier) {
        return this.entity.getDynamicProperty(identifier);
    }
    /**
     * Get an effect that the entity has
     * @param {string} effect Effect to get
     * @returns {Effect} The effect that the entity has
     */
    getEffect(effect) {
        return this.entity.getEffect(MinecraftEffectTypes[effect]);
    }
    /**
     * Get all (or one idk) entities in the entity's view vector
     * @param {EntityRaycastOptions} options Entity raycast options
     * @returns {Entity[]} An array of all entities (or first idk) in the entity's view vector
     */
    getEntitiesFromViewVector(options) {
        return this.entity.getEntitiesFromViewVector(options).map(entity => new Entity(entity));
    }
    /**
     * Get the entity's head location
     * @returns {Location} The entity's head location
     */
    getHeadLocation() {
        return this.entity.headLocation;
    }
    /**
     * Get the entity's health (if they have health)
     * @returns {number} The entity's health
     */
    getHealth() {
        return this.getComponent('health')?.current;
    }
    /**
     * Get the entity's id
     * @returns {string} The entity's id
     */
    getId() {
        return this.entity.id;
    }
    /**
     * Get the IEntity
     * @returns {IEntity} The IEntity
     */
    getIEntity() {
        return this.entity;
    }
    /**
     * Get the entity's inventory (if they have one)
     * @returns {EntityInventory} The entity's inventory
     */
    getInventory() {
        return this.hasComponent('inventory') ? new EntityInventory(this) : undefined;
    }
    /**
     * Get the entity's location
     * @returns {Location} The entity's location
     */
    getLocation() {
        return this.entity.location;
    }
    /**
     * Get the entity's max health (if they have health)
     * @returns {number} The entity's max health
     */
    getMaxHealth() {
        const health = this.getHealth();
        this.getComponent('health').resetToMaxValue();
        const z = this.getHealth();
        this.setHealth(health);
        return z;
    }
    /**
     * Get the entity's name tag
     * @returns {string} The entity's nametag
     */
    getNameTag() {
        return this.entity.nameTag;
    }
    /**
     * Get the entity's rotation
     * @returns {XYRotation} The entity's rotation
     */
    getRotation() {
        return this.entity.rotation;
    }
    /**
     * Get the entity's score on a scoreboard
     * @param {string} objective Objective name to get the score from
     * @param {boolean} useZero Whether or not to return 0 if error (normally returns NaN)
     * @returns {number} The score on the scoreboard
     */
    getScore(objective, useZero) {
        try {
            const obj = world.scoreboard.getObjective(objective);
            return obj.getScore(this.entity.scoreboard);
        }
        catch {
            return useZero ? 0 : NaN;
        }
    }
    /**
     * Get all tags that the entity has
     * @returns {string[]} All tags of the entity
     */
    getTags() {
        return this.entity.getTags();
    }
    /**
     * Get the entity's target
     * @returns {Entity} The entity's target
     */
    getTarget() {
        return new Entity(this.entity.target);
    }
    /**
     * Get the entity's velocity
     * @returns {Vector} The entity's velocity
     */
    getVelocity() {
        return this.entity.velocity;
    }
    /**
     * Get the entity's view vector
     * @returns {Vector} The entity's view vector
     */
    getViewVector() {
        return this.entity.viewVector;
    }
    /**
     * Test whether or not the entity has a certain component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the entity has the component
     */
    hasComponent(component) {
        return this.entity.hasComponent(component);
    }
    /**
     * Test for whether or not the player has a certain tag
     * @param {string} tag Tag to test for
     * @returns {boolean} Whether or not the entity has the tag
     */
    hasTag(tag) {
        return this.entity.hasTag(tag);
    }
    /**
     * Whether or not the entity is a player
     * @returns {Player} The entity but player
     */
    isPlayer() {
        return this.getId() === "minecraft:player";
    }
    /**
     * Kill the entity
     */
    kill() {
        this.entity.kill();
    }
    /**
     * Remove a dynamic property from the entity
     * @param {string} identifier Id of the property being removed
     * @returns {boolean} Whether or not it was removed successfully
     */
    removeDynamicProperty(identifier) {
        return this.entity.removeDynamicProperty(identifier);
    }
    /**
     * Remove a score from an objective
     * @param {string} objective Objective to remove the score from
     * @param {number} score Amount to remove from the objective
     */
    removeScore(objective, score) {
        this.runCommand(`scoreboard players remove @s "${objective}" ${score}`);
    }
    /**
     * Remove a tag from the entity
     * @param {string} tag Tag to remove from the entity
     * @returns {boolean} Whether or not the tag was removed successfully
     */
    removeTag(tag) {
        return this.entity.removeTag(tag);
    }
    /**
     * Make the entity run a command
     * @param {string} command Command to run
     * @returns {{ error: boolean, data?: any }} Command data + error
     */
    runCommand(command) {
        try {
            return { error: false, data: this.entity.runCommand(command) };
        }
        catch {
            return { error: true };
        }
    }
    /**
     * Make the entity run an async command
     * @param {string} command Command to run
     * @returns {Promise<CommandResult>} i dont even know man...
     */
    runCommandAsync(command) {
        return this.entity.runCommandAsync(command);
    }
    /**
     * Set a dynamic property
     * @param {string} identifier Id of the property to set
     * @param {boolean | number | string} value Value to set the property to
     */
    setDynamicProperty(identifier, value) {
        this.entity.setDynamicProperty(identifier, value);
    }
    /**
     * Set the entity's health (if they have health)
     * @param {number}  health Amount to set the entity's health too
     */
    setHealth(health) {
        this.getComponent('health')?.setCurrent(health);
    }
    /**
     * Set the entity's nametag
     * @param {string} name The value to set the nametag to
     */
    setNameTag(name) {
        this.entity.nameTag = name;
    }
    /**
     * Set the main rotation of the entity
     * @param {number} degreesX Degrees on the X axis to set the rotation to
     * @param {number} degreesY Degrees on the Y axis to set the rotation to
     */
    setRotation(degreesX, degreesY) {
        this.entity.setRotation(degreesX, degreesY);
    }
    /**
     * Set a score for an objective
     * @param {string} objective Objective to set the score to
     * @param {number} score Amount to set for the objective
     */
    setScore(objective, score) {
        this.runCommand(`scoreboard players set @s "${objective}" ${score}`);
    }
    /**
     * Set the velocity of the entity
     * @param {Vector} velocity New velocity for the entity
     */
    setVelocity(velocity) {
        this.entity.setVelocity(velocity);
    }
    /**
     * Set the entity's target
     * @param {Entity} entity The entity to be the new entity's target
     */
    setTarget(entity) {
        this.entity.target = entity.entity;
    }
    teleport(location, dimension, xRot, yRot, keepVelocity) {
        //@ts-ignore
        this.entity.teleport(location instanceof Location ? location : locationFunctions.blockLocationToLocation(location), dimension ?? this.getDimension().dimension, xRot ?? this.getRotation().x, yRot ?? this.getRotation().y, keepVelocity);
    }
    /**
     * Trigger an entity event
     * @param {string} event Event to trigger
     */
    triggerEvent(event) {
        this.entity.triggerEvent(event);
    }
}
export class Player extends Entity {
    constructor(player) {
        super(player);
        this._log = new PlayerLog(player.name);
    }
    /**
     * Add xp points to the player
     * @param {number} amount Amount of xp points to add to the player
     */
    addXpPoints(amount) {
        if (!Number.isSafeInteger(amount))
            return;
        this.runCommand(`/xp ${amount} @s`);
    }
    /**
     * Add xp levels to the player
     * @param {number} amount Amount of xp levels to add to the player
     */
    addXpLevels(amount) {
        if (!Number.isSafeInteger(amount))
            return;
        this.runCommand(`/xp ${amount}L @s`);
    }
    /**
     * Clear the player's spawn point
     */
    clearRespawnPoint() {
        this.runCommand(`/clearspawnpoint @s`);
    }
    /**
     * Clear the player's title
     * @remarks Only clears title and subtitle, not actionbar
     */
    clearTitle() {
        this.runCommand(`/title @s clear`);
    }
    /**
     * Get the player's gamemode
     * @returns {Gamemode} The player's gamemode
     */
    getGamemode() {
        const survivalTest = this.runCommand(`testfor @s[m=0]`).error;
        if (!survivalTest)
            return 'survival';
        const creativeTest = this.runCommand(`testfor @s[m=1]`).error;
        if (!creativeTest)
            return 'creative';
        const adventureTest = this.runCommand(`testfor @s[m=2]`).error;
        if (!adventureTest)
            return 'adventure';
        return 'unknown';
    }
    /**
     * Get the item the player is holding
     * @returns {Item} The item the player is holding
     */
    getHeldItem() {
        return this.getInventory().getItem(this.entity.selectedSlot);
    }
    /**
     * Get the player's id
     * @returns {"minecraft:player"} The player's id
     */
    getId() {
        return this.entity.id;
    }
    /**
     * Get the IPlayer
     * @returns {IPlayer} The IPlayer
     */
    getIEntity() {
        return this.entity;
    }
    /**
     * Get an item cooldown from an item catagory
     * @param {string} itemCatagory Catagory of cooldown to test for
     * @returns {number} The length of that cooldown
     */
    getItemCooldown(itemCatagory) {
        return this.entity.getItemCooldown(itemCatagory);
    }
    /**
     * Get the player's log (like a map attached to the player)
     * @returns {PlayerLog} The player's log
     */
    getLog() {
        return this._log;
    }
    /**
     * Get the player's name
     * @returns {string} The player's name
     */
    getName() {
        return this.entity.name;
    }
    /**
     * Get the player's screen display
     * @returns {ScreenDisplay} The player's screen display
     */
    getScreenDisplay() {
        return this.entity.onScreenDisplay;
    }
    /**
     * Get the player's selected slot
     * @returns {number} The selected slot
     */
    getSelectedSlot() {
        return this.entity.selectedSlot;
    }
    /**
     * Test for whether or not the player is dead
     * @returns {boolean} Whether or not the player is dead
     */
    isDead() {
        return this.hasTag(`is_dead`);
    }
    /**
     * Test for whether or not the player is jumping
     * @returns {boolean} Whether or not the player is jumping
     */
    isJumping() {
        return this.hasTag(`is_jumping`);
    }
    /**
     * Test for whether or not the player is moving
     * @returns {boolean} Whether or not the player is moving
     */
    isMoving() {
        return this.hasTag(`is_moving`);
    }
    /**
     * Test for whether or not the player is on fire
     * @returns {boolean} Whether or not the player is on fire
     */
    isOnFire() {
        return this.hasTag('is_on_fire');
    }
    /**
     * Test for whether or not the player is sleeping
     * @returns {boolean} Whether or not the player is sleeping
     */
    isSleeping() {
        return this.hasTag('is_sleeping');
    }
    /**
     * Test for whether or not the player is sneaking
     * @returns {boolean} Whether or not the player is sneaking
     */
    isSneaking() {
        return this.hasTag('is_sneaking');
    }
    /**
     * Test for whether or not the player is sprinting
     * @returns {boolean} Whether or not the player is sprinting
     */
    isSprinting() {
        return this.hasTag('is_sprinting');
    }
    /**
     * Test for whether or not the player is swimming
     * @returns {boolean} Whether or not the player is swimming
     */
    isSwimming() {
        return this.hasTag('is_swimming');
    }
    /**
     * Test for whether or not the player is using an item
     * @returns {boolean} Whether or not the player is using an item
     */
    isUsingItem() {
        return this.hasTag('is_using_item');
    }
    /**
     * Kick the player
     * @param {string} reason The reason they got kicked
     * @returns {boolean} Whether or not there was an error trying to kick the person
     */
    kick(reason) {
        return this.runCommand(`kick ${JSON.stringify(this.getName())} ${reason ?? ''}`).error;
    }
    /**
     * Message the player
     * @param {string} msg The message to send to the player
     */
    message(msg) {
        this.runCommand(`tellraw @s {"rawtext":[{"text":"${(typeof msg === "string" ? msg : typeof msg === "number" ? msg.toString() : JSON.stringify(msg)).replace(/"/g, '\\"')}"}]}`);
    }
    /**
     * Set the player's gamemode
     * @param {Gamemode} gamemode The gamemode to set the player too
     */
    setGamemode(gamemode) {
        if (gamemode !== 'unknown')
            this.runCommand(`gamemode ${gamemode} @s`);
    }
    /**
     * Set the item the player is holding
     * @param {Item} item The item that the player will be holding
     */
    setHeldItem(item) {
        this.getInventory().setItem(this.entity.selectedSlot, item);
    }
    /**
     * Make the player run a command
     * @param {string} command Command to run (includes custom commands)
     * @returns {any} Command data + error
     */
    runCommand(command) {
        try {
            if (command.startsWith('/'))
                return { error: false, data: this.entity.runCommand(command.slice(1)) };
            const args = command.trim().split(/\s+/g);
            const cmdName = args.shift().toLowerCase();
            const data = Commands.registeredCommands.find(cmd => cmd.name === cmdName || cmd.aliases?.includes(cmdName));
            if (!data)
                return { error: false, data: this.entity.runCommand(command) };
            data.callback({ player: this, args });
            return { error: false };
        }
        catch {
            return { error: true };
        }
    }
}
export class PlayerLog {
    constructor(name) {
        this.name = name;
        this._size = 0;
    }
    /**
     * Get a value from a key
     * @param {any} key The key of the value to get
     * @returns {any} The value of the key
     */
    get(key) {
        return playerLog.get(this.name).get(key);
    }
    /**
     * Set a value with a key
     * @param {any} key The key of the value
     * @param {any} value The value to set
     */
    set(key, value) {
        const map = playerLog.get(this.name);
        map.set(key, value);
        this._size++;
        playerLog.set(this.name, map);
    }
    /**
     * Delete a value with a key
     * @param {any} key Key to delete
     */
    delete(key) {
        playerLog.get(this.name).delete(key);
        this._size--;
    }
    /**
     * Test if the log has a value from a key
     * @param {any} key Key to test for
     * @returns {boolean} Whether or not the log has said key
     */
    has(key) {
        return playerLog.get(this.name).has(key);
    }
    /**
     * Clear all values and keys from the log
     */
    clear() {
        playerLog.get(this.name).clear();
    }
    /**
     * Get all keys in the log
     * @returns {IterableIterator<any>} All keys
     */
    keys() {
        return playerLog.get(this.name).keys();
    }
    /**
     * Get all values in the log
     * @returns {IterableIterator<any>} All values
     */
    values() {
        return playerLog.get(this.name).values();
    }
    /**
     * Loop through all keys and values of the log
     * @param {(value: any, key: any) => void} callback Callback to run for every key and value
     * @param {any} thisArg ...idk
     */
    forEach(callback, thisArg) {
        playerLog.get(this.name).forEach(callback, thisArg);
    }
    /**
     * Get the size of the log
     * @returns {number} The size of the log
     */
    getSize() {
        return this._size;
    }
}
const playerLog = new Map();
world.events.playerJoin.subscribe(({ player }) => playerLog.set(player.name, new Map()));
world.events.playerLeave.subscribe(({ playerName }) => playerLog.delete(playerName));
for (const { name } of world.getPlayers())
    playerLog.set(name, new Map());
