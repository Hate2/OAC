import { Commands } from "../Commands/index.js";
import { DatabaseUtils } from "../Database/index.js";
import { Events, ClientOptions } from "../Types/index.js";
import { World } from "../World/index";
export declare class Client {
    /**
     * The client options
     */
    readonly options?: ClientOptions;
    /**
     * Defines interactions done with the world
     */
    readonly world: World;
    /**
     * Create and remove game commands
     */
    readonly commands: Commands;
    /**
     * Database utilities
     */
    readonly database: DatabaseUtils;
    constructor(options?: ClientOptions);
    /**
     * Listen to an event, and run a callback off of it
     * @param {string} event Event to listen to
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    on<eventName extends keyof Events>(event: eventName, callback: (data: Events[eventName]) => void): any;
    /**
     * Remove a listener for an event
     * @param {eventName} event Event to remove a listener from
     */
    off(event: any): void;
    /**
     * Listen to an event once
     * @param {eventName} event Event to listen for (once)
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    once<eventName extends keyof Events>(event: eventName, callback: (data: Events[eventName]) => void): void;
    /**
     * Run a command
     * @param {string} cmd Command to run
     * @returns {{error: boolean, data: any}} Command error + data
     */
    runCommand(cmd: string): {
        error: boolean;
        data: any;
    };
    /**
     * Run an array of command
     * @param {string[]} cmds Commands to run
     */
    runCommands(cmds: string[]): void;
}
