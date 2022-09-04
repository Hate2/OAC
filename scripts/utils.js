import { world } from "mojang-minecraft";
import { Player } from './Api/index.js'
import { adminScoreboard } from "./globalVars.js";

/**
 * Broadcast a message
 * @param {string} message Message to broadcast
 * @example broadcastMessage('This message was sent to everyone!')
 */
export function broadcastMessage(message) {
    world.getDimension('overworld').runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`)
}

/**
 * Ban a player
 * @param {Player} player Player to ban
 * @param {string} reason The reason the player is banned
 * @example banPlayer(player, "Hacking!")
 */
export function banPlayer(player, reason) {
    broadcastMessage(`§7[§9OAC§7] §c${JSON.stringify(player.getName()).slice(1, -1)} was banned${reason ? ` due to: §3${reason}` : `!`}`)
    if (player.kick(`§7[§9OAC§7] §cYou have been banned!\n§3Reason: ${reason ?? "No reason specified!"}`)) player.runCommand(`event entity @s oac:kick`)
    // player?.runCommand(`tp @s 9999999 9999999 9999999`)
}

/**
 * Test for whether or not a player is an admin
 * @param {Player} player Player to test with
 * @returns {boolean} Whether or not they are admin
 */
export function isAdmin(player) {
    return player.getScore(adminScoreboard, true) === 0 ? false : true
}

/**
 * Delay executing a function
 * @param {() => void} callback Code you want to execute when the delay is finished
 * @param {number} tick Time in ticks until the callback runs
 * @param {boolean} loop Whether or not the code should loop or not
 * @example setTickTimeout(() => {
 * console.warn(`This was called after 20 ticks!`)
 * }, 20)
 */
export function setTickTimeout(callback, tick, loop = false) {
    let cT = 0
    const tE = world.events.tick.subscribe((data) => {
        if (cT === 0) cT = data.currentTick + tick
        if (cT <= data.currentTick) {
            try { callback() } catch (e) { console.warn(`${e} : ${e.stack}`) }
            if (loop) cT += tick
            else world.events.tick.unsubscribe(tE)
        }
    })
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
        for (const pL of world.getPlayers()) if (!pNA.includes((pL.name))) { pNA.push(pL.name); callback(new Player(pL)); }
    })
    world.events.playerLeave.subscribe(({ playerName }) => pNA.splice(pNA.findIndex(pL => pL === playerName), 1))
}

const pNA = []
let jT = false