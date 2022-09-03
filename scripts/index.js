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
import { ALLOWED_STUFF_IN_PLAYERNAME } from "./consts";
import { Message_player, Global_message } from "./utils";

/**
 * @OnJoin welcomes players when they join and checks for namespoof
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
      Message_player(plr, "This realm is protected by Odin AC")
      if(plr.length > 20 || plr.length < 3 || plr == "" || plr == undefined) {
        Global_message(`${plr} was banned for namespoofing`)
        //ban player for namespoof. we need the ban system to kick, then despawn if kick fails
      }
      for (let i = 0; i < plr.length; i++) {
        if(!ALLOWED_STUFF_IN_PLAYERNAME.includes(plr[i])) {
          Global_message(`${plr} was banned for namespoofing`)
          //ban player namespoof we need the ban system to kick, then despawn if kick fails
        }
      }
    });
});


