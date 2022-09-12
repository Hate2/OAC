import { system } from 'mojang-minecraft'
import { Client } from './Api/index.js'
import { config } from './globalVars.js'
import { Anti32k } from './Modules/Anti32k.js'
import { AntiAutoClickerHit, AntiAutoClickerTick } from './Modules/AntiAutoClicker.js'
import { AntiGMC } from './Modules/AntiGMC.js'
import { AntiIllegalItems } from './Modules/AntiIllegalItems.js'
import { AntiKillAuraHit, AntiKillAuraTick } from './Modules/AntiKillAura.js'
import { AntiNamespoof } from './Modules/AntiNamespoof.js'
import { AntiNoClip } from './Modules/AntiNoClip.js'
import { AntiNukerBreak, AntiNukerTick } from './Modules/AntiNuker.js'
import { AntiReach } from './Modules/AntiReach.js'
import { AntiSpeedHit, AntiSpeedTick } from './Modules/AntiSpeed.js'
import { ChatFilter } from './Modules/ChatFilter.js'
import { banPlayer, isAdmin, onPlayerJoin, setTickTimeout } from "./utils.js"

export const client = new Client({ command: { enabled: true, invalidCommandError: `§7[§9OAC§7] §cInvalid command` } })
export const banDB = client.database.create("ban")

if (config.modules.chatFilter.enabled) client.on("Chat", ChatFilter)

onPlayerJoin(player => {

    //Auto Ban
    const reason = banDB.get(player.getName())
    reason && player.kick(`§7[§9OAC§7] §cYou have been banned!\n§3Reason: ${reason ?? "No reason specified!"}`)

    //Anti Namespoof
    if (config.modules.antiNamespoof.enabled) AntiNamespoof(player)

    //Setting player's logs
    const log = player.getLog()
    if (config.modules.antiAutoclicker.enabled) log.set("cps", [])
    if (config.modules.antiKillaura.enabled) log.set("killaura", [])
    if (config.modules.antiGMC.enabled) log.set("gamemode", "survival")
    if (config.modules.antiNoClip.enabled || config.modules.antiSpeed.enabled) log.set("pos", player.getLocation())
    if (config.modules.antiSpeed.enabled) {
        log.set("wasHit", 0)
        log.set("speedFlags", 0)
    }
    if (config.modules.antiNuker.enabled) log.set("blockLog", { time: Date.now(), loc: undefined, blockPerm: undefined, amount: 0 })

    setTickTimeout(() => {
        player.message(`§7[§9OAC§7] §3Odin Anti Cheat is running!`)
        player.runCommand(`playsound note.pling @s`)
    }, 100)
})

//Anti AutoClicker
if (config.modules.antiAutoclicker.enabled) client.on("EntityHit", ({ entity }) => {
    entity.isPlayer() && !isAdmin(entity) && AntiAutoClickerHit(entity)
})

//Anti KillAura
if (config.modules.antiKillaura.enabled) client.on("EntityHit", ({ entity, hitEntity }) => {
    if (entity.isPlayer() && entity.getEntitiesFromViewVector()[0]?.getId() !== hitEntity.getId()) AntiKillAuraHit(entity)
})

//Anti Reach
if (config.modules.antiReach.enabled) {
    client.on("EntityHit", ({ entity, hitEntity }) => {
        if (entity.isPlayer()) AntiReach(entity, hitEntity.getLocation())
    })
    client.on("BlockHit", ({ entity, hitBlock }) => {
        if (entity.isPlayer()) AntiReach(entity, hitBlock.getLocation())
    })
    client.on("BlockBreak", ({ player, block }) => {
        AntiReach(player, block.getLocation())
    })
    client.on("ItemUseOn", ({ entity, block }) => {
        if (entity.isPlayer()) AntiReach(entity, block.getLocation())
    })
}

//Anti Speed
if (config.modules.antiSpeed.enabled) {
    client.on("EntityHit", ({ hitEntity }) => {
        if (hitEntity.isPlayer()) AntiSpeedHit(hitEntity)
    })

    client.on("ProjectileHit", ({ hitEntity }) => {
        if (hitEntity?.isPlayer()) AntiSpeedHit(hitEntity)
    })
}

client.on("WorldLoad", (world) => {

    //Making admin scoreboard
    client.runCommand(`scoreboard objectives add ${config.adminScoreboard} dummy`)
    world.getAllPlayers().forEach(player => {

        //Setting player's logs
        const log = player.getLog()
        if (config.modules.antiAutoclicker.enabled) log.set("cps", [])
        if (config.modules.antiKillaura.enabled) log.set("killaura", [])
        if (config.modules.antiGMC.enabled) log.set("gamemode", "survival")
        if (config.modules.antiNoClip.enabled || config.modules.antiSpeed.enabled) log.set("pos", player.getLocation())
        if (config.modules.antiSpeed.enabled) {
            log.set("wasHit", 0)
            log.set("speedFlags", 0)
        }
        if (config.modules.antiNuker.enabled) log.set("blockLog", { time: Date.now(), loc: undefined, blockPerm: undefined, amount: 0 })
    })
})

//Anti Nuker
if (config.modules.antiNuker.enabled) client.on("BlockBreak", (data) => {
    if (!isAdmin(data.player)) AntiNukerBreak(data)
})

client.on("Tick", (currentTick) => {
    if (currentTick % 2 !== 0) return
    const players = client.world.getAllPlayers()
    for (const player of players) {

        //Admin bypass
        if (isAdmin(player)) continue

        //Anti BadPackets
        if (player.getSelectedSlot() > 8 || player.getSelectedSlot() < 0) banPlayer(player, `Bad packets`)

        //Anti Nuker
        if (config.modules.antiNuker.enabled) AntiNukerTick(player)


        //Inventory stuff
        const inv = player.getInventory(), { size } = inv
        for (let i = 0; i < size; i++) {
            const item = inv.getItem(i)
            if (!item) continue

            //Anti Illegal Items
            if (config.modules.antiIllegalItems.enabled) AntiIllegalItems(player, item)

            //Anti 32k
            if (config.modules.anti32k.enabled) Anti32k(player, item)
        }

        //Anti Killaura
        if (config.modules.antiKillaura.enabled) AntiKillAuraTick(player)

        //Anti Noclip
        if (config.modules.antiNoClip.enabled) AntiNoClip(player)

        //Anti Speed
        if (config.modules.antiSpeed.enabled) AntiSpeedTick(player, currentTick)
        if (config.modules.antiAutoclicker.enabled || config.modules.antiSpeed.enabled) player.getLog().set("pos", player.getLocation())

        //Anti AutoClicker
        if (config.modules.antiAutoclicker.enabled) AntiAutoClickerTick(player)

        //Trusted tag
        if (player.hasTag(config.trustedTag)) continue

        //Anti GMC
        if (config.modules.antiGMC.enabled) AntiGMC(player)
    }
})

system.events.beforeWatchdogTerminate.subscribe((data) => { data.cancel = true })

import("./Commands/index.js")