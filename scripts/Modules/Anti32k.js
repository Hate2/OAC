export async function Anti32k(player, item) {
    const enchList = item.getComponent("enchantments").enchantments
    for (const ench of enchList) {
        if (enchList.slot === 0 && !enchList.canAddEnchantment(ench)) {
            item.removeEnchant(ench.type.id)
            player.message(`§7[§9OAC§7] §cYou are not allowed to have that enchant!`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
            continue
        }
        if (ench.level > ench.type.maxLevel) {
            item.removeEnchant(ench.type.id)
            player.message(`§7[§9OAC§7] §cYou are not allowed to have that enchant!`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
            continue
        }
        if (ench.level < 0) {
            item.removeEnchant(ench.type.id)
            player.message(`§7[§9OAC§7] §cYou are not allowed to have that enchant!`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
            continue
        }
    }
}