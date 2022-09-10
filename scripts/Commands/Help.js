import { client } from "../index.js"

client.commands.create({
    name: 'help',
    description: 'Get help on all commands',
    aliases: ["h"]
}, ({ args, player }) => {
    if (!args[0] || args[0] === '') {
        let msg = '§7[§9OAC§7] §3All commands\n'
        client.commands.forEach(e => msg += `§6${e.name.toUpperCase()}: §3${e.description ?? "No description availiable"}\n`)
        return player.message(msg)
    }
    let found = false
    client.commands.forEach(e => {
        if (args[0] === e.name) {
            found = true
            player.message(`§7[§9OAC§7] §6${e.name.toUpperCase()}: §3${e.description ?? "No description availiable"}`)
        }
    })
    if (!found) player.message(`§7[§9OAC§7] §cNo command found with the name ${args[0]}`)
})