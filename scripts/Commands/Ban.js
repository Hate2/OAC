import { world } from "mojang-minecraft"
import { Command } from "../Classes/Command.js"
import { banDB } from "../index.js"
import { isAdmin, messagePlayer } from "../utils.js"

new Command({
    name: "ban",
    description: "Ban someone. §2Example: -ban \"Dooka\"",
    permission: (plr) => isAdmin(plr)
}, ({ args, player }) => {
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return messagePlayer(player, `§7[§9OAC§7] §cYou need to input a player's name! Example: -ban "Dooka"`)
    const target = args.join(' ').match(/(?<=").+?(?=")/)[0]
    banDB.set(target, args.join(" ").slice(target.length + 3) ?? "No reason specified!")
    const plr = Array.from(world.getPlayers()).find(plr => plr.name === target)
    if (plr) {
        plr.runCommandAsync(`scoreboard players set @s oac_bans 1`)
        plr.runCommandAsync(`kick "${target}" §7[§9OAC§7] §cYou have been banned!\n§3Reason: ${args.join(" ").slice(target.length + 3) ?? "No reason specified!"}`)
    }
    messagePlayer(player, `§7[§9OAC§7] §3Successfully banned ${target}!`)
})