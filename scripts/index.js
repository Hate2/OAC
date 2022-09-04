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
import { Client, broadcastMessage } from './Api/index.js'
import { nameRegex, illegalItems, adminScoreboard } from './globalVars.js'
import { banPlayer, isAdmin, onPlayerJoin } from "./utils.js";

const client = new Client({ command: { enabled: false } })

onPlayerJoin(player => {
    player.getLog().set("cps", [])
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

client.on("EntityHit", ({ entity }) => {
    if (!entity.isPlayer() || isAdmin(entity)) return
    const log = entity.getLog()
    const arr = (log.get("cps") ?? [])
    arr.push(10)
    log.set("cps", arr)
})

client.on("BlockHit", ({ entity }) => {
    if (!entity.isPlayer() || isAdmin(entity)) return
    const log = entity.getLog()
    const arr = (log.get("cps") ?? [])
    arr.push(10)
    log.set("cps", arr)
})

client.on("Chat", ({ player, cancel }) => {
    
})

client.on("WorldLoad", (world) => {
    client.runCommand(`scoreboard objectives add ${adminScoreboard} dummy`)
    world.getAllPlayers().forEach(player => {
        player.getLog().set("cps", [])
    })
})

client.on("Tick", (currentTick) => {
    if (currentTick % 2 !== 0) return
    const players = client.world.getAllPlayers()
    for (const player of players) {
        if (isAdmin(player)) continue
        const log = player.getLog()
        /**
         * @type {number[]}
         */
        const cps = log.get("cps")
        if (cps.length > 15) player.message(`§7[§9OAC§7] §cYou are clicking to fast! Please click slower`)
        if (cps.length >= 25) {
            player.kick(`\n§7[§9OAC§7] §cYou are clicking to fast! Please consider clicking slower if you wish to keep playing`)
            broadcastMessage(`§7[§9OAC§7] §c${player.getName()} was kicked due to: §3Clicking to fast (25 cps or higher)`)
        }
        log.set("cps", cps.map(e => e - 1).filter(e => e !== 0))
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