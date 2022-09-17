import { Items, ItemStack, world } from "mojang-minecraft"
import { ActionFormData, ModalFormData } from "mojang-minecraft-ui"
import { Command } from "../Classes/Command.js"
import { banDB } from "../index.js"
import { isAdmin, locationFunctions, messagePlayer } from "../utils.js"

const bar = new ItemStack(Items.get("minecraft:iron_bars"))
bar.nameTag = "§r§fHotbar"

const bar2 = new ItemStack(Items.get("minecraft:iron_bars"))
bar2.nameTag = "§r§fInventory"

const air = new ItemStack(Items.get("minecraft:air"))

const form = new ActionFormData()
    .title("Admin Menu")
    .body("This is the admin menu")
    .button("§3Ban")
    .button("§bUnban")
    .button("§3Invsee")

const banForm = new ModalFormData()
    .title("Ban Menu")
    .textField("§3The name of the person you want to ban", "Example: Dooka")
    .textField("§3The ban reason", "Example: Hacking")

const unbanForm = new ModalFormData()
    .title("Unban Menu")
    .textField("§3The name of the person you want to unban", "Example: L0VE MC")

const invseeForm = new ModalFormData()
    .title("Invsee Menu")
    .textField("§3The name of the person you want to see the inventory of", "Example: iBlqzed")

new Command({
    name: "menu",
    description: "Open the admin menu. §2Example: -menu",
    aliases: ['adminmenu', 'amenu'],
    permission: (plr) => isAdmin(plr)
}, ({ player }) => {
    const rot = player.rotation, loc = player.location
    messagePlayer(player, `§7[§9OAC§7] §3Please back out of chat to open the menu!`)
    const event = world.events.tick.subscribe(() => {
        if (!Array.from(world.getPlayers()).find(e => e.name === player?.name)) return world.events.tick.unsubscribe(event)
        const _loc = player.location, _rot = player.rotation
        if ((_loc.x !== loc.x) || (_loc.y !== loc.y) || (_loc.z !== loc.z) || (_rot.x !== rot.x) || (_rot.y !== rot.y)) {
            form.show(player).then(({ selection }) => {
                if (selection === 0) banForm.show(player).then(({ formValues, canceled }) => {
                    if (canceled) return
                    if (banDB.has(formValues[0])) return messagePlayer(player, `§7[§9OAC§7] §c${formValues[0]} has already been banned!`)
                    banDB.set(formValues[0], formValues[1])
                    const e = Array.from(world.getPlayers()).find(e => e.name === formValues[0])
                    e?.runCommandAsync(`kick ${JSON.stringify(e.name)}§7[§9OAC§7] §cYou have been banned!\n§3Reason: ${formValues[1] === '' ? "No reason specified!" : formValues[1]}`)
                    messagePlayer(player, `§7[§9OAC§7] §3Successfully banned ${formValues[0]}`)
                })
                if (selection === 1) unbanForm.show(player).then(({ formValues, canceled }) => {
                    if (canceled) return
                    if (!banDB.has(formValues[0])) return messagePlayer(player, `§7[§9OAC§7] §c${formValues[0]} isn't even banned!`)
                    banDB.delete(formValues[0])
                    messagePlayer(player, `§7[§9OAC§7] §3Successfully unbanned ${formValues[0]}`)
                })
                if (selection === 2) invseeForm.show(player).then(({ formValues, canceled }) => {
                    if (canceled) return
                    const target = Array.from(world.getPlayers()).find(e => e.name === formValues[0])
                    if (!target) return messagePlayer(player, `§7[§9OAC§7] §cPlayer is not online!`)
                    player.runCommand(`fill ~~~ ~1~~ chest`)
                    const block = player.dimension.getBlock(locationFunctions.locationToBlockLocation(player.location))
                    const blockInv = block.getComponent("inventory").container
                    const plrInv = target.getComponent("inventory").container
                    for (let i = 0; i < 36; i++) {
                        if (i === 9) for (let i = 9; i < 27; i++) blockInv.setItem(i, i > 17 ? bar2 : bar)
                        blockInv.setItem(i > 8 ? i + 18 : i, plrInv.getItem(i) ?? air)
                    }
                    messagePlayer(player, `§7[§9OAC§7] §3A chest has been placed near you with ${target.name}'s inventory.`)
                })
            })
            world.events.tick.unsubscribe(event)
        }
    })
})
