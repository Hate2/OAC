//              _______   _______   _______ 
//             |   _   | |   _   | |   _   |
//             |.  |   | |.  1   | |.  1___|
//             |.  |   | |.  _   | |.  |___ 
//             |:  1   | |:  |   | |:  1   |
//             |::.. . | |::.|:. | |::.. . |
//             `-------' `--- ---' `-------'
//              01001111 01000001 01000011 
//                    - Anti-Cheat -

import { system } from 'mojang-minecraft';
import { Client } from './Api/index.js'
import { nameRegex, illegalItems, adminScoreboard } from './globalVars.js'
import { banPlayer, isAdmin, onPlayerJoin } from "./utils.js";

const client = new Client({ command: { enabled: false } })

onPlayerJoin(player => {
    player.setNameTag(player.getNameTag().replace(/[^A-Za-z0-9_\-() ]/gm, ""))
    player.message("§7[§9OAC§7] §3This realm is protected by OAC")
})

function illegalName(e) {
    const name = e.getName()
    if (name.length > 20 || name.length < 1) return true
    for (let i = 0; i < name.length + 1; i++) if (!nameRegex.test(name[i])) return true
    return false
}

client.on("ItemUseOn", ({ item, cancel, entity }) => {
    if (illegalItems.includes(item.getId()) && !isAdmin(entity)) cancel()
})

client.on("EntityHit", (data) => {
    if (!data.entity.isPlayer() || isAdmin(data.entity)) return
    const log = data.entity.getLog()
    const arr = (log.get("cps") ?? [])
    arr.push(20)
    log.set("cps", arr)
})

client.on("WorldLoad", () => {
    client.runCommand(`scoreboard objectives add ${adminScoreboard} dummy`)
})

client.on("Tick", (currentTick) => {
    if (currentTick % 2 !== 0) return
    const players = client.world.getAllPlayers()
    for (const player of players) {
        if (isAdmin(player)) continue
        const log = player.getLog()
        if (illegalName(player)) {
            banPlayer(player, "Namespoofing")
            continue
        }
        const inv = player.getInventory(), { size } = inv
        for (let i = 0; i < size; i++) {
            const item = inv.getItem(i)
            if (!item) continue
            if (illegalItems.includes(item.getId()) || item.getId().endsWith("spawn_egg")) {
                if (player.runCommand(`clear @s ${item.getId()}`).error) {
                    player.runCommand(`clear @s`)
                    banPlayer(player, `Having a ${item.getId().split(':')[1].replace(/_/g, ' ')}`)
                } else {
                    player.message(`§7[§9OAC§7] §cYou are not allowed to have that item!`)
                    player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
                }
                continue
            }
            const enchList = item.getComponent("enchantments").enchantments
            for (const ench of enchList) {
                if (enchList.slot === 0 && !enchList.canAddEnchantment(ench)) item.removeEnchant(ench.type.id)
                if (ench.level > ench.type.maxLevel) item.removeEnchant(ench.type.id)
            }
        }
    }
})

system.events.beforeWatchdogTerminate.subscribe((data) => {data.cancel = true})