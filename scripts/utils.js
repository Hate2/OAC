import { Player, world } from "mojang-minecraft";
import { adminScoreboard } from "./globalVars.js";
/**
 * Broadcast a message (or send it to a player)
 * @param {string} message Message to broadcast
 * @param {Player|Player[]} player Player(s) to send the message to
 * @example broadcastMessage('This message was sent to everyone!')
 */
export function broadcastMessage(message, player) {
    !player ? world.getDimension('overworld').runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`) : player instanceof Player ? player.runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`) : player.forEach(pL => pL.runCommand(`tellraw @a ${JSON.stringify({ rawtext: [{ text: message }] })}`));
}
/**
 * Ban a player
 * @param {Player} player Player to ban
 * @param {string} reason The reason the player is banned
 * @example banPlayer(player, "Hacking!")
 */
export function banPlayer(player, reason) {
    player.runCommand(`kick "${player.name}" §7[§9OAC§7] §3${reason ?? "You were banned for hacking!"}`);
    broadcastMessage(`§7[§9OAC§7] §3${player.name} was banned${reason ? ` due to: ${reason}` : `!`}`);
}
/**
 * Test for whether or not a player is an admin
 * @param {Player} player Player to test with
 * @returns {boolean} Whether or not they are admin
 */
export function isAdmin(player) {
    try {
        return world.scoreboard.getObjective(adminScoreboard).getScore(player.scoreboard) === 0 ? false : true;
    }
    catch {
        return false;
    }
}
