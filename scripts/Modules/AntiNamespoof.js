import { nameRegex } from "../globalVars"
import { banPlayer } from "../utils"

export async function AntiNamespoof(player) {
    const name = e.getName()
    if (name.length > 20 || name.length < 1) banPlayer(player, `Namespoofing`)
    for (let i = 0; i < name.length + 1; i++) if (!nameRegex.test(name[i])) banPlayer(player, `Namespoofing`)
}