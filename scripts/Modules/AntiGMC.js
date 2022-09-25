import { gamemodeLog } from "../index.js"
import { getGamemode, messagePlayer, runCommand } from "../utils.js"

export async function AntiGMC(player) {
    const gamemode = getGamemode(player)
    if (gamemode === "creative") {
        player.runCommandAsync(`gamemode ${gamemodeLog.get(player) ?? "survival"}`)
        messagePlayer(player, `§7[§9OAC§7] §cYou are not allowed to be in creative mode!`)
        player.runCommandAsync(`playsound random.glass @s ~~~ 1 0.5`)
        return gamemodeLog.set(player, gamemodeLog.get(player) ?? "survival")
    }
    gamemodeLog.set(player, gamemode)
}