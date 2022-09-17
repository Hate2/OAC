import { muteDB } from "../index.js";
import { Command } from "../Classes/Command.js"
import { broadcastMessage, isAdmin, messagePlayer } from "../utils";

new Command({
    name: "unmute",
    description: "Mute someone. §6Example: -unmute \"Dooka\"",
    permission: (plr) => isAdmin(plr)
}, ({ player, args }) => {
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return messagePlayer(player, `§7[§9OAC§7] §cYou need to input a player's name! Example: -unmute "Dooka"`)
    const target = args.join(' ').match(/(?<=").+?(?=")/)[0]
    if (!muteDB.has(target)) return messagePlayer(player, `§7[§9OAC§7] §c${target} isn't muted!`)
    muteDB.delete(target)
    broadcastMessage(`§7[§9OAC§7] §3${target} has been unmuted!`)
})