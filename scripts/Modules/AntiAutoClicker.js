import { config } from "../globalVars.js";

export async function AntiAutoClickerHit(player) {
    const log = player.getLog()
    const arr = (log.get("cps") ?? [])
    arr.push(11)
    log.set("cps", arr)
    if (arr.length >= config.modules.antiAutoclicker.cpsBanLimit) {
        broadcastMessage(`§7[§9OAC§7] §c${player.getName()} was kicked due to: §3Clicking to fast (25 cps or higher)`)
        player.kick(`§7[§9OAC§7] You are clicking way to fast! Click slower.`)
    } else if (arr.length >= config.modules.antiAutoclicker.cpsWarnLimit) {
        player.message(`§7[§9OAC§7] §cYou are clicking to fast! Please click slower!`)
        player.runCommand(`playsound random.glass @s ~~~1 0.5`)
    }
}

export async function AntiAutoClickerTick(player) {
    const log = player.getLog()
    log.set("cps", log.get("cps").map(e => e - 1).filter(e => e !== 0))
}