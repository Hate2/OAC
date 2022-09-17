import { EnchantmentList } from "mojang-minecraft"
import { messagePlayer } from "../utils"

export async function Anti32k(player, item, i) {
    /**@type {EnchantmentList} */
    const enchList = item.getComponent("enchantments").enchantments
    let change = false
    for (const ench of enchList) {
        if (enchList.slot === 0 && !enchList.canAddEnchantment(ench)) {
            change = true
            enchList.removeEnchantment(ench.type)
            messagePlayer(player, `§7[§9OAC§7] §cYou are not allowed to have that enchant!`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
        }
        if (ench.level > ench.type.maxLevel) {
            change = true
            enchList.removeEnchantment(ench.type)
            messagePlayer(player, `§7[§9OAC§7] §cYou are not allowed to have that enchant!`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
        }
        if (ench.level < 0) {
            change = true
            enchList.removeEnchantment(ench.type)
            messagePlayer(player, `§7[§9OAC§7] §cYou are not allowed to have that enchant!`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
        }
    }
    if (change) {
        item.getComponent("enchantments").enchantments = enchList
        player.getComponent("inventory").container.setItem(i, item)
    }
}

