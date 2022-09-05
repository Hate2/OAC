//              _______   _______   _______ 
//             |   _   | |   _   | |   _   |
//             |.  |   | |.  1   | |.  1___|
//             |.  |   | |.  _   | |.  |___ 
//             |:  1   | |:  |   | |:  1   |
//             |::.. . | |::.|:. | |::.. . |
//             `-------' `--- ---' `-------'
//              01001111 01000001 01000011 
//                    - Anti-Cheat -

import { system, BlockLocation } from 'mojang-minecraft';
import { Client, broadcastMessage } from './Api/index.js'
import { nameRegex, illegalItems, adminScoreboard, config, bannedMessages, notFullBlocks, notFullBlocksIncludes } from './globalVars.js'
import { banPlayer, isAdmin, onPlayerJoin } from "./utils.js";

const client = new Client({ command: { enabled: false } })

client.on("Chat", ({ player, message, cancel }) => {

    //Anti Bad Packets
    if (message.length > 200 || message.length === 0) return cancel()
    
    //Chat Filter
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

    //Setting player's logs
    const log = player.getLog()
    log.set("cps", [])
    log.set("killaura", [])
    log.set("gamemode", "survival")
    log.set("pos", player.getLocation())
    log.set("wasHit", 0)
    log.set("speedFlags", 0)
    log.set("brokenBlocks", 0)

    //Anti Namespoof
    if (illegalName(player)) {
        banPlayer(player, "Namespoofing")
    }
    player.setNameTag(player.getNameTag().replace(/[^A-Za-z0-9_\-() ]/gm, ""))

    //OAC clout
    player.message("§7[§9OAC§7] §3This world is protected by OAC")
})

function illegalName(e) {
    const name = e.getName()
    if (name.length > 20 || name.length < 1) return true
    for (let i = 0; i < name.length + 1; i++) if (!nameRegex.test(name[i])) return true
    return false
}

client.on("ItemUseOn", ({ item, cancel, entity }) => {

    //Anti Illegal Items
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
    //Anti Speed
    if (hitEntity.isPlayer()) hitEntity.getLog().set("wasHit", 5)

    if (!entity.isPlayer() || isAdmin(entity)) return
    const log = entity.getLog()

    //CPS Counter
    const arr = (log.get("cps") ?? [])
    arr.push(11)
    log.set("cps", arr)

    //Killaura flags
    if (hitEntity.isPlayer() && entity.getEntitiesFromViewVector()[0]?.getId() !== hitEntity.getId()) {
        const arr = (log.get("killaura") ?? [])
        arr.push(10)
        log.set("killaura", arr)
    }
})

client.on("ProjectileHit", ({ hitEntity }) => {
    if (hitEntity?.isPlayer()) hitEntity.getLog().set("wasHit", 5)
})

client.on("WorldLoad", (world) => {

    //Making admin scoreboard
    client.runCommand(`scoreboard objectives add ${adminScoreboard} dummy`)
    world.getAllPlayers().forEach(player => {

        //Setting player's logs
        const log = player.getLog()
        log.set("cps", [])
        log.set("killaura", [])
        log.set("gamemode", "survival")
        log.set("pos", player.getLocation())
        log.set("wasHit", 0)
        log.set("speedFlags", 0)
        log.set("brokenBlocks", 0)
    })
})

//Anti Nuker
client.on("BlockBreak", (block) => {
    const log = block.player.getLog()
    log.set("brokenBlocks", log.get("brokenBlocks")+1)
    if(log.get("brokenBlocks") > 5) {
        block.cancel()
    }
})

client.on("Tick", (currentTick) => {
    //Speed ban
    if (currentTick % 400 == 0) {
        
        const players = client.world.getAllPlayers()
        for (const player of players) {
            const log = player.getLog()
            if(log.get("speedFlags") >=3 && !isAdmin(player)) banPlayer(player, "Speed hacking")
            if(log.get("speedFlags") != 0) log.set("speedFlags", 0)
        }
    }

    if (currentTick % 2 !== 0) return
    const players = client.world.getAllPlayers()
    for (const player of players) {

        //Admin bypass
        if (isAdmin(player)) continue

        //Small stuff
        if (player.getSelectedSlot() > 8 || player.getSelectedSlot() < 0) {
            banPlayer(player, `Bad packets`)
        }


        //Inventory stuff
        const inv = player.getInventory(), { size } = inv
        for (let i = 0; i < size; i++) {
            const item = inv.getItem(i)
            if (!item) continue

            //Anti Illegal Items
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

            //Anti 32k
            const enchList = item.getComponent("enchantments").enchantments
            for (const ench of enchList) {
                if (enchList.slot === 0 && !enchList.canAddEnchantment(ench)) {
                    item.removeEnchant(ench.type.id)
                    player.message(`§7[§9OAC§7] §cYou are not allowed to have that enchant!`)
                    player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
                }
                if (ench.level > ench.type.maxLevel) {
                    item.removeEnchant(ench.type.id)
                    player.message(`§7[§9OAC§7] §cYou are not allowed to have that enchant!`)
                    player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
                }
                if (ench.level < 0) {
                    item.removeEnchant(ench.type.id)
                    player.message(`§7[§9OAC§7] §cYou are not allowed to have that enchant!`)
                    player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
                }
            }
        }

        //Log
        const log = player.getLog()
        const cps = log.get("cps")
        const killaura = log.get("killaura")

        //Anti Nuker
        if(log.get("brokenBlocks") > 5) {
            banPlayer(player, "Using nuker")
        }
        log.set("brokenBlocks", 0)


        //Anti Killaura
        if (killaura.length >= 10) banPlayer(player, `Using Killaura`)

        //Debug UI
        player.getScreenDisplay().setActionBar(`Position: ${Math.floor(player.getLocation().x)} ${Math.floor(player.getLocation().y)} ${Math.floor(player.getLocation().z)}\nCps: ${cps.length}\nBlock: ${(function () { const block = player.getBlockFromViewVector(); return block.getId()?.split(":")[1]?.split(/_/g)?.map(e => e.charAt(0).toUpperCase() + e.slice(1))?.join(' ') ?? "Nothing" }())}\nEntity: ${(function () { const block = player.getEntitiesFromViewVector()[0]; return block?.getId()?.split(":")[1]?.split(/_/g)?.map(e => e.charAt(0).toUpperCase() + e.slice(1))?.join(' ') ?? "Nothing" }())}\nBlock1: ${player.getDimension().getBlock(new BlockLocation(Math.floor(player.getLocation().x), Math.floor(player.getLocation().y), Math.floor(player.getLocation().z))).getId()}\nBlock2: ${player.getDimension().getBlock(new BlockLocation(Math.floor(player.getLocation().x), Math.floor(player.getLocation().y) + 1, Math.floor(player.getLocation().z))).getId()}`)

        //Anti Noclip
        var block1 = player.getDimension().getBlock(new BlockLocation(Math.floor(player.getLocation().x), Math.floor(player.getLocation().y), Math.floor(player.getLocation().z))).getId()
        var block2 = player.getDimension().getBlock(new BlockLocation(Math.floor(player.getLocation().x), Math.floor(player.getLocation().y) + 1, Math.floor(player.getLocation().z))).getId()
        if(!notFullBlocks.includes(block1) && !notFullBlocks.includes(block2)) {
            var test_for_extra_blocks = false
            notFullBlocksIncludes.forEach(block => {
                if(block1.includes(block) || block2.includes(block)) {
                    test_for_extra_blocks = true
                }
            })
            if(test_for_extra_blocks == false){
                player.runCommand(`tp @s ${log.get("pos").x} ${log.get("pos").y} ${log.get("pos").z}`)
                player.message("§7[§9OAC§7] §cNo clipping isn’t allowed!")
                player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
                log.set("wasHit",3)
            }

        }

        //Anti Killaura 1.5
        log.set("killaura", killaura.map(e => e - 1).filter(e => e !== 0))

        //Anti Speed    
        const [location, velocity] = [player.getLocation(), player.getVelocity()]
        const pos = log.get("pos")
        const [x, y, z] = [Math.max(location.x, pos.x) - Math.min(location.x, pos.x), Math.max(location.y, pos.y) - Math.min(location.y, pos.y), Math.max(location.z, pos.z) - Math.min(location.z, pos.z)]
        const speedMult = (0.2 * (player.getEffect("speed")?.amplifier ?? 0))
        if (!player.runCommand(`testfor @s[hasitem={item=elytra,slot=0,location=slot.armor.chest}]`).error) log.set("wasHit", 10)
        let hit = (log.get("wasHit") ?? 1)
        if (((x > (1.6 + speedMult) && velocity.x !== 0) || (z > (1.3 + speedMult) && velocity.z !== 0)) && hit === 0 && !player.getEffect("poison") && !player.getEffect("wither") && !player.isOnFire() && !player.getDimension().getEntities({location: player.getLocation(), maxDistance: 5, excludeTypes: ["player"]}).find(e => e.hasComponent("rideable"))) log.set("speedFlags", log.get("speedFlags")+1)
        hit--
        log.set("wasHit", hit < 0 ? 0 : hit)
        log.set("pos", location)

        //Anti Autoclicker 1
        if (cps.length >= 25) {
            player.kick(`\n§7[§9OAC§7] §cYou are clicking to fast! Please consider clicking slower if you wish to keep playing`)
            broadcastMessage(`§7[§9OAC§7] §c${player.getName()} was kicked due to: §3Clicking to fast (25 cps or higher)`)
        }

        //Trusted tag + Anti Autoclicker 1.5
        if (player.hasTag(config.trustedTag)) {
            log.set("cps", cps.map(e => e - 1).filter(e => e !== 0))
            continue
        }

        //Anti GMC
        if (player.getGamemode() === "creative") {
            player.setGamemode(player.getLog().get("gamemode"))
            player.message(`§7[§9OAC§7] §cYou are not allowed to be in creative mode!`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
        }
        log.set("gamemode", player.getGamemode())

        //Anti Anticlicker 2
        if (cps.length > 15) {
            player.message(`§7[§9OAC§7] §cYou are clicking to fast! Please click slower`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
        }
        log.set("cps", cps.map(e => e - 1).filter(e => e !== 0))
    }
})

//Watchdog = shit
system.events.beforeWatchdogTerminate.subscribe((data) => { data.cancel = true })