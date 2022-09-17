import { muteDB } from "../index.js";
import { Command } from "../Classes/Command.js"
import { broadcastMessage, isAdmin, messagePlayer, toMS } from "../utils";

new Command({
    name: "mute",
    description: "Mute someone. §6Example: -mute \"iBlqzed\"",
    permission: (plr) => isAdmin(plr)
}, ({ player, args }) => {
    if (!/(?<=").+?(?=")/.test(args.join(' '))) return messagePlayer(player, `§7[§9OAC§7] §cYou need to input a player's name! Example: -mute "iBlqzed"`)
    const target = args.join(' ').match(/(?<=").+?(?=")/)[0]
    const length = args.join(' ').match(new RegExp(`(?<="${target}").+`))?.[0]?.trim()?.toLowerCase()
    if (!length) {
        muteDB.set(target, "forever")
        broadcastMessage(`§7[§9OAC§7] §c${target} has been muted!`)
    } else {
        const ms = toMS(length)
        if (!ms) return messagePlayer(player, `§7[§9OAC§7] §cPlease input a valid value (like 1 day), or input nothing to perma mute`)
        muteDB.set(target, ms + Date.now())
        broadcastMessage(`§7[§9OAC§7] §c${target} has been muted for: ${length}!`)
    }
})