import { world } from "mojang-minecraft";
const names = [];
/**
 * Database
 */
export class Database {
    /**
     * Create a new database!
     */
    constructor(name) {
        this.data = new Map();
        this.name = name.replace(/"/g, '\\"');
        if (names.includes(this.name))
            throw new Error(`You can't have 2 of the same databases`);
        if (this.name.length > 13 || this.name.length === 0)
            throw new Error(`Database names can't be more than 13 characters long, and it can't be nothing!`);
        names.push(this.name);
        runCommand(`scoreboard objectives add "DB_${this.name}" dummy`);
        world.scoreboard.getObjective(`DB_${this.name}`).getParticipants().forEach(e => this.data.set(e.displayName.split("_")[0].replace(/\\"/g, '"'), JSON.parse(e.displayName.split("_").filter((v, i) => i > 0).join("_").replace(/\\"/g, '"'))));
    }
    /**
     * The length of the database
     */
    get length() {
        return this.data.size;
    }
    /**
     * Set a value from a key
     * @param {string} key Key to set
     * @param {any} value The value
     */
    set(key, value) {
        if (key.includes('_'))
            throw new TypeError(`Database keys can't include "_"`);
        if ((JSON.stringify(value).replace(/"/g, '\\"').length + key.replace(/"/g, '\\"').length + 1) >= 32767)
            throw new Error(`Database setter to long... somehow`);
        this.delete(key);
        runCommand(`scoreboard players set "${key.replace(/"/g, '\\"')}_${JSON.stringify(value).replace(/"/g, '\\"')}" "DB_${this.name}" 0`);
        this.data.set(key, value);
    }
    /**
     * Get a value from a key
     * @param {string} key Key to get
     * @returns {any} The value that was set for the key (or undefined)
     */
    get(key) {
        if (this.data.has(key))
            return this.data.get(key);
    }
    /**
     * Test for whether or not the database has the key
     * @param {string} key Key to test for
     * @returns {boolean} Whether or not the database has the key
     */
    has(key) {
        if (!this.data.has(key))
            return false;
        return true;
    }
    /**
     * Delete a key from the database
     * @param {string} key Key to delete from the database
     */
    delete(key) {
        if (!this.data.has(key))
            return;
        runCommand(`scoreboard players reset "${key.replace(/"/g, '\\"')}_${JSON.stringify(this.data.get(key)).replace(/"/g, '\\"')}" "DB_${this.name}"`);
        this.data.delete(key);
    }
    /**
     * Get an array of all keys in the database
     * @returns {string[]} An array of all keys in the database
     */
    keys() {
        return Array.from(this.data.keys());
    }
    /**
     * Get an array of all values in the database
     * @returns {any[]} An array of all values in the database
     */
    values() {
        return Array.from(this.data.values());
    }
    /**
     * Clears all values in the database
     */
    clear() {
        runCommand(`scoreboard objectives remove "DB_${this.name}"`);
        runCommand(`scoreboard objectives add "DB_${this.name}" dummy`);
        this.data.clear();
    }
    /**
     * Loop through all keys and values of the database
     * @param {(key: string, value: any) => void} callback Code to run per loop
     */
    forEach(callback) {
        this.data.forEach((v, k) => callback(k, v));
    }
    *[Symbol.iterator]() {
        yield* this.data.entries();
    }
}
/**
 * Run a command!
 * @param {string} cmd Command to run
 * @returns {{ error: boolean, data: any }} Whether or not the command errors, and command data
 * @example runCommand(`give @a diamond`)
 */
function runCommand(cmd) {
    try {
        return { error: false, data: world.getDimension('overworld').runCommand(cmd) };
    }
    catch (e) {
        return { error: true, data: e };
    }
}
