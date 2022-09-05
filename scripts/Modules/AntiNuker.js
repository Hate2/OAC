import { banPlayer, setTickTimeout } from "../utils"

export async function AntiNukerBreak({ player, cancel, block, brokenBlockPermutation }) {
    const log = player.getLog()
    const old = log.get("blockLog")
    if (old.time < (Date.now() - 60)) return log.set("blockLog", { time: Date.now(), loc: block.getBlockLocation(), perm: brokenBlockPermutation, amount: old.amount + 1 })
    if (old.amount === 1) {
        player.getDimension().getBlock(old.loc).setPermutation(old.perm)
        setTickTimeout(() => {
            player.getDimension().getEntitiesAtLocation(old.loc).filter(entity => entity.getId() === "minecraft:item").forEach(entity => entity.kill())
        }, 0)
    }
    cancel()
    log.set("blockLog", { time: Date.now(), loc: block.getBlockLocation(), perm: brokenBlockPermutation, amount: old.amount + 1 })
}

export async function AntiNukerTick(player) {
    const log = player.getLog()
    const blockLog = log.get("blockLog")
    if (blockLog.amount >= 5) banPlayer(player, "Nuking")
    log.set("blockLog", Object.assign(blockLog, { amount: 0 }))
}