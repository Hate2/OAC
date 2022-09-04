//              _______   _______   _______ 
//             |   _   | |   _   | |   _   |
//             |.  |   | |.  1   | |.  1___|
//             |.  |   | |.  _   | |.  |___ 
//             |:  1   | |:  |   | |:  1   |
//             |::.. . | |::.|:. | |::.. . |
//             `-------' `--- ---' `-------'
//              01001111 01000001 01000011 
//                    - Anti-Cheat -
//
import { Player, world } from "mojang-minecraft";
import { nameRegex } from './globalVars.js'
import { banPlayer, broadcastMessage, isAdmin, setTickTimeout } from "./utils.js";

world.events.playerJoin.subscribe(({ player }) => {
    setTickTimeout(() => {
        broadcastMessage("§7[§9OAC§7] §3This realm is protected by OAC", player)
    }, 1)
})

world.events.tick.subscribe(({ currentTick }) => {
    if (currentTick % 20 !== 0) return
    const players = Array.from(world.getPlayers())
    players.forEach((player) => {
        if (isAdmin(player)) return;
        if (player.name !== player.nameTag) banPlayer(player, "You are not allowed to namespoof!")
    })
})