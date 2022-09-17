import { Items, ItemStack, world } from "mojang-minecraft"
import { Command } from "../Classes/Command.js"
import { isAdmin, locationFunctions, messagePlayer } from "../utils.js"

const bar = new ItemStack(Items.get("minecraft:iron_bars"))
bar.nameTag = "§r§fHotbar"
const bar2 = new ItemStack(Items.get("minecraft:iron_bars"))
bar2.nameTag = "§r§fInventory"
const air = new ItemStack(Items.get("minecraft:air"))

new Command({
    name: 'invsee',
    description: "See someone's inventory. §2Example: -invsee \"iBlqzed\"",
    aliases: ['isee'],
    permission: (plr) => isAdmin(plr)
}, ({ args, player }) => {
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return messagePlayer(player, `§7[§9OAC§7] §cYou need to input a player's name! Example: -invsee "iBlqzed"`)
    const target = Array.from(world.getPlayers()).find(e => e.name === args.join(' ').match(/(?<=").+?(?=")/)[0])
    if (!target) return messagePlayer(player, `§7[§9OAC§7] §cPlayer is not online!`)
    player.runCommand(`fill ~~~ ~1~~ chest`)
    const block = player.dimension.getBlock(locationFunctions.locationToBlockLocation(player.location))
    const blockInv = block.getComponent("inventory").container
    const plrInv = target.getComponent("inventory").container
    for (let i = 0; i < 36; i++) {
        if (i === 9) for (let i = 9; i < 27; i++) blockInv.setItem(i, i > 17 ? bar2 : bar)
        blockInv.setItem(i > 8 ? i + 18 : i, plrInv.getItem(i) ?? air)
    }
    messagePlayer(player, `§7[§9OAC§7] §3A chest has been placed near you with ${target.name}'s inventory.`)
})