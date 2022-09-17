import { Player, world } from "mojang-minecraft"

export class PlayerLog {
    constructor() {
        /**@private */
        this.data = new Map()
        world.events.playerLeave.subscribe(({ playerName }) => this.data.has(playerName) && this.data.delete(playerName))
    }
    /**
     * Set a value to the player
     * @param {Player} player Player to set the log of
     * @param {any} value Value to set
     */
    set(player, value) {
        this.data.set(player.name, value)
    }
    /**
     * Set a value to the player
     * @param {Player} player Player to set the log of
     * @returns {any} The value
     */
    get(player) {
        return this.data.get(player.name)
    }
    /**
     * Delete a value for a player
     * @param {Player} player Player to delete the value of
     */
    delete(player) {
        this.data.delete(player.name)
    }
    /**
     * Clear the log
     */
    clear() {
        this.data.clear()
    }
    /**
     * The size of the log
     */
    get size() {
        return this.data.size
    }
}