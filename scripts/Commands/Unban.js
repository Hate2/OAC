import { client, banDB } from "../index.js"
import { isAdmin } from "../utils.js"

client.commands.create({
    name: 'unban',
    description: 'Unban someone. §2Example: -unban "L0VE MC"'
}, ({ args, player }) => {
    if (!isAdmin(player)) return player.message(`§7[§9OAC§7] §cYou need to be admin to run this command!`)
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return player.message(`§7[§9OAC§7] §cYou need to input a player's name! Example: -unban "L0VE MC"`)
    const target = args.join(' ').match(/(?<=").+?(?=")/)[0]
    if (!banDB.has(target)) return player.message(`§7[§9OAC§7] §cPlayer has not been banned!`)
    banDB.delete(target)
    player.message(`§7[§9OAC§7] §3Successfully unbanned ${target}!`)
})