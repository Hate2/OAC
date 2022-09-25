import { muteDB } from "../index.js"
import { config } from "../globalVars"
import { messagePlayer } from "../utils"

const { messages } = config.modules.chatFilter

export function ChatFilter({ player, message }) {
    const mute = muteDB.get(player.name)
    if (mute) {
        messagePlayer(player, `§7[§9OAC§7] §cYou have been muted!`)
        return true
    }
    if (message.length > 200 || message.length === 0) return true
    if ((message.toUpperCase() === message && message.length > 4) && !Number(message)) {
        messagePlayer(player, `§7[§9OAC§7] §cMessages are not allowed to be in all caps!`)
        return true
    }
    for (let i = 0; i < message.length + 1; i++) if (message.includes(messages[i])) {
        messagePlayer(player, `§7[§9OAC§7] §cThat message is not allowed (${messages[i] === "§k" ? "§k1§r§c" : messages[i]})`)
        return true
    }
}