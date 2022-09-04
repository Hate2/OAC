import { BlockLocation, Location } from "mojang-minecraft";
import { Entity } from "./Entity/index";
/**
 * Delay executing a function
 * @param {() => void} callback Code you want to execute when the delay is finished
 * @param {number} tick Time in ticks until the callback runs
 * @param {boolean} loop Whether or not the code should loop or not
 * @example setTickTimeout(() => {
 * console.warn(`This was called after 20 ticks!`)
 * }, 20)
 */
export declare function setTickTimeout(callback: () => void, tick: number, loop?: boolean): any;
/**
 * Clear a tick timeout
 * @param {any} timeout Timeout to clear
 */
export declare function clearTickTimeout(timeout: any): void;
/**
 * Broadcast a message
 * @param {string} message Message to broadcast
 * @example broadcastMessage('This message was sent to everyone!')
 */
export declare function broadcastMessage(message: string): void;
export declare const locationFunctions: {
    /**
     * Converts a location to a block location
     * @param {Location} loc The BlockLocation of the Location
     * @returns {BlockLocation} The block location of the location
     */
    locationToBlockLocation(loc: Location): BlockLocation;
    /**
     * Converts a block location to a location
     * @param {BlockLocation} loc The Location of the BlockLocation
     * @returns {Location} The location of the block location
     */
    blockLocationToLocation(loc: BlockLocation): Location;
    /**
     * Convert coords into a location
     * @param {[number, number, number]} coords Coords to turn into a location
     * @returns {Location} Location from the coords
     */
    coordsToLocation(coords: [number, number, number]): Location;
    /**
     * Convert coords into a block location
     * @param {[number, number, number]} coords Coords to turn into a block location
     * @returns {BlockLocation} BlockLocation from the coords
     */
    coordsToBlockLocation(coords: [number, number, number]): BlockLocation;
    /**
     * Convert a location to coords
     * @param {Location} loc Location to convert into coords
     * @returns {[number, number, number]} Coords
     */
    locationToCoords(loc: Location): [number, number, number];
    /**
     * Convert a block location to coords
     * @param {BlockLocation} loc BlockLocation to convert into coords
     * @returns {[number, number, number]} Coords
     */
    blockLocationToCoords(loc: BlockLocation): [number, number, number];
};
/**
 * Run a command!
 * @param {string} cmd Command to run
 * @param {Entity} executor Entity to run the command
 * @returns {{ error: boolean, data: any }} Whether or not the command errors, and command data
 * @example runCommand(`give @s diamond`, player)
 */
export declare function runCommand(cmd: string, executor?: Entity): {
    error: boolean;
    data: any;
};
/**
 * Run an array of commands (if a command starts with "%", then it will be conditional!)
 * @param {string[]} commands Commands to run
 * @param {Entity} executor Entity to run all of the commands
 * @returns {{error: boolean}} Whether or not there was an error running all the commands
 * @example runCommands([
 * `testfor @s[hasitem={item=dirt}]`,
 * `%say I have dirt in my hand!`
 * ], player)
 */
export declare function runCommands(commands: string[], executor?: Entity): void;
/**
 * Wait a certain amount of ticks
 * @param {number} ticks Amount of ticks to wait
 * @returns {Promise<void>} No need to mess with this
 */
export declare function wait(ticks: number): Promise<void>;
