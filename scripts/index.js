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
import { world } from "mojang-minecraft";
import { nameRegex } from './globalVars.js';
import { banPlayer, isAdmin, broadcastMessage, setTickTimeout, onPlayerJoin } from "./utils.js";

onPlayerJoin(player => {
    player.nameTag = "test"
    player.nameTag = player.nameTag.replace(/[^A-Za-z0-9_\-() ]/gm, "");
    broadcastMessage("§7[§9OAC§7] §3This realm is protected by OAC", player)
})

world.events.tick.subscribe(({ currentTick }) => {
    if (currentTick % 20 !== 0)
        return;
    const players = Array.from(world.getPlayers());
    players.forEach((player) => {
        if (isAdmin(player))
            return;
        if (illegalName(player)) banPlayer(player, "namespoofing")
    });
});

function illegalName({ name }) {
    if (name.length > 20 || name.length < 1)
        return true;
    for (let i = 0; i < name.length + 1; i++)
        if (!nameRegex.test(name[i]))
            return true;
    return false;
}
