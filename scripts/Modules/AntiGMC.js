import { gamemodeLog } from "../index.js"
import { runCommand } from "../utils.js"

export async function AntiGMC(player) {
    if (!runCommand('testfor @s[m=1]', player).error) {
        player.runCommand(`gamemode ${gamemodeLog.get(player)}`)
        messagePlayer(player, `§7[§9OAC§7] §cYou are not allowed to be in creative mode!`)
        player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
    }
    gamemodeLog.set(player, (function () {
        let e = runCommand(`testfor @s[m=0]`, player).error
        if (!e) return "survival"
        e = runCommand(`testfor @s[m=1]`, player).error
        if (!e) return "creative"
        e = runCommand(`testfor @s[m=2]`, player).error
        if (!e) return "adventure"
        return "unknown"
    }()))
}