//              _______   _______   _______ 
//             |   _   | |   _   | |   _   |
//             |.  |   | |.  1   | |.  1___|
//             |.  |   | |.  _   | |.  |___ 
//             |:  1   | |:  |   | |:  1   |
//             |::.. . | |::.|:. | |::.. . |
//             `-------' `--- ---' `-------'
//              01001111 01000001 01000011 
//                    - Anti-Cheat -

import { world, Player, Entity, BlockLocation, Location } from "mojang-minecraft";
import { config } from "./globalVars.js"
import { banDB } from "./index.js"

/**
 * Broadcast a message
 * @param {string} message Message to broadcast
 * @example broadcastMessage('This message was sent to everyone!')
 */
export function broadcastMessage(message) {
    world.getDimension('overworld').runCommandAsync(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`)
}

/**
 * Message a player
 * @param {Player} player Player to send the message to
 * @param {string} message Message to send to the player
 * @example messagePlayer(player, "This message was sent only to you!")
 */
export function messagePlayer(player, message) {
    player.runCommandAsync(`tellraw @s ${JSON.stringify({ rawtext: [{ text: message }] })}`)
}

/**
 * Ban a player
 * @param {Player} player Player to ban
 * @param {string} reason The reason the player is banned
 * @example banPlayer(player, "Hacking!")
 */
export function banPlayer(player, reason) {
    banDB.set(player.name, reason)
    broadcastMessage(`§7[§9OAC§7] §c${JSON.stringify(player.name).slice(1, -1)} was banned${reason ? ` due to: §3${reason}` : `!`}`)
    player.runCommandAsync(`scoreboard players set @s oac_bans 1`)
    player.runCommandAsync(`kick ${JSON.stringify(player.name)} §7[§9OAC§7] §cYou have been banned!\n§3Reason: ${reason ?? "No reason specified!"}`)
}

/**
 * Test for whether or not a player is an admin
 * @param {Player} player Player to test with
 * @returns {boolean} Whether or not they are admin
 */
export function isAdmin(player) {
    return getScore(config.adminScoreboard, player, true) === 0 ? false : true
}

world.events.worldInitialize.subscribe(() => { for (const pL of world.getPlayers()) pNA.push(pL.name) })

/**
 * Run code when a player joins
 * @param {(player: Player) => void} callback Code to run when a player joins
 * @example onPlayerJoin(player => {
 * console.warn(player.name)
 * })
 */
export function onPlayerJoin(callback) {
    if (jT) throw new Error(`There can only be 1 onPlayerJoin callback!`)
    jT = true
    world.events.tick.subscribe(() => {
        for (const pL of world.getPlayers()) if (!pNA.includes((pL.name))) { pNA.push(pL.name); callback(pL); }
    })
    world.events.playerLeave.subscribe(({ playerName }) => pNA.splice(pNA.findIndex(pL => pL === playerName), 1))
}

const pNA = []
let jT = false

/**
 * Get the score of a target on an objective
 * @param {string} objective Objective to get a score from
 * @param {Entity|string} target The entity, player, or fake player to get the score of
 * @param {boolean} useZero Specifies whether to return NaN or 0 if an error is thrown
 * @returns {number} The target's score, or NaN / 0 if error
 * @example getScore('Money', player, true) //Returns the value of the scoreboard "Money", or 0 if error
 */
export function getScore(objective, target, useZero = false) {
    try {
        const oB = world.scoreboard.getObjective(objective)
        if (typeof target == 'string') return oB.getScore(oB.getParticipants().find(pT => pT.displayName === target))
        return oB.getScore(target.scoreboard)
    } catch {
        return useZero ? 0 : NaN
    }
}

export class TickTimeout {
    /**
     * Delay running a function
     * @param {() => void} callback Code to run when the time is up
     * @param {number} ticks Amount of ticks until the code is ran
     */
    constructor(callback, ticks) {
        /**@private */
        this.ticks = ticks;
        ticks = 0;
        /**@private */
        this.event = world.events.tick.subscribe(() => {
            if (this.ticks > ticks++)
                return;
            world.events.tick.unsubscribe(this.event);
            this.event = undefined;
            try {
                callback();
            }
            catch (e) {
                console.warn(`Error: ${e}, Stack: ${e.stack}`);
            }
        });
    }
    /**
     * Stop the tick timeout from running
     */
    destroy() {
        this.event && world.events.tick.unsubscribe(this.event);
    }
    /**
     * Set the amount of time until the function is ran
     * @param {number} ticks Amount of time until the function is ran
     */
    setTicks(ticks) {
        this.ticks = ticks;
    }
}

/**
 * Delay executing a function
 * @param {() => void} callback Code you want to execute when the delay is finished
 * @param {number} tick Time in ticks until the callback runs
 * @param {boolean} loop Whether or not the code should loop or not
 * @returns {TickTimeout} The tick timeout
 * @example setTickTimeout(() => {
 * console.warn(`This was called after 20 ticks!`)
 * }, 20)
 */
export function setTickTimeout(callback, tick) {
    return new TickTimeout(callback, tick)
}

/**
 * Run a command!
 * @param {string} cmd Command to run
 * @param {Entity} executor Entity to run the command
 * @returns {{ error: boolean, data: any }} Whether or not the command errors, and command data
 * @example runCommand(`give @s diamond`, player)
 */
export function runCommand(cmd, executor = undefined) {
    try {
        if (executor) return { error: false, data: executor.runCommand(cmd) }
        return { error: false, data: world.getDimension('overworld').runCommand(cmd) }
    } catch (e) {
        return { error: true, data: e }
    }
}

/**
 * Run an array of commands (if a command starts with "%", then it will be conditional!)
 * @param {string[]} commands Commands to run
 * @param {Entity} executor Entity to run all of the commands
 * @returns {{error: boolean}} Whether or not there was an error running all the commands
 * @example runCommands([
 * `testfor @s[hasitem={item=dirt}]`
 * `%say I have dirt in my hand!`
 * ], player)
 */
export function runCommands(commands, executor = null) {
    try {
        const cR = /^%/;
        if (cR.test(commands[0])) throw new TypeError('[Server] >> First command in runCommands function can not be conditional')
        let cE = false
        for (const cD of commands) {
            if (cE && cR.test(cD)) continue
            cE = runCommand(cD.replace(cR, ''), executor).error
        }
        return { error: false }
    } catch {
        return { error: true }
    }
}

/**
 * Run code when the world is loaded
 * @param {() => void} callback Code to run when the world is loaded
 * @example onWorldLoad(() => console.warn(`World is loaded!`))
 */
export function onWorldLoad(callback) {
    const tE = world.events.tick.subscribe(() => {
        try {
            world.getDimension('overworld').runCommand(`testfor @a`)
            world.events.tick.unsubscribe(tE)
            callback()
        } catch { }
    })
}

export const locationFunctions = {
    /**
     * Converts a location to a block location
     * @param {Location} loc The BlockLocation of the Location
     * @returns {BlockLocation} BlockLocation from the location
     */
    locationToBlockLocation(loc) {
        return new BlockLocation(
            Math.floor(loc.x),
            Math.floor(loc.y),
            Math.floor(loc.z)
        )
    },
    /**
     * Converts a block location to a location
     * @param {BlockLocation} loc The Location of the BlockLocation
     * @returns {Location} Location from the block location
     */
    blockLocationToLocation(loc) {
        return new Location(
            loc.x,
            loc.y,
            loc.z
        )
    },
    /**
     * Convert coords into a location
     * @param {[number, number, number]} coords Coords to turn into a location
     * @returns {Location} Location from the coords
     */
    coordsToLocation(coords) {
        return new Location(
            coords[0],
            coords[1],
            coords[2]
        )
    },
    /**
     * Convert coords into a block location
     * @param {[number, number, number]} coords Coords to turn into a block location
     * @returns {BlockLocation} BlockLocation from the coords
     */
    coordsToBlockLocation(coords) {
        return new BlockLocation(
            Math.floor(coords[0]),
            Math.floor(coords[1]),
            Math.floor(coords[2])
        )
    },
    /**
     * Convert a location to coords
     * @param {Location} loc Location to convert into coords
     * @returns {[number, number, number]} Coords
     */
    locationToCoords(loc) {
        return [loc.x, loc.y, loc.z]
    },
    /**
     * Convert a block location to coords
     * @param {BlockLocation} loc BlockLocation to convert into coords
     * @returns {[number, number, number]} Coords
     */
    blockLocationToCoords(loc) {
        return [loc.x, loc.y, loc.z]
    }
}

/**
 * Convert Durations to milliseconds
 * @param {string} value The value to become miliseconds
 * @returns {number} The miliseconds
 * @example toMS(`1 day`)
 */
export function toMS(value) {
    const number = Number(value.replace(/[^-.0-9]+/g, ''))
    value = value.replace(/\s+/g, '')
    if (/\d+(?=ms|milliseconds?)/i.test(value)) return number
    if (/\d+(?=s)/i.test(value)) return number * 1000
    if (/\d+(?=m)/i.test(value)) return number * 60000
    if (/\d+(?=h)/i.test(value)) return number * 3.6e+6
    if (/\d+(?=d)/i.test(value)) return number * 8.64e+7
    if (/\d+(?=w)/i.test(value)) return number * 6.048e+8
    if (/\d+(?=y)/i.test(value)) return number * 3.154e+10
}

/**
 * Get the gamemode of a player
 * @param {Player} player Player to get the gamemode of
 * @returns {"survival" | "creative" | "adventure" | "unknown"} The gamemode of the player
 * @example getGamemode(player) //Returns the gamemode of the player
 */
export function getGamemode(player) {
    const sT = runCommand(`testfor @s[m=0]`, player).error
    if (!sT) return 'survival'
    const cT = runCommand(`testfor @s[m=1]`, player).error
    if (!cT) return 'creative'
    const aT = runCommand(`testfor @s[m=2]`, player).error
    if (!aT) return 'adventure'
    return 'unknown'
}