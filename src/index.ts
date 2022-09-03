import { world } from "mojang-minecraft"

/**
 * @balls are good
 */

//this is where big balls are made
//import { balls } from "mojang-ballsack"

world.events.tick.subscribe(() => {
    if(!Object.keys(join)) return;
    const playerList = Array.from(world.getPlayers(), plr => plr.nameTag);
    Object.keys(join).forEach(plr => {
        if(!playerList.includes(plr)) return;
        delete join[plr];
            world.getDimension("overworld").runCommand(`tp "${plr}" 0 0 0 `)
            world.getDimension("overworld").runCommand(`say balls love men`)
    });
})
