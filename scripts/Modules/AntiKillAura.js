import { config } from "../globalVars"
import { banPlayer } from "../utils"

const { flagAmount } = config.modules.antiKillaura.flagAmount

export async function AntiKillAuraTick(player) {
    const log = player.getLog(), killaura = log.get("killaura")
    if (killaura.length >= flagAmount) banPlayer(player, `Using Killaura`)
    log.set("killaura", killaura.map(e => e - 1).filter(e => e !== 0))
}

export async function AntiKillAuraHit(player) {
    const log = player.getLog()
    const arr = (log.get("killaura") ?? [])
    arr.push(10)
    log.set("killaura", arr)
}