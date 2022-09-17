import { config } from "../globalVars.js";
import { cpsLog } from "../index.js";
import { messagePlayer } from "../utils.js";

export async function AntiAutoClickerHit(player) {
    const arr = (cpsLog.get(player) ?? [])
    arr.push(11)
    cpsLog.set(player, arr)
    if (arr.length >= config.modules.antiAutoclicker.cpsBanLimit) {
        broadcastMessage(`§7[§9OAC§7] §c${player.getName()} was kicked due to: §3Clicking to fast (25 cps or higher)`)
        player.runCommand(`kick ${JSON.stringify(player.name)} §7[§9OAC§7] You are clicking way to fast! Click slower.`)
    } else if (arr.length >= config.modules.antiAutoclicker.cpsWarnLimit) {
        messagePlayer(player, `§7[§9OAC§7] §cYou are clicking to fast! Please click slower!`)
        player.runCommand(`playsound random.glass @s ~~~1 0.5`)
    }
}

export async function AntiAutoClickerTick(player) {
    cpsLog.set(player, cpsLog.get(player).map(e => e - 1).filter(e => e !== 0))
}