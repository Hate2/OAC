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
import "./utils";
/**
 * @Join event
 */

const join = {};
world.events.playerJoin.subscribe((data) =>
  Object.assign(join, { [data.player.nameTag]: 0 })
);
world.events.tick.subscribe(() => {
    if (!Object.keys(join)) return;
    const playerList = Array.from(world.getPlayers(), (plr) => plr.nameTag);
    Object.keys(join).forEach((plr) => {
      if (!playerList.includes(plr)) return;
      delete join[plr];
      world.getDimension("overworld").runCommand(`say test`)
    });
});


