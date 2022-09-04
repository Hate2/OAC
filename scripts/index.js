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
import { nameRegex, illegalItems, adminScoreboard, config, bannedMessages } from './globalVars.js'
import { banPlayer, isAdmin, onPlayerJoin } from "./utils.js";

const client = new Client({ command: { enabled: false } })

client.on("Chat", ({ player, message, cancel }) => {
    if (message.length > 200 || message.length === 0) return cancel()
    if (message.toUpperCase() === message && message.length > 4) {
        cancel()
        return player.message(`§7[§9OAC§7] §cMessages are not allowed to be in all caps!`)
    }
    for (let i = 0; i < message.length + 1; i++) if (message.includes(bannedMessages[i])) {
        cancel()
        return player.message(`§7[§9OAC§7] §cThat message is not allowed (${bannedMessages[i] === "§k" ? "§k1§r§c" : bannedMessages[i]})`)
    }
})

onPlayerJoin(player => {
    const log = player.getLog()
    log.set("cps", [])
    log.set("killaura", [])
    log.set("gamemode", "survival")
    if (illegalName(player)) {
        banPlayer(player, "Namespoofing")
    }
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
    if (entity.isPlayer() && illegalItems.includes(item.getId()) && !isAdmin(entity)) {
        cancel()
        if (entity.runCommand(`clear @s ${item.getId()}`).error) {
            entity.runCommand(`clear @s`)
            banPlayer(entity, `Having a ${item.getId().split(':')[1].replace(/_/g, ' ')}`)
        } else {
            entity.message(`§7[§9OAC§7] §cYou are not allowed to have that item!`)
            entity.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
        }
    }
})

client.on("EntityHit", ({ entity, hitEntity }) => {
    if (!entity.isPlayer() || isAdmin(entity)) return
    const log = entity.getLog()
    const arr = (log.get("cps") ?? [])
    arr.push(11)
    log.set("cps", arr)
    if (!hitEntity.isPlayer() && entity.getEntitiesFromViewVector()[0]?.getId() !== hitEntity.getId()) {
        const arr = (log.get("killaura") ?? [])
        arr.push(10)
        log.set("killaura", arr)
    }
})

client.on("WorldLoad", (world) => {
    client.runCommand(`scoreboard objectives add ${adminScoreboard} dummy`)
    world.getAllPlayers().forEach(player => {
        const log = player.getLog()
        log.set("cps", [])
        log.set("killaura", [])
        log.set("gamemode", "survival")
    })
})

client.on("Tick", (currentTick) => {
    if (currentTick % 2 !== 0) return
    const players = client.world.getAllPlayers()
    for (const player of players) {
        if (isAdmin(player)) continue
        const inv = player.getInventory(), { size } = inv
        for (let i = 0; i < size; i++) {
            const item = inv.getItem(i)
            if (!item) continue
            if (item.getLore().find(lore => lore.includes("Horion"))) banPlayer(player, `Using an illegal item`)
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
                if (ench.level < 0) item.removeEnchant(ench.type.id)
            }
        }
        const log = player.getLog()
        const cps = log.get("cps")
        const killaura = log.get("killaura")
        if (killaura.length >= 10) banPlayer(player, `Using Killaura`)
        player.getScreenDisplay().setActionBar(`Position: ${Math.floor(player.getLocation().x)} ${Math.floor(player.getLocation().y)} ${Math.floor(player.getLocation().z)}\nCps: ${cps.length}\nBlock: ${(function() { const block = player.getBlockFromViewVector(); return block.getId()?.split(":")[1]?.split(/_/g)?.map(e => e.charAt(0).toUpperCase() + e.slice(1))?.join(' ') ?? "Nothing"}())}\nEntity: ${(function() { const block = player.getEntitiesFromViewVector()[0]; return block?.getId()?.split(":")[1]?.split(/_/g)?.map(e => e.charAt(0).toUpperCase() + e.slice(1))?.join(' ') ?? "Nothing"}())}`)
        log.set("killaura", killaura.map(e => e - 1).filter(e => e !== 0))
        if (cps.length >= 25) {
            player.kick(`\n§7[§9OAC§7] §cYou are clicking to fast! Please consider clicking slower if you wish to keep playing`)
            broadcastMessage(`§7[§9OAC§7] §c${player.getName()} was kicked due to: §3Clicking to fast (25 cps or higher)`)
        }
        if (player.hasTag(config.trustedTag)) {
            log.set("cps", cps.map(e => e - 1).filter(e => e !== 0))
            continue
        }
        if (player.getGamemode() === "creative") {
            player.setGamemode(player.getLog().get("gamemode"))
            player.message(`§7[§9OAC§7] §cYou are not allowed to be in creative mode!`)
        }
        log.set("gamemode", player.getGamemode())
        if (cps.length > 15) player.message(`§7[§9OAC§7] §cYou are clicking to fast! Please click slower`)
        log.set("cps", cps.map(e => e - 1).filter(e => e !== 0))
    }
})

system.events.beforeWatchdogTerminate.subscribe((data) => {data.cancel = true})