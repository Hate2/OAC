import { client, banDB } from "../index.js"
import { isAdmin } from "../utils.js"

client.commands.create({
    name: "ban",
    description: "Ban someone. §2Example: -ban \"Dooka\""
}, ({ args, player }) => {
    if (!isAdmin(player)) return player.message(`§7[§9OAC§7] §cYou need to be admin to run this command!`)
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return player.message(`§7[§9OAC§7] §cYou need to input a player's name! Example: -ban "Dooka"`)
    const target = args.join(' ').match(/(?<=").+?(?=")/)[0]
    banDB.set(target, args.join(" ").slice(target.length + 3))
    client.world.getAllPlayers().find(e => e.getName() === target)?.kick(`§7[§9OAC§7] §cYou have been banned!\n§3Reason: ${args.join(" ").slice(target.length + 3) ?? "No reason specified!"}`)
    player.message(`§7[§9OAC§7] §3Successfully banned ${target}!`)
})