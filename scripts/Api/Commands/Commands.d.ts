import { ClientOptions } from '../Types/index';
import { Player } from "../Entity/index";
import { CommandData, CommandInfo } from "../Types/index";
export declare class Commands {
    static registeredCommands: CommandData[];
    static clients: ClientOptions[];
    options?: ClientOptions;
    constructor(options?: ClientOptions);
    /**
     * Create a new command
     * @param {CommandInfo} info The command info
     * @param {(data: {player: Player, args: string[]}) => void} callback Code to run when the command is ran
     */
    create(info: CommandInfo, callback: (data: {
        player: Player;
        args: string[];
    }) => void): void;
    /**
     * Remove a command
     * @param {string} command The name of the command to remove
     */
    remove(command: string): void;
    /**
     * Loop through all commands
     * @param {(value: CommandData, index: number, array: CommandData[]) => void} callback Code to run per loop
     * @param {any} thisArg The value of this "this" word
     */
    forEach(callback: (value: CommandData, index: number, array: CommandData[]) => void, thisArg?: any): void;
    /**
     * Clear all commands
     */
    clear(): void;
}
