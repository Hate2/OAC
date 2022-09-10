import { Item, locationFunctions } from "../Api/index.js"
import { client } from "../index.js"
import { isAdmin } from "../utils.js"

const bar = new Item("minecraft:iron_bars")
bar.setName("§r§fHotbar")
const bar2 = new Item("minecraft:iron_bars")
bar2.setName("§r§fInventory")

client.commands.create({
    name: 'invsee',
    description: "See someone's inventory. §2Example: -invsee \"iBlqzed\"",
    aliases: ['isee']
}, ({ args, player }) => {
    if (!isAdmin(player)) return player.message(`§7[§9OAC§7] §cYou need to be admin to run this command!`)
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return player.message(`§7[§9OAC§7] §cYou need to input a player's name! Example: -invsee "iBlqzed"`)
    const target = client.world.getAllPlayers().find(e => e.getName() === args.join(' ').match(/(?<=").+?(?=")/)[0])
    if (!target) return player.message(`§7[§9OAC§7] §cPlayer is not online!`)
    player.runCommand(`fill ~~~ ~1~~ chest`)
    const block = player.getDimension().getBlock(locationFunctions.locationToBlockLocation(player.getLocation()))
    const blockInv = block.getInventory()
    const plrInv = target.getInventory()
    for (let i = 0; i < 36; i++) {
        if (i === 9) for (let i = 9; i < 27; i++) blockInv.setItem(i, i > 17 ? bar2 : bar)
        blockInv.setItem(i > 8 ? i + 18 : i, plrInv.getItem(i))
    }
    player.message(`§7[§9OAC§7] §3A chest has been placed near you with ${target.getName()}'s inventory.`)
})