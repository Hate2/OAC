import { Command } from "../Classes/Command.js"
import { messagePlayer } from "../utils.js"

new Command({
    name: 'help',
    description: 'Get help on all commands',
    aliases: ["h"],
}, ({ args, player }) => {
    if (!args[0] || args[0] === '') {
        let msg = '§7[§9OAC§7] §3All commands\n'
        Command.registeredCommands.forEach(e => msg += `§6${e.name.toUpperCase()}: §3${e.description ?? "No description availiable"}\n`)
        return messagePlayer(player, msg)
    }
    let found = false
    Command.registeredCommands.forEach(e => {
        if (args[0] === e.name) {
            found = true
            messagePlayer(player, `§7[§9OAC§7] §6${e.name.toUpperCase()}: §3${e.description ?? "No description availiable"}`)
        }
    })
    if (!found) messagePlayer(player, `§7[§9OAC§7] §cNo command found with the name ${args[0]}`)
})