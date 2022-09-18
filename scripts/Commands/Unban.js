import { Command } from "../Classes/Command.js"
import { banDB, unbanDB } from "../index.js"
import { isAdmin, messagePlayer } from "../utils.js"

new Command({
    name: 'unban',
    description: 'Unban someone. §2Example: -unban "L0VE MC"',
    permission: (plr) => isAdmin(plr)
}, ({ args, player }) => {
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return messagePlayer(player, `§7[§9OAC§7] §cYou need to input a player's name! Example: -unban "L0VE MC"`)
    const target = args.join(' ').match(/(?<=").+?(?=")/)[0]
    if (!banDB.has(target)) return messagePlayer(player, `§7[§9OAC§7] §cPlayer has not been banned!`)
    banDB.delete(target)
    unbanDB.set(target, true)
    messagePlayer(player, `§7[§9OAC§7] §3Successfully unbanned ${target}!`)
})