export async function AntiGMC(player) {
    const log = player.getLog()
    if (player.getGamemode() === "creative") {
        player.setGamemode(log.get("gamemode"))
        player.message(`§7[§9OAC§7] §cYou are not allowed to be in creative mode!`)
        player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
    }
    log.set("gamemode", player.getGamemode())
}