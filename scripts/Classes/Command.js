import { Player, world } from "mojang-minecraft"
import { config } from "../globalVars"
import { messagePlayer } from "../utils"

export class Command {
    static registeredCommands = []
    /**
     * Register a new command!
     * @param {{name: string, description: string, aliases?: string[], permission?: (player: Player) => boolean}} info Command info
     * @param {(data: {player: Player, args: string[]}) => void} callback Command callback
     */
    constructor(info, callback) {
        Command.registeredCommands.push({
            name: info.name.toLowerCase().split(' ')[0],
            description: info.description ?? undefined,
            aliases: info.aliases?.map(aL => aL.toLowerCase().split(' ')[0]) ?? [],
            permission: info.permission,
            callback
        })
    }
}

world.events.beforeChat.subscribe((data) => {
    const { message } = data
    if (!data.message.trim().startsWith(config.commandPrefix)) return
    const player = data.sender
    data.cancel = true
    const args = message.trim().slice(config.commandPrefix.length).split(/\s+/g)
    const cmd = args.shift().toLowerCase()
    const cmdData = Command.registeredCommands.find(command => command.name === cmd || command.aliases?.includes(cmd))
    if (!cmdData) return messagePlayer(player, `§7[§9OAC§7] §cInvalid command`)
    if (cmdData.permission && !cmdData.permission(player)) return messagePlayer(player, `§7[§9OAC§7] §cInvalid permission`)
    cmdData.callback({ player, args })
})