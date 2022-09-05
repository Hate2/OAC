import { banPlayer } from "../utils"

export async function AntiSpeedTick(player, tick) {
    const log = player.getLog()
    if (tick % 200 === 0) {
        if (log.get("speedFlags") >= 4) banPlayer(player, "Speed hacking")
        if (log.get("speedFlags") !== 0) log.set("speedFlags", 0)
    }
    const location = player.getLocation(), pos = log.get("pos"), velocity = player.getVelocity()
    const [x, z] = [Math.max(location.x, pos.x) - Math.min(location.x, pos.x), Math.max(location.z, pos.z) - Math.min(location.z, pos.z)]
    const speedMult = (0.2 * (player.getEffect("speed")?.amplifier ?? 0))
    if (!player.runCommand(`testfor @s[hasitem={item=elytra,slot=0,location=slot.armor.chest}]`).error) log.set("wasHit", 10)
    if (player.getInventory().getItem(player.getSelectedSlot()).getId() === "minecraft:ender_pearl") log.set("wasHit", 20)
    let hit = (log.get("wasHit") ?? 1)
    if (((x > (1.6 + speedMult) && velocity.x !== 0) || (z > (1.3 + speedMult) && velocity.z !== 0)) && hit === 0 && !player.getEffect("poison") && !player.getEffect("wither") && !player.isOnFire() && !player.getDimension().getEntities({ location: player.getLocation(), maxDistance: 5, excludeTypes: ["player"] }).find(e => e.hasComponent("rideable"))) log.set("speedFlags", log.get("speedFlags") + 1)
    hit--
    log.set("wasHit", hit < 0 ? 0 : hit)
}

export async function AntiSpeedHit(player) {
    player.getLog().set("wasHit", 5)
}