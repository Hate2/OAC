import { config } from "../globalVars"

const { messages } = config.modules.chatFilter

export async function ChatFilter({ player, cancel, message }) {
    if (message.length > 200 || message.length === 0) return cancel()
    if (message.toUpperCase() === message && message.length > 4) {
        cancel()
        return player.message(`§7[§9OAC§7] §cMessages are not allowed to be in all caps!`)
    }
    for (let i = 0; i < message.length + 1; i++) if (message.includes(messages[i])) {
        cancel()
        return player.message(`§7[§9OAC§7] §cThat message is not allowed (${messages[i] === "§k" ? "§k1§r§c" : messages[i]})`)
    }
}