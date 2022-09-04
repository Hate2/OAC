import { world } from 'mojang-minecraft';
import { Commands } from './Commands/index.js';
import { Player } from './Entity/index.js';
export * from './Block/index.js';
export * from './Client/index.js';
export * from './Database/index.js';
export * from './Entity/index.js';
export * from './Forms/index.js';
export * from './Inventory/index.js';
export * from './Item/index.js';
export * from './World/index.js';
export * from './utils.js';
world.events.beforeChat.subscribe((data) => {
    const { message } = data;
    const opts = Commands.clients.find(e => message.startsWith(e.command?.prefix));
    if (!opts)
        return;
    const player = new Player(data.sender);
    data.cancel = true;
    const args = message.trim().slice(opts.command.prefix.length).split(/\s+/g);
    const cmd = args.shift().toLowerCase();
    const cmdData = Commands.registeredCommands.find(command => command.prefix === opts.command.prefix && (command.name === cmd || command.aliases?.includes(cmd)));
    if (!cmdData)
        return player.message(opts.command.invalidCommandError ?? `§cInvalid command!`);
    if (cmdData.permissions && cmdData.permissions.find(tag => !data.sender.hasTag(tag)))
        return player.message(opts.command.invalidPermissionsError ?? `§cInvalid permission!`);
    cmdData.callback({ player, args });
});
