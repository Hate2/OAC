import { system, world } from 'mojang-minecraft'
import { Database } from './Classes/Database.js'
import { PlayerLog } from './Classes/PlayerLog.js'
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
// import { AntiSpeedHit, AntiSpeedTick } from './Modules/AntiSpeed.js'
import { ChatFilter } from './Modules/ChatFilter.js'
import { banPlayer, getScore, isAdmin, messagePlayer, onPlayerJoin, onWorldLoad, runCommand, setTickTimeout } from "./utils.js"

//Making databases
export const banDB = new Database("ban")
export const unbanDB = new Database("unban")
export const muteDB = new Database("mute")

//Making player logs
export const cpsLog = new PlayerLog()
export const killauraLog = new PlayerLog()
export const gamemodeLog = new PlayerLog()
export const posLog = new PlayerLog()
export const speedLog = new PlayerLog()
export const hitLog = new PlayerLog()
export const blockLog = new PlayerLog()

//Chat Filter
if (config.modules.chatFilter.enabled) world.events.beforeChat.subscribe(data => {
    if (data.message.startsWith(config.commandPrefix)) return
    if (ChatFilter({ player: data.sender, message: data.message })) data.cancel = true
})

onPlayerJoin(player => {

    //Auto Ban
    if (unbanDB.has(player.name)) {
        player.runCommandAsync(`scoreboard players reset @s oac_bans`)
        banDB.delete(player.name)
    }
    const reason = banDB.get(player.name)
    if (reason) {
        player.runCommandAsync(`scoreboard players set @s oac_bans 1`)
        return player.runCommandAsync(`kick ${JSON.stringify(player.name)} §7[§9OAC§7] §cYou have been banned!\n§3Reason: ${reason}`)
    }
    if (!reason && getScore("oac_bans", player, true) > 0) player.runCommandAsync(`kick ${JSON.stringify(player.name)} §7[§9OAC§7] §cYou have been banned!\n§3Reason: Trying to bypass the anti cheat`)

    //Anti Namespoof
    if (config.modules.antiNamespoof.enabled) AntiNamespoof(player)

    //Setting player's logs
    if (config.modules.antiAutoclicker.enabled) cpsLog.set(player, [])
    if (config.modules.antiKillaura.enabled) killauraLog.set(player, [])
    if (config.modules.antiGMC.enabled) gamemodeLog.set(player, "survival")
    if (config.modules.antiNoClip.enabled || config.modules.antiSpeed.enabled) posLog.set(player, player.location)
    if (config.modules.antiNuker.enabled) blockLog.set(player, { time: Date.now(), loc: undefined, blockPerm: undefined, amount: 0 })

    setTickTimeout(() => {
        messagePlayer(player, `§7[§9OAC§7] §3Odin Anti Cheat is running!`)
        player.runCommandAsync(`playsound note.pling @s`)
    }, 40)
})

//Anti AutoClicker
if (config.modules.antiAutoclicker.enabled) world.events.entityHit.subscribe(({ entity }) => entity.id === "minecraft:player" && !isAdmin(entity) && AntiAutoClickerHit(entity))

//Anti KillAura
if (config.modules.antiKillaura.enabled) world.events.entityHit.subscribe(({ entity, hitEntity }) => {
    if (entity.id === "minecraft:player" && entity.getEntitiesFromViewVector()[0]?.id !== hitEntity?.id) AntiKillAuraHit(entity)
})

//Anti Reach
if (config.modules.antiReach.enabled) {
    world.events.entityHit.subscribe(({ entity, hitEntity, hitBlock }) => entity.id === "minecraft:player" && !isAdmin(entity) && AntiReach(entity, (hitBlock ?? hitEntity).location))
    world.events.blockBreak.subscribe(({ player, block }) => !isAdmin(player) && AntiReach(player, block.location))
    world.events.beforeItemUseOn.subscribe(({ source, blockLocation }) => source.id === "minecraft:player" && !isAdmin(source) && AntiReach(source, blockLocation))
}

//Anti Speed
// if (config.modules.antiSpeed.enabled) {
//     world.events.entityHit.subscribe(({ hitEntity }) => hitEntity.id === "minecraft:player" && !isAdmin(hitEntity) && AntiSpeedHit(hitEntity))
//     world.events.projectileHit.subscribe(({ entityHit }) => entityHit?.entity?.id === "minecraft:player" && !isAdmin(entityHit.entity) && AntiSpeedHit(entityHit.entity))
// }

onWorldLoad(() => {

    //Making admin scoreboard
    runCommand(`scoreboard objectives add ${config.adminScoreboard} dummy`)
    runCommand(`scoreboard objectives add oac_bans dummy`)
    Array.from(world.getPlayers()).forEach(player => {

        //Setting player's logs
        if (config.modules.antiAutoclicker.enabled) cpsLog.set(player, [])
        if (config.modules.antiKillaura.enabled) killauraLog.set(player, [])
        if (config.modules.antiGMC.enabled) gamemodeLog.set(player, "survival")
        if (config.modules.antiNoClip.enabled || config.modules.antiSpeed.enabled) posLog.set(player, player.location)
        if (config.modules.antiNuker.enabled) blockLog.set(player, { time: Date.now(), loc: undefined, blockPerm: undefined, amount: 0 })
    })
})

//Anti Nuker
if (config.modules.antiNuker.enabled) world.events.blockBreak.subscribe((data) => {
    AntiNukerBreak({
        player: data.player,
        block: data.block,
        brokenBlockPermutation: data.brokenBlockPermutation,
        cancel: () => {
            data.block.setPermutation(data.brokenBlockPermutation)
            setTickTimeout(() => {
                data.player.dimension.getEntitiesAtBlockLocation(data.block.location).forEach(entity => entity.id === "minecraft:item" && entity.kill())
            }, 0)
        }
    })
})


world.events.tick.subscribe(({ currentTick }) => {
    if (currentTick % 2 !== 0) return
    Array.from(world.getPlayers()).forEach(player => {

        if (currentTick % 100 === 0 && muteDB.get(player.name) < Date.now()) muteDB.delete(player.name)

        //Admin bypass
        if (isAdmin(player)) return

        //Anti BadPackets
        if (player.selectedSlot > 8 || player.selectedSlot < 0) banPlayer(player, `Bad packets`)

        //Anti Nuker
        if (config.modules.antiNuker.enabled) AntiNukerTick(player)

        //Inventory stuff
        const inv = player.getComponent("inventory").container, { size } = inv
        for (let i = 0; i < size; i++) {
            const item = inv.getItem(i)
            if (!item) continue

            //Anti Illegal Items
            if (config.modules.antiIllegalItems.enabled) AntiIllegalItems(player, item)

            //Anti 32k
            if (config.modules.anti32k.enabled) Anti32k(player, item, i)
        }

        //Anti Killaura
        if (config.modules.antiKillaura.enabled) AntiKillAuraTick(player)

        //Anti Noclip
        if (config.modules.antiNoClip.enabled) AntiNoClip(player)

        //Anti Speed
        // if (config.modules.antiSpeed.enabled) AntiSpeedTick(player, currentTick)
        if (config.modules.antiAutoclicker.enabled) posLog.set(player, player.location)

        //Anti AutoClicker
        if (config.modules.antiAutoclicker.enabled) AntiAutoClickerTick(player)

        //Trusted tag
        if (player.hasTag(config.trustedTag)) return

        //Anti GMC
        if (config.modules.antiGMC.enabled) AntiGMC(player)
    })
})

system.events.beforeWatchdogTerminate.subscribe((data) => { data.cancel = true })

import("./Commands/index.js")