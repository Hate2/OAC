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

/**
 * @PrivMessage message player function
 */
export function Message_player(player_name, message) {
  world
    .getDimension("overworld")
    .runCommand(
      `tellraw "${player_name}" {"rawtext":[{"text":"§7[§9OAC§7] §3${message}"}]}`
    );
}

/**
 * @GlobalMessage message all function
 */
export function Global_message(message) {
  world
    .getDimension("overworld")
    .runCommand(
        `tellraw @a {"rawtext":[{"text":"§7[§9OAC§7] §3${message}"}]}`
    );
}

// anti - fly, phase, speed, kits, spam, .enchant 32k, .dupe, gamemode 0 1 2 6, cbe, nuke/fucker
// add - spawn protection, staff utils[warn, kick, ban], 

