import { nameRegex } from "../globalVars"
import { banPlayer } from "../utils"

export async function AntiNamespoof(player) {
    const name = player.getName()
    if (name.length > 20 || name.length < 1) player.kick(`§7[§9OAC§7] §cYou have been kicked!\n§3Reason: Namespoofing`)
    for (let i = 0; i < name.length + 1; i++) if (!nameRegex.test(name[i])) player.kick(`§7[§9OAC§7] §cYou have been kicked!\n§3Reason: Namespoofing`)
}