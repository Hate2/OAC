import { nameRegex } from "../globalVars"

export async function AntiNamespoof({ name }) {
    if (name.length > 20 || name.length < 1) player.runCommand(`kick ${JSON.stringify(name)} §7[§9OAC§7] §cYou have been kicked!\n§3Reason: Namespoofing`)
    for (let i = 0; i < name.length + 1; i++) if (!nameRegex.test(name[i])) player.runCommand(`kick ${JSON.stringify(name)} §7[§9OAC§7] §cYou have been kicked!\n§3Reason: Namespoofing`)
}