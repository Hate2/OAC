import { blockLog } from "../index.js"
import { banPlayer, setTickTimeout } from "../utils"

export async function AntiNukerBreak({ player, cancel, block, brokenBlockPermutation }) {
    const old = blockLog.get(player)
    if (old.time < (Date.now() - 65)) return blockLog.set(player, { time: Date.now(), loc: block.location, perm: brokenBlockPermutation, amount: old.amount + 1 })
    if (old.amount === 1) {
        player.dimension.getBlock(old.loc).setPermutation(old.perm)
        setTickTimeout(() => {
            player.dimension.getEntitiesAtLocation(old.loc).filter(entity => entity.id === "minecraft:item").forEach(entity => entity.kill())
        }, 0)
    }
    cancel()
    blockLog.set(player, { time: Date.now(), loc: block.location, perm: brokenBlockPermutation, amount: old.amount + 1 })
}

export async function AntiNukerTick(player) {
    const log = blockLog.get(player)
    if (log.amount >= 6) banPlayer(player, "Nuking")
    blockLog.set(player, Object.assign(log, { amount: 0 }))
}