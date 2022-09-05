import { config } from "../globalVars"
import { banPlayer } from "../utils"

const { items } = config.modules.antiIllegalItems

export async function AntiIllegalItems(player, item) {
    if (item.getLore().find(lore => lore.includes("Horion"))) return banPlayer(player, `Using an illegal item`)
    if (items.includes(item.getId()) || item.getId().endsWith("spawn_egg")) {
        if (player.runCommand(`clear @s ${item.getId()}`).error) {
            player.runCommand(`clear @s`)
            banPlayer(player, `Having a ${item.getId().split(':')[1].replace(/_/g, ' ')}`)
        } else {
            player.message(`§7[§9OAC§7] §cYou are not allowed to have that item!`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
        }
    }
}