import { killauraLog } from "../index.js"
import { config } from "../globalVars"
import { banPlayer } from "../utils"

const flagAmount = config.modules.antiKillaura.flagAmount

export async function AntiKillAuraTick(player) {
    const killaura = killauraLog.get(player) ?? []
    if (killaura.length >= flagAmount) banPlayer(player, `Using Killaura`)
    killauraLog.set(player, killaura.map(e => e - 1).filter(e => e !== 0))
}

export async function AntiKillAuraHit(player) {
    const arr = killauraLog.get(player) ?? []
    arr.push(10)
    killauraLog.set(player, arr)
}