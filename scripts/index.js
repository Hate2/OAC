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
import { AntiSpeedHit, AntiSpeedTick } from './Modules/AntiSpeed.js'
import { ChatFilter } from './Modules/ChatFilter.js'
import { banPlayer, isAdmin, onPlayerJoin } from "./utils.js"
let unbanWindow = false


const client = new Client({ command: { enabled: true } })

if (config.modules.chatFilter.enabled) client.on("Chat", ChatFilter)

onPlayerJoin(player => {

    //Auto Ban
    const plrDb = banDB.get(player.getName())
    if (plrDb) banPlayer(player, `§7[§9OAC§7] You have been banned${plrDb.reason === '' ? '!' : plrDb.reason}\nDm the owner to appeal.`)

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
})

//Anti AutoClicker
if (config.modules.antiAutoclicker.enabled) client.on("EntityHit", ({ entity }) => {
    entity.isPlayer() && !isAdmin(entity) && AntiAutoClickerHit(entity)
})

//Anti KillAura
if (config.modules.antiKillaura.enabled) client.on("EntityHit", ({ entity, hitEntity }) => {
    if (entity.isPlayer() && entity.getEntitiesFromViewVector()[0]?.getId() !== hitEntity.getId()) AntiKillAuraHit(entity)
})

//Anti Speed
if (config.modules.antiSpeed.enabled) client.on("EntityHit", ({ hitEntity }) => {
    if (hitEntity?.isPlayer()) AntiSpeedHit(hitEntity)
})

if (config.modules.antiSpeed.enabled) client.on("ProjectileHit", ({ hitEntity }) => {
    if (hitEntity?.isPlayer()) AntiSpeedHit(hitEntity)
})

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

export const banDB = client.database.create("ban")

client.commands.create({
    name: "ban",
    description: "Ban someone"
}, ({ args, player }) => {
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return player.message(`§7[§9OAC§7] §cYou need to input a player's name! Example: "iBlqzed"`)
    const target = args.join(' ').match(/(?<=").+?(?=")/)[0]
    banDB.set(target, {
        reason: args.join(' ').slice(target.length + 1)
    })
    player.message(`§7[§9OAC§7] §3Successfully banned ${target}!`)
})

client.commands.create({
    name: 'unban',
    description: 'Unban someone'
}, ({ args, player }) => {
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return player.message(`§7[§9OAC§7] §cYou need to input a player's name! Example: "iBlqzed"`)
    const target = args.join(' ').match(/(?<=").+?(?=")/)[0]
    if (!banDB.has(target)) return player.message(`§7[§9OAC§7] §cPlayer has not been banned!`)
    banDB.delete(target)
    player.message(`§7[§9OAC§7] §3Successfully unbanned ${target}!`)
})